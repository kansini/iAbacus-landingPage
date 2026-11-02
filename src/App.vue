<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import AppIcon from "./components/AppIcon.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import { otherApps } from "./content";
const route = useRoute();
const isHome = computed(() => route.name === "home");
const activeSection = ref("top");
const mobileMenu = ref(false);
const menuButton = ref<HTMLButtonElement>();
const navLinks = [
  { id: "experience", label: "指尖体验" },
  { id: "moments", label: "日常有数" },
  { id: "questions", label: "常见问题" },
];
function closeMenu(restoreFocus = false) {
  mobileMenu.value = false;
  if (restoreFocus) void nextTick(() => menuButton.value?.focus());
}
function keydown(event: KeyboardEvent) {
  if (!mobileMenu.value) return;
  if (event.key === "Escape") {
    closeMenu(true);
    return;
  }
  if (event.key !== "Tab") return;
  const items = [
    ...document.querySelectorAll<HTMLElement>(
      ".mobile-panel a, .mobile-panel button, .menu-toggle, .theme-toggle",
    ),
  ].filter((el) => el.offsetParent !== null);
  const first = items[0];
  const last = items.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
let previousOverflow = "";
watch(mobileMenu, (open) => {
  if (open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = previousOverflow;
});
watch(() => route.path, async () => {
  closeMenu();
  activeSection.value = "top";
  await nextTick();
  document.getElementById("main")?.focus({ preventScroll: true });
});
onMounted(() => document.addEventListener("keydown", keydown));
onBeforeUnmount(() => {
  document.removeEventListener("keydown", keydown);
  if (mobileMenu.value) document.body.style.overflow = previousOverflow;
});
</script>

<template>
  <RouterLink class="skip-link button-sm" to="#main">跳到正文</RouterLink>
  <header class="site-header">
    <div class="nav-island">
      <span class="scroll-progress" aria-hidden="true" />
      <RouterLink
        class="brand"
        :to="{ path: '/', hash: '#top' }"
        :aria-current="isHome && activeSection === 'top' ? 'page' : undefined"
        aria-label="珠记首页"
        @click="closeMenu()"
        ><img src="/images/app-icon.webp" alt="" width="32" height="32" /><span
          class="title-2"
          >珠记<span class="brand-en caption-5">iAbacus</span></span
        ></RouterLink
      >
      <nav class="desktop-nav" aria-label="主导航">
        <RouterLink
          v-for="link in navLinks"
          :key="link.id"
          class="title-4"
          :to="{ path: '/', hash: `#${link.id}` }"
          :aria-current="isHome && activeSection === link.id ? 'location' : undefined"
          >{{ link.label }}</RouterLink
        >
      </nav>
      <RouterLink
        class="button button-sm nav-download"
        :to="{ path: '/', hash: '#download' }"
      >
        下载珠记 <AppIcon name="arrow" :size="16" />
      </RouterLink>
      <ThemeToggle />
      <button
        ref="menuButton"
        class="menu-toggle"
        :class="{ 'is-open': mobileMenu }"
        :aria-expanded="mobileMenu"
        aria-controls="mobile-navigation"
        :aria-label="mobileMenu ? '关闭导航' : '打开导航'"
        @click="mobileMenu = !mobileMenu"
      >
        <span /><span />
      </button>
    </div>
  </header>
  <Transition name="menu"
    ><nav
      v-if="mobileMenu"
      id="mobile-navigation"
      class="mobile-panel"
      aria-label="移动端导航"
    >
      <p class="caption-4">一方算盘，一本生活。</p>
      <RouterLink
        v-for="(link, index) in navLinks"
        :key="link.id"
        class="heading-3"
        :class="`menu-link-${index}`"
        :to="{ path: '/', hash: `#${link.id}` }"
        @click="closeMenu()"
        >{{ link.label }}<AppIcon name="external" :size="32" /></RouterLink
      ><RouterLink class="heading-3 menu-link-3" to="/support" @click="closeMenu()"
        >技术支持<AppIcon name="external" :size="32"
      /></RouterLink>
      <div class="mobile-panel-bottom">
        <p class="body-6">指尖有数，一拨一记。</p>
        <RouterLink
          class="button button-md"
          :to="{ path: '/', hash: '#download' }"
          @click="closeMenu()"
          >下载珠记 <AppIcon name="arrow"
        /></RouterLink>
      </div></nav
  ></Transition>

  <RouterView v-slot="{ Component }">
    <component :is="Component" :inert="mobileMenu" @section-change="activeSection = $event" />
  </RouterView>

  <footer class="site-footer container" :inert="mobileMenu">
    <div class="footer-top">
      <RouterLink class="brand" to="/" aria-label="珠记首页"
        ><img src="/images/app-icon.webp" alt="" width="40" height="40" /><span
          class="title-2"
          >珠记<span class="brand-en caption-5">iAbacus</span></span
        ></RouterLink
      >
      <p class="body-6">指尖有数，一拨一记。</p>
      <nav aria-label="页脚导航">
        <RouterLink class="caption-4" to="/privacy">隐私政策</RouterLink
        ><RouterLink class="caption-4" to="/terms">使用条款</RouterLink
        ><RouterLink class="caption-4" to="/support">技术支持</RouterLink
        ><a class="caption-4" href="mailto:ssflood7d@gmail.com"
          >联系开发者 <AppIcon name="external" :size="16"
        /></a>
      </nav>
    </div>
    <nav class="footer-apps" aria-labelledby="other-apps-heading">
      <h2 id="other-apps-heading" class="caption-4">更多 App</h2>
      <ul>
        <li v-for="app in otherApps" :key="app.url">
          <a
            class="caption-3"
            :href="app.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${app.name}（新窗口打开）`"
          >
            {{ app.name }} <AppIcon name="external" :size="16" />
          </a>
        </li>
      </ul>
    </nav>
    <div class="footer-bottom">
      <p class="caption-5">© {{ new Date().getFullYear() }} 珠记 iAbacus</p>
      <p class="caption-5">用心打磨，为日常而作。</p>
      <RouterLink class="text-button caption-4" :to="{ path: route.path, hash: '#top' }">
        回到顶部 <AppIcon name="up" :size="16" />
      </RouterLink>
    </div>
  </footer>
</template>
