<script setup lang="ts">
import {
  PhArrowRight,
  PhArrowUpRight,
  PhArrowDown,
  PhCaretDown,
  PhX,
  PhBookOpen,
  PhSpeakerHigh,
  PhSpeakerSlash,
  PhArrowCounterClockwise,
  PhFingerprint,
  PhCheck,
  PhAppleLogo,
  PhDeviceMobile,
  PhMagnifyingGlass,
  PhSlidersHorizontal,
  PhWifiSlash,
} from "@phosphor-icons/vue";
defineProps<{ name: string; size?: number }>();
const icons = {
  arrow: PhArrowRight,
  external: PhArrowUpRight,
  down: PhCaretDown,
  close: PhX,
  book: PhBookOpen,
  sound: PhSpeakerHigh,
  mute: PhSpeakerSlash,
  reset: PhArrowCounterClockwise,
  fingerprint: PhFingerprint,
  check: PhCheck,
  apple: PhAppleLogo,
  phone: PhDeviceMobile,
  search: PhMagnifyingGlass,
  settings: PhSlidersHorizontal,
  offline: PhWifiSlash,
  scroll: PhArrowDown,
};
</script>
<template>
  <component
    :is="icons[name as keyof typeof icons] || PhArrowRight"
    :size="size || 20"
    weight="regular"
    aria-hidden="true"
  />
</template>
