import { nextTick } from "vue";
import { createRouter, createWebHistory, type RouteLocation } from "vue-router";
import HomeView from "./views/HomeView.vue";
import { documents } from "./documents";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "珠记 iAbacus · 用一方算盘，把日子记清楚",
        description: "珠记 iAbacus，把一方温润的算盘放进口袋。八种材质，自由拨珠、逐步演算、每日一数与随手记账。指尖有数，一拨一记。",
      },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("./views/PrivacyView.vue"),
      meta: { title: "隐私政策 · 珠记", description: documents.privacy.lead },
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("./views/TermsView.vue"),
      meta: { title: "使用条款与说明 · 珠记", description: documents.terms.lead },
    },
    {
      path: "/support",
      name: "support",
      component: () => import("./views/SupportView.vue"),
      meta: { title: "技术支持 · 珠记", description: documents.support.lead },
    },
    ...["privacy", "terms", "support", "index"].map((page) => ({
      path: `/${page}.html`,
      redirect: (to: RouteLocation) => ({
        path: page === "index" ? "/" : `/${page}`,
        hash: to.hash,
        query: to.query,
      }),
    })),
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("./views/NotFoundView.vue"),
      meta: { title: "页面未找到 · 珠记", description: "这一页还没有记下，回到珠记首页继续探索。", noindex: true },
    },
  ],
  async scrollBehavior(to, from, savedPosition) {
    // Wait for the routed DOM and the home page's GSAP pin layout to mount.
    await nextTick();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    if (to.fullPath !== router.currentRoute.value.fullPath) return false;
    if (savedPosition) return { ...savedPosition, behavior: "instant" };
    const behavior = from.path === to.path && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant";
    if (to.hash === "#top") return { top: 0, behavior };
    if (to.hash) {
      let id = to.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Keep malformed external fragments harmless. */ }
      const target = document.getElementById(id);
      if (target) {
        if (to.hash === "#main") target.focus({ preventScroll: true });
        return {
          el: target,
          top: 112,
          behavior,
        };
      }
    }
    return { top: 0, behavior: "instant" };
  },
});

router.afterEach((to) => {
  const title = String(to.meta.title);
  const description = String(to.meta.description);
  document.title = title;
  const tags = {
    'meta[name="description"]': description,
    'meta[property="og:title"]': title,
    'meta[property="og:description"]': description,
    'meta[name="robots"]': to.meta.noindex ? "noindex, follow" : "index, follow",
  };
  Object.entries(tags).forEach(([selector, content]) => {
    document.querySelector(selector)?.setAttribute("content", content);
  });
});
