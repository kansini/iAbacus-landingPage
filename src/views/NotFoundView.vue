<script setup lang="ts">
import { RouterLink } from "vue-router";
import AppIcon from "../components/AppIcon.vue";
</script>
<template>
  <main id="main" class="not-found container" tabindex="-1">
    <p id="top" class="eyebrow caption-3">404 / 珠记</p>
    <h1 class="heading-1">这一页，<br />还没有记下。</h1>
    <p class="body-3">你访问的页面不存在。回到首页，继续认识这一方算盘。</p>
    <RouterLink class="button button-md" to="/">返回珠记首页 <AppIcon name="arrow" /></RouterLink>
  </main>
</template>
