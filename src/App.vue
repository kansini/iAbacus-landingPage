<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useLandingMotion } from "./composables/useLandingMotion";
import AbacusDemo from "./components/AbacusDemo.vue";
import AppIcon from "./components/AppIcon.vue";
import ProductImage from "./components/ProductImage.vue";
import { materials } from "./data";
import StoreDownloadButtons from "./components/StoreDownloadButtons.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import { faqs, modes } from "./content";

const pageRoot = ref<HTMLElement>();
const landingMotion = useLandingMotion(pageRoot);
const selected = ref(0);
const material = computed(() => materials[selected.value]!);
const activeMode = ref(0);
const currentMode = computed(() => modes[activeMode.value]!);
const activeSection = ref("top");
const mobileMenu = ref(false);
const menuButton = ref<HTMLButtonElement>();
const faqQuery = ref("");
const filteredFaqs = computed(() =>
  faqs.filter((item) => `${item.q}${item.a}`.includes(faqQuery.value.trim())),
);
const isHome = ["/", "/index.html"].includes(window.location.pathname);
const navLinks = [
  { id: "experience", label: "指尖体验" },
  { id: "moments", label: "日常有数" },
  { id: "questions", label: "常见问题" },
];
const tagline = [
  ["让", "每一笔", "收支，"],
  ["都有", "清楚的", "来处。"],
  ["让", "每一个", "数字，"],
  ["回到", "自己的", "节奏。"],
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
function switchMode(event: KeyboardEvent, index: number) {
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % modes.length;
  else if (event.key === "ArrowLeft")
    next = (index + modes.length - 1) % modes.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = modes.length - 1;
  else return;
  event.preventDefault();
  activeMode.value = next;
  void nextTick(() => document.getElementById(`mode-tab-${next}`)?.focus());
}
let previousOverflow = "";
watch(mobileMenu, (open) => {
  if (open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else document.body.style.overflow = previousOverflow;
});
let sectionObserver: IntersectionObserver | undefined;
onMounted(() => {
  document.addEventListener("keydown", keydown);
  if (!isHome) {
    document.title = "页面未找到 · 珠记";
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute("content", "noindex");
    return;
  }
  sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) activeSection.value = entry.target.id;
    },
    { rootMargin: "-15% 0px -55% 0px" },
  );
  document
    .querySelectorAll("section[id]")
    .forEach((el) => sectionObserver?.observe(el));
});
onBeforeUnmount(() => {
  sectionObserver?.disconnect();
  document.removeEventListener("keydown", keydown);
  if (mobileMenu.value) document.body.style.overflow = previousOverflow;
});
watch(selected, async () => {
  await nextTick();
  landingMotion.animateChange("material");
});
watch(activeMode, async () => {
  await nextTick();
  landingMotion.animateChange("mode");
  landingMotion.refresh();
});
watch(faqQuery, async () => {
  await nextTick();
  landingMotion.refresh();
});
</script>

<template>
  <a class="skip-link button-sm" href="#main">跳到正文</a>
  <header class="site-header">
    <div class="nav-island">
      <span class="scroll-progress" aria-hidden="true" />
      <a
        class="brand"
        :href="isHome ? '#top' : '/'"
        :aria-current="isHome && activeSection === 'top' ? 'page' : undefined"
        aria-label="珠记首页"
        @click="closeMenu()"
        ><img src="/images/app-icon.webp" alt="" width="32" height="32" /><span
          class="title-2"
          >珠记<span class="brand-en caption-5">iAbacus</span></span
        ></a
      >
      <nav class="desktop-nav" aria-label="主导航">
        <a
          v-for="link in navLinks"
          :key="link.id"
          class="title-4"
          :href="isHome ? `#${link.id}` : `/#${link.id}`"
          :aria-current="activeSection === link.id ? 'location' : undefined"
          >{{ link.label }}</a
        >
      </nav>
      <a
        class="button button-sm nav-download"
        :href="isHome ? '#download' : '/#download'"
      >
        下载珠记 <AppIcon name="arrow" :size="16" />
      </a>
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
      <a
        v-for="(link, index) in navLinks"
        :key="link.id"
        class="heading-3"
        :class="`menu-link-${index}`"
        :href="isHome ? `#${link.id}` : `/#${link.id}`"
        @click="closeMenu()"
        >{{ link.label }}<AppIcon name="external" :size="32" /></a
      ><a class="heading-3 menu-link-3" href="/support.html"
        >技术支持<AppIcon name="external" :size="32"
      /></a>
      <div class="mobile-panel-bottom">
        <p class="body-6">指尖有数，一拨一记。</p>
        <a
          class="button button-md"
          :href="isHome ? '#download' : '/#download'"
          @click="closeMenu()"
          >下载珠记 <AppIcon name="arrow"
        /></a>
      </div></nav
  ></Transition>

  <main v-if="isHome" ref="pageRoot" id="main" :inert="mobileMenu">
    <section id="top" class="hero container" aria-labelledby="hero-title">
      <div class="hero-atmosphere" aria-hidden="true">
        <img
          class="hero-orbit hero-orbit-jade"
          src="/images/jade-bead.webp"
          alt=""
          width="160"
          height="80"
        />
        <img
          class="hero-orbit hero-orbit-glass"
          src="/images/glass-bead.webp"
          alt=""
          width="96"
          height="48"
        />
        <img
          class="hero-orbit hero-orbit-brass"
          src="/images/brass-bead.webp"
          alt=""
          width="80"
          height="40"
        />
        <span class="hero-orbit-ring" />
      </div>
      <div class="hero-intro">
        <p class="eyebrow caption-4">
          <span class="status-dot" /> 一方算盘，一本生活
        </p>
        <h1 id="hero-title" class="heading-1">
          用一方算盘，<br />把日子记清楚。
        </h1>
        <p class="hero-description body-3">
          珠记，把温润的算盘与随手记账放进口袋。<br
            class="desktop-break"
          />拨动算珠，记下收支，也找回自己的节奏。
        </p>
        <div class="hero-action"><StoreDownloadButtons /></div>
        <p class="hero-proof caption-5">
          <AppIcon name="fingerprint" :size="16" />无需账号 · 本机保存 ·
          核心功能离线可用
        </p>
      </div>
      <div class="hero-product">
        <div class="product-topline">
          <span class="caption-4"
            ><span class="status-dot" /> 传统手感，装进当代日常</span
          ><span class="caption-5">九档算盘 · 青玉</span>
        </div>
        <div class="hero-instrument">
          <AbacusDemo :material="materials[0]" />
        </div>
        <div class="hero-product-bottom">
          <span class="caption-5">真实应用素材 · 可点击拨珠体验</span
          ><a class="text-button caption-4" href="#experience"
            >向下探索 <AppIcon name="scroll" :size="16"
          /></a>
        </div>
      </div>
      <div class="proof-rail">
        <div>
          <span class="heading-4 stat-mask"
            ><span class="stat-value">08</span
            ><span class="caption-5">种</span></span
          >
          <p class="caption-5">材质，各有回响</p>
        </div>
        <div>
          <span class="heading-4 stat-mask"
            ><span class="stat-value">09</span
            ><span class="caption-5">档</span></span
          >
          <p class="caption-5">让数字落在指尖</p>
        </div>
        <div>
          <span class="heading-4 stat-mask"
            ><span class="stat-value">02</span
            ><span class="caption-5">种</span></span
          >
          <p class="caption-5">规制，自在切换</p>
        </div>
        <p class="body-6">算得见，<br />也记得住。</p>
      </div>
    </section>

    <section
      id="experience"
      class="experience container section-space"
      aria-labelledby="experience-title"
    >
      <div class="section-head" data-reveal>
        <p class="section-label caption-4">01 / 指尖体验</p>
        <div>
          <h2 id="experience-title" class="heading-2">
            挑一份手感，<br /><span class="text-secondary"
              >让数字有了温度。</span
            >
          </h2>
          <p class="body-3 section-description">
            从青玉的温润，到黄铜的清响。<br />八种材质，把熟悉的算盘变成自己的日常器物。
          </p>
        </div>
      </div>
      <div class="material-layout" data-reveal>
        <div class="material-story">
          <span class="caption-5 material-index">0{{ selected + 1 }} / 08</span>
          <div class="material-sculpture-depth">
            <img
              class="material-sculpture"
              :key="material.id"
              :src="`/images/${material.id}-bead.webp`"
              :alt="`${material.name}算珠细节`"
              width="240"
              height="120"
              loading="lazy"
            />
          </div>
          <div class="material-copy">
            <h3 class="heading-3">{{ material.name }}</h3>
            <p class="body-6">{{ material.note }}</p>
          </div>
        </div>
        <div class="demo-panel">
          <div class="demo-topline">
            <span class="caption-4">一拨，就有回应。</span
            ><AppIcon name="settings" :size="20" />
          </div>
          <div class="demo-depth"><AbacusDemo :material="material" /></div>
          <p class="caption-5 demo-help">
            点击算珠试一试，也可以用方向键调整数位。
          </p>
        </div>
      </div>
      <div class="material-picker" role="group" aria-label="选择算盘材质">
        <button
          v-for="(item, index) in materials"
          :key="item.id"
          class="material-option caption-4"
          :class="{ 'is-selected': selected === index }"
          :aria-pressed="selected === index"
          @click="selected = index"
        >
          <img
            :src="`/images/${item.id}-bead.webp`"
            alt=""
            width="80"
            height="40"
            loading="lazy"
          /><span>{{ item.name }}</span
          ><AppIcon v-if="selected === index" name="check" :size="16" />
        </button>
      </div>
      <p class="caption-5 section-note">
        网页为简化互动预览。原生 App 支持拖动拨珠、两种规制与摇一摇归零。
      </p>
    </section>

    <section
      id="moments"
      class="moments section-space"
      aria-labelledby="moments-title"
    >
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="section-label caption-4">02 / 日常有数</p>
          <div>
            <h2 id="moments-title" class="heading-2">
              不只是一把算盘。<br /><span class="text-secondary"
                >也是生活的小帮手。</span
              >
            </h2>
            <p class="body-3 section-description">
              记一笔，算一道，练一练。<br />用具体的小事，把日常慢慢理顺。
            </p>
          </div>
        </div>
        <div class="mode-layout" data-reveal>
          <div class="mode-tabs" role="tablist" aria-label="探索珠记功能">
            <button
              v-for="(mode, index) in modes"
              :id="`mode-tab-${index}`"
              :key="mode.name"
              class="title-3"
              role="tab"
              :aria-selected="activeMode === index"
              :aria-controls="`mode-panel-${index}`"
              :tabindex="activeMode === index ? 0 : -1"
              @click="activeMode = index"
              @keydown="switchMode($event, index)"
            >
              <AppIcon :name="mode.icon" :size="24" />{{ mode.name
              }}<AppIcon name="arrow" :size="20" />
            </button>
          </div>
          <div
            :id="`mode-panel-${activeMode}`"
            class="mode-panel"
            role="tabpanel"
            :aria-labelledby="`mode-tab-${activeMode}`"
            tabindex="0"
          >
            <div class="mode-copy">
              <p class="eyebrow caption-4">{{ currentMode.eyebrow }}</p>
              <h3 class="heading-4">{{ currentMode.title }}</h3>
              <p class="body-6">{{ currentMode.text }}</p>
              <ul>
                <li
                  v-for="point in currentMode.points"
                  :key="point"
                  class="caption-4"
                >
                  <AppIcon name="check" :size="16" />{{ point }}
                </li>
              </ul>
            </div>
            <figure class="mode-visual">
              <ProductImage
                :src="`/images/${currentMode.image}.webp`"
                :alt="currentMode.alt"
              />
              <figcaption class="caption-5">
                珠记 App 实际界面 · 示例数据
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <section
      class="tagline-section container section-space"
      aria-labelledby="tagline-title"
    >
      <div class="tagline-pin">
        <aside class="tagline-instrument" aria-hidden="true">
          <p class="section-label caption-4">认真生活，自有回响</p>
          <div class="tagline-rods">
            <span class="tagline-rod" /><span class="tagline-rod-fill" /><img
              v-for="bead in 4"
              :key="bead"
              class="tagline-bead"
              src="/images/jade-bead.webp"
              alt=""
              width="80"
              height="40"
            />
          </div>
          <span class="caption-5">一拨一记，自有节奏</span>
        </aside>
        <h2
          id="tagline-title"
          class="heading-2 tagline"
          aria-label="让每一笔收支，都有清楚的来处。让每一个数字，回到自己的节奏。"
        >
          <span
            v-for="(line, lineIndex) in tagline"
            :key="lineIndex"
            class="tagline-line"
            aria-hidden="true"
            ><span v-for="word in line" :key="word" class="tagline-word">{{
              word
            }}</span></span
          >
        </h2>
        <span class="tagline-footnote caption-5"
          >少一点匆忙，多一点心中有数。</span
        >
      </div>
    </section>

    <section
      id="ledger"
      class="ledger-section container section-space"
      aria-labelledby="ledger-title"
    >
      <div class="section-head" data-reveal>
        <p class="section-label caption-4">03 / 一拨一记</p>
        <div>
          <h2 id="ledger-title" class="heading-2">
            三步，记下这一笔。<br /><span class="text-secondary"
              >翻页，日子就清楚了。</span
            >
          </h2>
        </div>
      </div>
      <div class="ledger-layout" data-reveal>
        <figure class="ledger-visual">
          <ProductImage
            src="/images/ledger.webp"
            alt="珠记实际双页线装账簿，左页是收支流水，右页是月结与支出分类；所示为演示数据"
          />
          <figcaption class="caption-5">
            一页流水，一页月结。<span>实际应用界面 · 示例账目</span>
          </figcaption>
          <div class="ledger-features">
            <span class="caption-4">日期查账</span
            ><span class="caption-4">分类统计</span
            ><span class="caption-4">收支流水</span>
          </div>
        </figure>
        <ol class="steps">
          <li>
            <span class="step-number caption-3">01</span>
            <div>
              <h3 class="title-2">拨出金额</h3>
              <p class="body-6">
                轻点或拖动算珠。也能直接输入金额，按你习惯的方式来。
              </p>
            </div>
          </li>
          <li>
            <span class="step-number caption-3">02</span>
            <div>
              <h3 class="title-2">记下事由</h3>
              <p class="body-6">
                选择收入或支出，添上分类与备注，让每笔记录都有细节。
              </p>
            </div>
          </li>
          <li>
            <span class="step-number caption-3">03</span>
            <div>
              <h3 class="title-2">翻开账本</h3>
              <p class="body-6">
                看看这个月的来往，按日期查账，用分类统计理清日常。
              </p>
            </div>
          </li>
        </ol>
      </div>
      <aside class="privacy-note" data-reveal>
        <AppIcon name="fingerprint" :size="40" />
        <div>
          <h3 class="title-2">你的账本，由你保管。</h3>
          <p class="body-6">
            无需注册，不连接银行账户。账目保存在本机，当前不提供云同步或导出。
          </p>
        </div>
        <a class="text-button button-sm" href="/privacy.html"
          >阅读隐私政策 <AppIcon name="external" :size="20"
        /></a>
      </aside>
    </section>

    <section
      id="questions"
      class="faq-section container section-space"
      aria-labelledby="questions-title"
    >
      <div class="faq-header" data-reveal>
        <div>
          <p class="section-label caption-4">04 / 开始之前</p>
          <h2 id="questions-title" class="heading-2">
            你想知道的，<br /><span class="text-secondary">这里都有数。</span>
          </h2>
        </div>
        <label class="faq-search"
          ><AppIcon name="search" :size="20" /><span class="sr-only"
            >搜索常见问题</span
          ><input
            v-model="faqQuery"
            class="body-6"
            type="search"
            placeholder="搜索问题，如「记账」「离线」"
        /></label>
      </div>
      <div v-if="filteredFaqs.length" class="faq-grid">
        <article v-for="faq in filteredFaqs" :key="faq.q" class="faq-item">
          <h3 class="title-3">{{ faq.q }}</h3>
          <p class="body-6">{{ faq.a }}</p>
        </article>
      </div>
      <div v-else class="faq-empty" role="status">
        <AppIcon name="search" :size="32" />
        <h3 class="title-2">没有找到相关问题。</h3>
        <p class="body-6">
          试试「记账」「金额」或「声音」，也可以到技术支持页寻找答案。
        </p>
        <button class="text-button button-sm" @click="faqQuery = ''">
          查看全部问题 <AppIcon name="arrow" :size="20" />
        </button>
      </div>
      <p class="faq-contact body-6">
        还有其他问题？<a class="text-button title-4" href="/support.html"
          >前往技术支持 <AppIcon name="external" :size="16"
        /></a>
      </p>
    </section>

    <section
      id="download"
      class="final-cta container"
      aria-labelledby="final-title"
      data-reveal
    >
      <div class="cta-copy">
        <p class="eyebrow caption-4">一拨一记，自有节奏</p>
        <h2 id="final-title" class="heading-2">
          把一方算盘，<br />留在生活里。
        </h2>
        <p class="body-3">给数字一点温度，给日常一点从容。</p>
        <StoreDownloadButtons class="cta-downloads" />
      </div>
      <div class="cta-art" aria-hidden="true">
        <img
          class="cta-icon"
          src="/images/app-icon.webp"
          alt=""
          width="160"
          height="160"
          loading="lazy"
        /><span class="cta-word heading-3">珠记</span
        ><span class="caption-4">iAbacus</span>
      </div>
    </section>
  </main>

  <main v-else id="main" class="not-found container">
    <p class="eyebrow caption-3">404 / 珠记</p>
    <h1 class="heading-1">这一页，<br />还没有记下。</h1>
    <p class="body-3">你访问的页面不存在。回到首页，继续认识这一方算盘。</p>
    <a class="button button-md" href="/"
      >返回珠记首页 <AppIcon name="arrow"
    /></a>
  </main>

  <footer class="site-footer container" :inert="mobileMenu">
    <div class="footer-top">
      <a class="brand" href="/" aria-label="珠记首页"
        ><img src="/images/app-icon.webp" alt="" width="40" height="40" /><span
          class="title-2"
          >珠记<span class="brand-en caption-5">iAbacus</span></span
        ></a
      >
      <p class="body-6">指尖有数，一拨一记。</p>
      <nav aria-label="页脚导航">
        <a class="caption-4" href="/privacy.html">隐私政策</a
        ><a class="caption-4" href="/terms.html">使用条款</a
        ><a class="caption-4" href="/support.html">技术支持</a
        ><a class="caption-4" href="mailto:ssflood7d@gmail.com"
          >联系开发者 <AppIcon name="external" :size="16"
        /></a>
      </nav>
    </div>
    <div class="footer-bottom">
      <p class="caption-5">© {{ new Date().getFullYear() }} 珠记 iAbacus</p>
      <p class="caption-5">用心打磨，为日常而作。</p>
      <a class="text-button caption-4" :href="isHome ? '#top' : '/'"
        >{{ isHome ? "回到顶部" : "返回首页"
        }}<AppIcon :name="isHome ? 'scroll' : 'arrow'" :size="16"
      /></a>
    </div>
  </footer>
</template>
