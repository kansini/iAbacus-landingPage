# 珠记 iAbacus 落地页

Vue 3 + TypeScript + Vite，使用 SCSS、GSAP、Geist 与 Phosphor 图标。

```sh
yarn install
yarn dev
yarn build
yarn preview
```

## 上架后启用下载

将 `.env.example` 复制为 `.env.local`，填写正式的 `VITE_APP_STORE_URL=https://apps.apple.com/...`，重新构建。所有下载按钮共用该配置。未配置时保留「下载珠记」按钮，点击显示正在准备上架的说明。

## 页面与交互

- 深色平面背景、青玉色点缀、悬浮导航和带焦点管理的全屏手机菜单。
- 可交互九档算盘，支持点击拨珠、方向键调整、归零与默认关闭的音效。
- 八种材质切换，以及记账、演算、每日一数标签页，标签支持方向键、Home 和 End。
- 独立的大字标语区，通过 IntersectionObserver 逐词触发显现；页面入场由 GSAP 执行。动画只改变 transform 与 opacity，并支持系统减少动态效果。
- 真实 App 账簿截图与三步记账说明，八项可搜索 FAQ，含空结果反馈。
- 图片具有占位骨架、加载失败提示和重试入口。
- 隐私政策、技术支持、使用说明与品牌 404 页面。

字号、行高和字重集中在 `src/style.scss` 的命名样式表，间距使用指定技能的令牌。Latin 使用本地 Geist 字体，中文字符使用同一字体栈中的系统中文回退。字体授权见 `public/fonts/OFL.txt`。

## 资源与部署

素材来源见 `public/images/SOURCES.md`，截图为应用实际运行界面和示例账目。简化网页算盘不保存数据，完整拖动、规制切换、摇动归零及记账由原生 App 提供。

生产产物位于 `dist/`。静态托管应把缺失路径的 404 响应指向 `404.html`；Vite 开发模式和 SPA 回退也提供品牌未找到界面，但 HTTP 状态由托管服务器决定。首页包含标题、描述、分享图片和社交元数据，适合作为长期产品页面被索引。

当前不使用 Cookie、表单收集或第三方统计服务，没有价格、评价、下载量或退款保证等未经确认的宣传。

设计依据、内容方案与检查范围见 `docs/REDESIGN.md`。
