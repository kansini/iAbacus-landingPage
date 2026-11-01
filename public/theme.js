/* Runs before styles paint; shared by the Vue app and static support pages. */
(() => {
  if (window.iAbacusTheme) return;
  const key = "iabacus-theme";
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const valid = (value) => value === "light" || value === "dark";
  let saved;
  try {
    saved = localStorage.getItem(key);
  } catch {
    /* Private/restricted storage is optional. */
  }
  let explicit = valid(saved);
  let current = explicit ? saved : system.matches ? "dark" : "light";
  let busy = false;
  let transition;

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
      explicit = true;
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
  async function toggle() {
    if (busy) return;
    const next = current === "dark" ? "light" : "dark";
    busy = true;
    syncButtons();
    try {
      if (reduced.matches || document.visibilityState === "hidden") {
        apply(next, true);
      } else if (typeof document.startViewTransition === "function") {
        transition = document.startViewTransition(async () => {
          apply(next, true);
          await Promise.resolve();
        });
        void transition.ready.catch(() => {});
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
      if (current !== next) apply(next, true);
    } finally {
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
      void toggle();
  });
  document.addEventListener("DOMContentLoaded", () => apply(current), {
    once: true,
  });
  system.addEventListener("change", () => {
    if (!explicit) apply(system.matches ? "dark" : "light");
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== key && event.key !== null) return;
    explicit = valid(event.newValue);
    apply(explicit ? event.newValue : system.matches ? "dark" : "light");
  });
  window.addEventListener("pagehide", () => transition?.skipTransition());
})();
