<script setup lang="ts">
import { PhAppleLogo } from "@phosphor-icons/vue";
import appGalleryIcon from "../assets/app_gallery.svg";
import { appStoreUrl, appGalleryUrl } from "../data";
const stores = [
  { name: "App Store", url: appStoreUrl, icon: "apple" },
  { name: "AppGallery", url: appGalleryUrl, icon: "gallery" },
];
</script>

<template>
  <div class="store-downloads" role="group" aria-label="选择应用商店下载珠记">
    <component
      :is="store.url ? 'a' : 'button'"
      v-for="store in stores"
      :key="store.name"
      class="store-badge"
      :href="store.url || undefined"
      :disabled="!store.url || undefined"
      :aria-label="`从 ${store.name} 下载珠记`"
    >
      <PhAppleLogo
        v-if="store.icon === 'apple'"
        class="store-badge-icon"
        :size="48"
        weight="fill"
        aria-hidden="true"
      />
      <img
        v-else
        class="store-badge-icon"
        :src="appGalleryIcon"
        alt=""
        width="48"
        height="48"
      />
      <span class="store-badge-copy"
        ><span class="store-badge-label caption-4">下载</span
        ><span class="store-badge-name heading-4">{{ store.name }}</span></span
      >
    </component>
  </div>
</template>

<style scoped lang="scss">
.store-downloads {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 544px;
  container-type: inline-size;
}
.store-badge {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  min-width: 0;
  min-height: 80px;
  padding: 8px 16px;
  border: 2px solid #000;
  border-radius: 16px;
  background: #fff;
  color: #080808;
  text-align: left;
  text-decoration: none;
  transition:
    transform 0.5s var(--ease),
    background-color 0.3s var(--ease);
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  &:not(:disabled):hover {
    background: #edf1e9;
    transform: translateY(-2px);
  }
  &:not(:disabled):active {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }
}
.store-badge-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  object-fit: contain;
}
.store-badge-copy {
  font-family: "Geist Variable", sans-serif;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.store-badge-label,
.store-badge-name {
  display: block;
  white-space: nowrap;
}
.store-badge-name {
  letter-spacing: -0.04em;
}
@container (max-width:510px) {
  .store-badge {
    gap: 12px;
    padding: 8px 12px;
  }
  .store-badge-icon {
    width: 40px;
    height: 40px;
  }
  .store-badge-name {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
  }
}
@container (max-width:420px) {
  .store-badge {
    gap: 8px;
    min-height: 64px;
    padding: 8px;
    border-radius: 12px;
  }
  .store-badge-icon {
    width: 32px;
    height: 32px;
  }
  .store-badge-name {
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
  }
}
@container (max-width:340px) {
  .store-badge-icon {
    width: 24px;
    height: 24px;
  }
  .store-badge-name {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }
}
@media (max-width: 760px) {
  .store-downloads {
    gap: 8px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .store-badge {
    transition: none;
  }
}
</style>
