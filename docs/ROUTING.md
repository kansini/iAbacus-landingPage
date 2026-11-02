# 路由与文档页面

`src/router.ts` 使用 Vue Router 的 HTML5 history 管理首页、隐私政策、使用条款、技术支持和未找到页面。原来的 `.html` 路径重定向至无扩展名的路由，保留查询参数与片段。Netlify 配置在 `public/_redirects`，不需要保留原先的独立 HTML 页面。

`src/App.vue` 只负责共享导航、主题开关、移动端菜单与页脚。首页内容和 GSAP 生命周期位于 `src/views/HomeView.vue`，离开首页后清理 ScrollTrigger、观察器和 pin spacer，返回后重新创建。文档页按路由懒加载，共用 `DocumentLayout.vue` 和 `_documents.scss`，正文由原页面迁移，不通过 v-html 注入。标题、描述、robots 元数据随路由更新。

页脚使用单独的向上箭头；首页「向下探索」保留下箭头。所有页的「回到顶部」返回实际滚动位置 0。目录锚点预留 112px，避开悬浮导航；跨页进入锚点先等待路由 DOM 和 GSAP 布局挂载。同页锚点平滑滚动，减少动态效果时立即定位，浏览器前进后退恢复保存位置。切换页面后将焦点交给正文，移动菜单关闭时释放滚动锁。

Netlify 的通用 SPA 回退返回 HTTP 200，未知路由由客户端显示未找到页面并标记 noindex。若需要服务器层面的真实 404 或预渲染元数据，应另行配置服务器或预渲染构建。
