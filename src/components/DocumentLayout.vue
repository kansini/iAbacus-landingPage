<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import AppIcon from "./AppIcon.vue";
import type { DocumentPage } from "../documents";
defineProps<{ document: DocumentPage }>();
const route = useRoute();
const pages = [
  { path: "/privacy", label: "隐私政策" },
  { path: "/terms", label: "使用条款" },
  { path: "/support", label: "技术支持" },
];
</script>
<template>
  <main id="main" class="document-page container" tabindex="-1">
    <header id="top" class="document-heading">
      <div>
        <RouterLink to="/" class="document-back text-button caption-4">
          <AppIcon name="arrow" :size="16" /> 返回首页
        </RouterLink>
        <p class="eyebrow caption-4">{{ document.eyebrow }}</p>
        <h1 class="heading-1">{{ document.title }}</h1>
        <p class="document-lead body-3">{{ document.lead }}</p>
        <ul class="document-meta caption-5" aria-label="文档信息">
          <li>适用：珠记 iOS 版</li>
          <li>更新日期：<time datetime="2026-11-01">2026年11月1日</time></li>
          <li>文档版本 1.0</li>
        </ul>
      </div>
      <img class="document-bead" src="/images/jade-bead.webp" alt="" width="240" height="120" />
    </header>
    <nav class="document-tabs" aria-label="帮助与说明">
      <RouterLink
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="title-4"
        :aria-current="route.path === page.path ? 'page' : undefined"
      >{{ page.label }}</RouterLink>
    </nav>
    <div class="document-layout">
      <aside class="document-toc">
        <p class="caption-5">本页内容</p>
        <nav aria-label="本页目录">
          <RouterLink
            v-for="(section, index) in document.sections"
            :key="section.id"
            :to="{ path: route.path, hash: `#${section.id}` }"
            class="caption-4"
            :aria-current="route.hash === `#${section.id}` ? 'location' : undefined"
          >
            <span class="caption-5" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            {{ section.label }}
          </RouterLink>
        </nav>
      </aside>
      <slot />
    </div>
  </main>
</template>
