# 珠记 iAbacus 落地页

Vue 3 + TypeScript + Vite，使用 SCSS、GSAP、Geist 与 Phosphor 图标。

```sh
yarn install
yarn dev
yarn build
yarn preview
```

## 上架后启用下载

将 `.env.example` 复制为 `.env.local`，填写正式的 `VITE_APP_STORE_URL=https://apps.apple.com/...`，重新构建。AppGallery 链接使用 `VITE_APP_GALLERY_URL`。首屏和页尾共用 App Store、AppGallery 两种商店徽章；地址留空时按钮保持展示但禁用跳转，不显示上架状态文案，也不弹出提示。

## 页面与交互

- 深色平面背景、青玉色点缀、悬浮导航和带焦点管理的全屏手机菜单。
- 可交互九档算盘，支持点击拨珠、方向键调整、归零与默认关闭的音效。
- 八种材质切换，以及记账、演算、每日一数标签页，标签支持方向键、Home 和 End。
- 独立的大字标语区，由 ScrollTrigger 驱动桌面停驻与逐词显现；首屏算珠、算盘、材质、账簿和下载图标具备分层视差。普通入场由 IntersectionObserver 触发 GSAP。动画只改变 transform 与 opacity，并支持系统减少动态效果。
- 真实 App 账簿截图与三步记账说明，八项可搜索 FAQ，含空结果反馈。
- 图片具有占位骨架、加载失败提示和重试入口。
- 隐私政策、技术支持、使用说明与品牌 404 页面。

字号、行高和字重集中在 `src/style.scss` 的命名样式表，间距使用指定技能的令牌。网站主字体已统一为原生 App 同款 Noto Serif SC（思源宋体），直接由 App 的 NotoSerifSC-Regular 原文件生成。常用页面文字使用较小的 WOFF2 子集，新增字形按需加载同款完整字体；不依赖系统黑体。原字体只有 Regular，强调字重由浏览器合成。下载徽章的品牌英文使用 Geist。授权分别见 `public/fonts/NotoSerifSC-OFL.txt` 与 `public/fonts/OFL.txt`。字体构建及验证见 `docs/FONTS.md`。

## 资源与部署

素材来源见 `public/images/SOURCES.md`，截图为应用实际运行界面和示例账目。简化网页算盘不保存数据，完整拖动、规制切换、摇动归零及记账由原生 App 提供。

生产产物位于 `dist/`。静态托管应把缺失路径的 404 响应指向 `404.html`；Vite 开发模式和 SPA 回退也提供品牌未找到界面，但 HTTP 状态由托管服务器决定。首页包含标题、描述、分享图片和社交元数据，适合作为长期产品页面被索引。

当前不使用 Cookie、表单收集或第三方统计服务，没有价格、评价、下载量或退款保证等未经确认的宣传。

设计依据、内容方案与检查范围见 `docs/REDESIGN.md`；滚动场景、响应式降级与动效验证见 `docs/MOTION.md`。
