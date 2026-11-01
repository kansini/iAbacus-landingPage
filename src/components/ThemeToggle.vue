<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { PhCircleHalf } from "@phosphor-icons/vue";
const isDark = ref(document.documentElement.dataset.theme !== "light");
function syncTheme() {
  isDark.value = document.documentElement.dataset.theme === "dark";
}
onMounted(() => {
  syncTheme();
  window.addEventListener("iabacus:theme-change", syncTheme);
});
onBeforeUnmount(() =>
  window.removeEventListener("iabacus:theme-change", syncTheme),
);
</script>
<template>
  <button
    class="theme-toggle"
    type="button"
    data-theme-toggle
    :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
    :aria-pressed="isDark"
  >
    <span class="theme-glyph"
      ><PhCircleHalf :size="20" weight="regular" aria-hidden="true"
    /></span>
  </button>
</template>
