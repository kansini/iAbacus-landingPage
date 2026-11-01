import { nextTick, onBeforeUnmount, onMounted, type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One scoped animation owner; responsive rebuilds restore the original layout. */
export function useLandingMotion(root: Ref<HTMLElement | undefined>) {
  let scope: gsap.Context | undefined;
  let media: gsap.MatchMedia | undefined;
  let refreshTask: gsap.core.Tween | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let disposed = false;
  const ease = (progress: number) => 1 - Math.pow(1 - progress, 4);
  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function refresh() {
    refreshTask?.kill();
    const refreshWhenIdle = () => {
      if (disposed) return;
      // Avoid interrupting native anchor scrolling or touch momentum.
      if (ScrollTrigger.isScrolling()) {
        refreshTask = gsap.delayedCall(0.2, refreshWhenIdle);
        return;
      }
      ScrollTrigger.refresh();
    };
    refreshTask = gsap.delayedCall(0.2, refreshWhenIdle);
  }

  function animateChange(kind: "material" | "mode") {
    if (!root.value || reduced()) return;
    scope?.add(() => {
      if (kind === "material") {
        gsap.fromTo(
          ".material-sculpture",
          { y: 16, rotation: -8, scale: 0.88, opacity: 0.35 },
          {
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease,
            overwrite: true,
          },
        );
        gsap.fromTo(
          ".material-copy",
          { y: 12, opacity: 0.35 },
          { y: 0, opacity: 1, duration: 0.5, ease, overwrite: true },
        );
      } else {
        gsap.fromTo(
          ".mode-copy > *, .mode-visual .product-image",
          { y: 16, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.6,
            ease,
            overwrite: true,
            clearProps: "transform,opacity",
          },
        );
      }
    });
  }

  onMounted(async () => {
    await nextTick();
    if (!root.value || disposed) return;
    scope = gsap.context(() => {
      media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 1024px) and (min-height: 700px)",
          reduce: "(prefers-reduced-motion: reduce)",
          all: "all",
        },
        (context) => {
          const { desktop, reduce } = context.conditions!;
          const distance = desktop ? 1 : 0.3;
          const transientTargets =
            ".material-sculpture, .material-copy, .mode-copy > *, .mode-visual .product-image";
          gsap.killTweensOf(transientTargets);
          gsap.set(transientTargets, { clearProps: "transform,opacity" });
          const reveal = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                context.add(() => {
                  // Motion is optional: content is never hidden before a trigger fires.
                  gsap.fromTo(
                    entry.target,
                    { y: reduce ? 0 : 32, opacity: 0.35 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: reduce ? 0.3 : 0.8,
                      ease,
                      clearProps: "transform,opacity",
                    },
                  );
                });
                reveal.unobserve(entry.target);
              });
            },
            { threshold: 0.08 },
          );
          root
            .value!.querySelectorAll("[data-reveal]")
            .forEach((el) => reveal.observe(el));

          if (reduce) {
            gsap.set(".tagline-word", { opacity: 1 });
            return () => reveal.disconnect();
          }

          // The abacus emerges from a shallow perspective; its decorations travel
          // at different speeds, while all native scrolling and input stay intact.
          gsap.fromTo(
            ".hero-product",
            { y: 64 * distance, rotateX: 8 * distance, scale: 0.94 },
            {
              y: -24 * distance,
              rotateX: 0,
              scale: 1,
              ease,
              scrollTrigger: {
                id: "hero-depth",
                trigger: ".hero-product",
                start: "top bottom",
                end: "center 35%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
          gsap.fromTo(
            ".hero-intro",
            { y: 0, opacity: 1 },
            {
              y: -64 * distance,
              opacity: 0.5,
              ease,
              scrollTrigger: {
                trigger: ".hero-intro",
                start: "top 15%",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
          gsap.utils
            .toArray<HTMLElement>(".hero-orbit")
            .forEach((bead, index) => {
              gsap.fromTo(
                bead,
                { y: 48 * distance, rotation: index % 2 ? -18 : 12 },
                {
                  y: -(index + 1) * 64 * distance,
                  rotation: index % 2 ? 20 : -16,
                  ease,
                  scrollTrigger: {
                    trigger: "#top",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2 + index * 0.2,
                  },
                },
              );
            });
          gsap.fromTo(
            root.value!.ownerDocument.querySelector(".scroll-progress")!,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                id: "reading-progress",
                trigger: root.value,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
                invalidateOnRefresh: true,
              },
            },
          );
          gsap.to(root.value!.ownerDocument.querySelector(".nav-island")!, {
            y: -8,
            scale: 0.98,
            ease,
            scrollTrigger: {
              trigger: "#top",
              start: "top top",
              end: "+=240",
              scrub: 0.6,
            },
          });
          const stats = root.value!.querySelectorAll(".stat-value");
          const statObserver = new IntersectionObserver(
            (entries) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;
              context.add(() =>
                gsap.fromTo(
                  stats,
                  { yPercent: 110, rotationX: -45, opacity: 0 },
                  {
                    yPercent: 0,
                    rotationX: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease,
                    clearProps: "transform,opacity",
                  },
                ),
              );
              statObserver.disconnect();
            },
            { threshold: 0.4 },
          );
          const rail = root.value!.querySelector(".proof-rail");
          if (rail) statObserver.observe(rail);

          gsap.fromTo(
            ".material-sculpture-depth",
            { y: 40 * distance, rotation: -6 },
            {
              y: -40 * distance,
              rotation: 6,
              ease,
              scrollTrigger: {
                trigger: ".material-layout",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
          gsap.fromTo(
            ".demo-depth",
            { y: 24 * distance },
            {
              y: -16 * distance,
              ease,
              scrollTrigger: {
                trigger: ".material-layout",
                start: "top 85%",
                end: "bottom 20%",
                scrub: 0.8,
              },
            },
          );
          gsap.fromTo(
            ".mode-visual",
            { y: 48 * distance, rotation: 1.5 * distance },
            {
              y: -24 * distance,
              rotation: -0.5 * distance,
              ease,
              scrollTrigger: {
                trigger: ".mode-layout",
                start: "top bottom",
                end: "bottom 15%",
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            },
          );

          // A single short chapter pause, then normal scrolling resumes.
          // Narrow or short viewports use the same story without pin spacing.
          const words = gsap.utils.toArray<HTMLElement>(".tagline-word");
          const story = gsap.timeline({
            scrollTrigger: {
              id: "tagline-story",
              trigger: ".tagline-pin",
              start: desktop ? "top 120px" : "top 75%",
              end: desktop
                ? () => `+=${Math.round(window.innerHeight * 0.85)}`
                : "bottom 40%",
              pin: desktop ? ".tagline-pin" : false,
              pinSpacing: true,
              scrub: 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          words.forEach((word, index) => {
            story.fromTo(
              word,
              { opacity: 0.25, y: 8 },
              { opacity: 1, y: 0, duration: 0.3, ease },
              index * 0.1,
            );
          });
          story.fromTo(
            ".tagline-rod-fill",
            { scaleY: 0 },
            { scaleY: 1, duration: 1.5, ease },
            0,
          );
          gsap.utils
            .toArray<HTMLElement>(".tagline-bead")
            .forEach((bead, index) => {
              story.fromTo(
                bead,
                { y: 16, opacity: 0.3 },
                { y: -index * 8, opacity: 1, duration: 0.5, ease },
                index * 0.3,
              );
            });

          gsap.fromTo(
            ".ledger-visual",
            { y: 64 * distance, rotateX: 8 * distance, rotateZ: -4 * distance },
            {
              y: -16 * distance,
              rotateX: 0,
              rotateZ: 1 * distance,
              ease,
              scrollTrigger: {
                id: "ledger-depth",
                trigger: ".ledger-layout",
                start: "top 90%",
                end: "bottom 30%",
                scrub: 1.1,
              },
            },
          );
          gsap.utils
            .toArray<HTMLElement>(".step-number")
            .forEach((number, index) => {
              gsap.fromTo(
                number,
                { scale: 0.8, opacity: 0.4 },
                {
                  scale: 1,
                  opacity: 1,
                  ease,
                  scrollTrigger: {
                    trigger: number.closest("li"),
                    start: "top 80%",
                    end: "top 45%",
                    scrub: 0.5 + index * 0.1,
                  },
                },
              );
            });
          gsap.fromTo(
            ".cta-icon",
            { y: 64 * distance, rotation: -18, scale: 0.85 },
            {
              y: -16 * distance,
              rotation: 6,
              scale: 1,
              ease,
              scrollTrigger: {
                id: "cta-depth",
                trigger: ".final-cta",
                start: "top bottom",
                end: "bottom 80%",
                scrub: 1.2,
              },
            },
          );
          return () => {
            reveal.disconnect();
            statObserver.disconnect();
          };
        },
      );
    }, root.value);

    // Observe intrinsic image/tab sizes, not the pin spacer. Refreshing a pin
    // must not feed a document-size observation loop.
    resizeObserver = new ResizeObserver(refresh);
    root.value
      .querySelectorAll(".product-image, .mode-copy, .faq-grid, .faq-empty")
      .forEach((el) => resizeObserver?.observe(el));
    root.value.addEventListener("load", refresh, true);
    void document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    refresh();
  });

  onBeforeUnmount(() => {
    disposed = true;
    resizeObserver?.disconnect();
    root.value?.removeEventListener("load", refresh, true);
    refreshTask?.kill();
    media?.revert();
    scope?.revert();
  });

  return { refresh, animateChange };
}
