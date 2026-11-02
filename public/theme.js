/* Runs before styles paint; shared by every routed page. */
(() => {
  if (window.iAbacusTheme) return;
  const key = "iabacus-theme";
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const valid = (value) => value === "light" || value === "dark";
  let saved;
  try {
    saved = localStorage.getItem(key);
  } catch {
    /* Private/restricted storage is optional. */
  }
  let current = valid(saved) ? saved : "dark";
  let busy = false;
  let transition;
  let reveal;

  function syncButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const label = current === "dark" ? "切换到浅色模式" : "切换到深色模式";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("aria-pressed", String(current === "dark"));
      button.setAttribute("aria-busy", String(busy));
    });
  }
  function apply(theme, persist = false) {
    current = theme;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    root.style.backgroundColor = theme === "dark" ? "#181818" : "#f5f3e9";
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) =>
        meta.setAttribute("content", theme === "dark" ? "#181818" : "#f5f3e9"),
      );
    document
      .querySelectorAll('meta[name="color-scheme"]')
      .forEach((meta) => meta.setAttribute("content", theme));
    if (persist) {
      try {
        localStorage.setItem(key, theme);
      } catch {
        /* Keep the current session usable. */
      }
    }
    syncButtons();
    window.dispatchEvent(
      new CustomEvent("iabacus:theme-change", { detail: { theme } }),
    );
  }
  async function toggle(source) {
    if (busy) return;
    const next = current === "dark" ? "light" : "dark";
    busy = true;
    syncButtons();
    const button =
      source instanceof Element
        ? source
        : document.querySelector("[data-theme-toggle]");
    const rect = button?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 40;
    // A 1.8:1 ellipse echoes the jade abacus bead. Cover the farthest corner
    // without moving the live document or disturbing ScrollTrigger's pins.
    const reachX = Math.max(x, innerWidth - x);
    const reachY = Math.max(y, innerHeight - y);
    const ry = Math.hypot(reachX / 1.8, reachY) * 1.02;
    try {
      if (reduced.matches || document.visibilityState === "hidden") {
        apply(next, true);
      } else if (typeof document.startViewTransition === "function") {
        root.dataset.themeTransition = "bead";
        transition = document.startViewTransition(async () => {
          apply(next, true);
          await Promise.resolve();
        });
        void transition.finished.catch(() => {});
        await transition.ready;
        reveal = root.animate(
          {
            clipPath: [
              `ellipse(0px 0px at ${x}px ${y}px)`,
              `ellipse(${ry * 1.8}px ${ry}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "both",
            pseudoElement: "::view-transition-new(root)",
          },
        );
        // Older implementations may ignore pseudoElement. Never leave a
        // viewport-sized mask on the real, scrollable document in that case.
        if (reveal.effect?.pseudoElement !== "::view-transition-new(root)") {
          reveal.cancel();
          transition.skipTransition();
        } else {
          await reveal.finished;
        }
        await transition.finished;
      } else {
        apply(next, true);
        if (typeof document.body?.animate === "function") {
          await document.body.animate([{ opacity: 0.75 }, { opacity: 1 }], {
            duration: 350,
            easing: "cubic-bezier(.22,1,.36,1)",
          }).finished;
        }
      }
    } catch {
      // Snapshot/animation support must never prevent the preference changing.
      transition?.skipTransition();
      if (current !== next) apply(next, true);
    } finally {
      reveal?.cancel();
      reveal = undefined;
      delete root.dataset.themeTransition;
      transition = undefined;
      busy = false;
      syncButtons();
    }
  }
  apply(current);
  window.iAbacusTheme = {
    get current() {
      return current;
    },
    toggle,
  };
  document.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      event.target.closest("[data-theme-toggle]")
    )
      void toggle(event.target.closest("[data-theme-toggle]"));
  });
  document.addEventListener("DOMContentLoaded", () => apply(current), {
    once: true,
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    apply(valid(event.newValue) ? event.newValue : "dark");
  });
  window.addEventListener("pagehide", () => transition?.skipTransition());
})();
