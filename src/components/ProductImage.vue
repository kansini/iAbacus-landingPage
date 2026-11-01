<script setup lang="ts">
import { ref, watch } from "vue";
import AppIcon from "./AppIcon.vue";
const props = defineProps<{ src: string; alt: string; eager?: boolean }>();
const loaded = ref(false);
const failed = ref(false);
const attempt = ref(0);
watch(
  () => props.src,
  () => {
    loaded.value = false;
    failed.value = false;
    attempt.value = 0;
  },
);
function retry() {
  failed.value = false;
  loaded.value = false;
  attempt.value++;
}
</script>
<template>
  <div
    class="product-image"
    :class="{ 'is-loaded': loaded, 'is-failed': failed }"
    :aria-busy="!loaded && !failed"
  >
    <div
      v-if="!loaded && !failed"
      class="image-skeleton"
      aria-label="正在载入应用画面"
    />
    <img
      v-if="!failed"
      :key="`${src}-${attempt}`"
      :src="attempt ? `${src}?retry=${attempt}` : src"
      :alt="alt"
      width="1440"
      height="665"
      :loading="eager ? 'eager' : 'lazy'"
      @load="loaded = true"
      @error="failed = true"
    />
    <div v-else class="image-error">
      <AppIcon name="book" :size="32" />
      <p class="body-6">应用画面未能加载。</p>
      <button class="text-button button-sm" @click="retry">
        重新加载 <AppIcon name="reset" :size="16" />
      </button>
    </div>
  </div>
</template>
