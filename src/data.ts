export const materials = [
  {
    id: "jade",
    name: "青玉",
    note: "温凉如玉，一拨一响",
    color: "#93ad98",
    frequency: 1240,
  },
  {
    id: "rosewood",
    name: "紫檀",
    note: "沉静木响，温润在手",
    color: "#80533f",
    frequency: 780,
  },
  {
    id: "brass",
    name: "黄铜",
    note: "清脆金声，余韵悠长",
    color: "#bc9952",
    frequency: 1740,
  },
  {
    id: "glass",
    name: "琉璃",
    note: "澄澈轻盈，空灵回响",
    color: "#8cbbc8",
    frequency: 2400,
  },
  {
    id: "porcelain",
    name: "白瓷",
    note: "素白温润，清音如磬",
    color: "#ddd4bf",
    frequency: 2100,
  },
  {
    id: "obsidian",
    name: "黑曜",
    note: "玄色凝光，沉声入静",
    color: "#54565b",
    frequency: 1080,
  },
  {
    id: "carnelian",
    name: "玛瑙",
    note: "赤霞流纹，珠落有声",
    color: "#ad593e",
    frequency: 1550,
  },
  {
    id: "amber",
    name: "琥珀",
    note: "蜜色含光，轻叩温柔",
    color: "#c78c38",
    frequency: 620,
  },
] as const;
export type Material = (typeof materials)[number];
// 下载地址未配置时，保留商店徽章并禁用跳转。
function downloadUrl(value: string | undefined): string {
  try {
    const url = new URL(value?.trim() || "");
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}
export const appStoreUrl = downloadUrl(import.meta.env.VITE_APP_STORE_URL);
export const appGalleryUrl = downloadUrl(import.meta.env.VITE_APP_GALLERY_URL);
