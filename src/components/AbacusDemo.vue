<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import AppIcon from "./AppIcon.vue";
import type { Material } from "../data";
const props = defineProps<{ material: Material }>();
const labels = ["亿", "仟万", "佰万", "拾万", "万", "仟", "佰", "拾", "个"];
const rods = ref(
  Array.from({ length: 9 }, (_, i) => ({
    upper: i === 8 ? 1 : 0,
    lower: [0, 0, 0, 0, 0, 2, 0, 2, 1][i] ?? 0,
  })),
);
const value = computed(() =>
  rods.value.reduce((n, rod) => n * 10 + rod.upper * 5 + rod.lower, 0),
);
const sound = ref(false);
let audio: AudioContext | undefined;
const audioError = ref("");
function tick() {
  if (!sound.value) return;
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended")
      void audio.resume().catch(() => {
        audioError.value = "声音未能开启，请检查浏览器音频设置。";
        sound.value = false;
      });
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.frequency.setValueAtTime(
      props.material.frequency,
      audio.currentTime,
    );
    gain.gain.setValueAtTime(0.045, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.15);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.16);
  } catch {
    audioError.value = "浏览器暂时无法播放声音，可以继续无声拨珠。";
    sound.value = false;
  }
}
function toggleSound() {
  audioError.value = "";
  sound.value = !sound.value;
  if (sound.value) tick();
}

function move(index: number, upper: boolean, bead: number) {
  const rod = rods.value[index]!;
  if (upper) rod.upper = bead < rod.upper ? bead : bead + 1;
  else rod.lower = bead < rod.lower ? bead : bead + 1;
  tick();
}
function adjust(index: number, event: KeyboardEvent) {
  const rod = rods.value[index]!;
  let n = rod.upper * 5 + rod.lower;
  if (["ArrowUp", "ArrowRight"].includes(event.key)) n = Math.min(15, n + 1);
  else if (["ArrowDown", "ArrowLeft"].includes(event.key))
    n = Math.max(0, n - 1);
  else if (event.key === "Home") n = 0;
  else if (event.key === "End") n = 15;
  else return;
  event.preventDefault();
  rod.upper = Math.min(2, Math.floor(n / 5));
  rod.lower = n - rod.upper * 5;
  tick();
}
function reset() {
  rods.value = rods.value.map(() => ({ upper: 0, lower: 0 }));
  tick();
}
onBeforeUnmount(() => {
  void audio?.close();
});
</script>
<template>
  <div class="abacus-wrap">
    <div class="abacus" aria-label="可互动的九档算盘预览">
      <img
        class="abacus-body"
        src="/images/instrument.webp"
        alt=""
        width="1600"
        height="740"
        fetchpriority="high"
      />
      <div class="abacus-top caption-4">
        <span>自由 <AppIcon name="down" :size="12" /></span
        ><span class="abacus-hint">轻拨入数 · 心中有数</span
        ><output class="title-1" :aria-label="`当前数值 ${value}`">{{
          value.toLocaleString("en-US")
        }}</output>
      </div>
      <div class="rods">
        <div
          v-for="(rod, index) in rods"
          :key="index"
          class="rod"
          role="slider"
          tabindex="0"
          :aria-label="`${labels[index]}位，方向键调整`"
          :aria-valuenow="rod.upper * 5 + rod.lower"
          :aria-valuemin="0"
          :aria-valuemax="15"
          @keydown="adjust(index, $event)"
        >
          <span class="rod-line" />
          <button
            v-for="bead in 2"
            :key="`u${bead}`"
            class="bead"
            :style="{
              '--bead-top': `${1.4 + (2 - bead) * 7.1}%`,
              '--bead-offset': bead - 1 < rod.upper ? '215%' : '0%',
            }"
            tabindex="-1"
            aria-hidden="true"
            @click="move(index, true, bead - 1)"
          >
            <img
              :src="`/images/${material.id}-bead.webp`"
              alt=""
              draggable="false"
              width="240"
              height="160"
            />
          </button>
          <button
            v-for="bead in 5"
            :key="`l${bead}`"
            class="bead"
            :style="{
              '--bead-top': `${60.6 + (bead - 1) * 7.1}%`,
              '--bead-offset': bead - 1 < rod.lower ? '-285%' : '0%',
            }"
            tabindex="-1"
            aria-hidden="true"
            @click="move(index, false, bead - 1)"
          >
            <img
              :src="`/images/${material.id}-bead.webp`"
              alt=""
              draggable="false"
              width="240"
              height="160"
            />
          </button>
          <span class="rod-label caption-5">{{ labels[index] }}</span>
        </div>
      </div>
      <img
        class="abacus-beam"
        src="/images/instrument.webp"
        alt=""
        width="1600"
        height="740"
      />
      <span class="abacus-material caption-5">{{ material.name }} · 珠记</span>
    </div>
    <div class="abacus-toolbar">
      <output class="caption-5" aria-live="polite"
        >当前数值 {{ value.toLocaleString("en-US") }}</output
      >
      <div>
        <button
          class="caption-4"
          :aria-label="sound ? '关闭拨珠声音' : '开启拨珠声音'"
          :aria-pressed="sound"
          @click="toggleSound"
        >
          <AppIcon :name="sound ? 'sound' : 'mute'" :size="16" /><span>{{
            sound ? "声音已开启" : "开启声音"
          }}</span></button
        ><button class="caption-4" @click="reset">
          <AppIcon name="reset" :size="16" />归零
        </button>
      </div>
    </div>
    <p v-if="audioError" class="audio-error caption-5" role="status">
      {{ audioError }}
    </p>
  </div>
</template>
<style scoped lang="scss">
.abacus-wrap {
  width: 100%;
  min-width: 0;
}
.abacus {
  position: relative;
  width: 100%;
  aspect-ratio: 2.162;
  color: #d8c69c;
  isolation: isolate;
  user-select: none;
}
.abacus-body {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  pointer-events: none;
}
.abacus-top {
  position: absolute;
  inset: 4% 5% auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  output {
    color: #f0e8d2;
    width: 28%;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
}
.abacus-hint {
  opacity: 0.65;
}
.rods {
  position: absolute;
  inset: 13.2% 4.1% 14.4%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
}
.rod {
  position: relative;
  border-radius: 8px;
  outline-offset: -2px;
}
.rod-line {
  position: absolute;
  width: 4%;
  height: 100%;
  top: 0;
  left: 48%;
  background: #bda568;
  box-shadow: 2px 0 4px #13120990;
}
.bead {
  position: absolute;
  top: var(--bead-top);
  transform: translateY(var(--bead-offset));
  width: 88%;
  height: 8%;
  left: 6%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: transform 0.5s var(--ease);
  z-index: 2;
  touch-action: manipulation;
  img {
    position: absolute;
    width: 113%;
    height: 137%;
    top: -19%;
    left: -6.5%;
    filter: drop-shadow(0 4px 2px #13120980);
  }
  &:active {
    transform: translateY(var(--bead-offset));
  }
}
.rod-label {
  position: absolute;
  top: 33%;
  width: 100%;
  text-align: center;
  z-index: 4;
  color: #b6a575;
  pointer-events: none;
}
.abacus-beam {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  clip-path: inset(37% 0 56.6%);
  pointer-events: none;
  z-index: 3;
}
.abacus-material {
  position: absolute;
  bottom: 4%;
  left: 5%;
  color: #b6a575;
}
.abacus-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: var(--secondary);
  output {
    font-variant-numeric: tabular-nums;
  }
  > div {
    display: flex;
    gap: 8px;
  }
  button {
    background: transparent;
    color: inherit;
    border: 0;
    border-radius: 8px;
    padding: 8px;
    min-height: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition:
      background-color 0.3s var(--ease),
      color 0.3s var(--ease),
      transform 0.5s var(--ease);
    &:hover {
      background: var(--active);
      color: var(--text);
    }
    &[aria-pressed="true"] {
      color: var(--accent);
    }
  }
}
.audio-error {
  margin-top: 8px;
  color: var(--accent);
}
@media (max-width: 760px) {
  .abacus-hint {
    display: none;
  }
  .abacus-top output {
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
  }
  .abacus-top {
    top: 3%;
  }
  .abacus-material {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    bottom: 1%;
  }
  .rod-label {
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
  }
  .abacus-toolbar {
    > output {
      display: none;
    }
    > div {
      width: 100%;
      justify-content: space-between;
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .bead {
    transition: none;
  }
}
</style>
