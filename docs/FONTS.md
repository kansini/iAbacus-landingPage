# 网站与 App 的字体

## 原因与修正

旧版网站加载的 Geist WOFF2 文件只有 225 个拉丁字形，不包含中文。它可以正常服务于英文，但“珠记”等文字会回退为 PingFang SC 或 Microsoft YaHei。编辑器对 `/fonts/...` 的标记不能用来判断字体是否在浏览器加载。

App 在 `iAbacus-ios/iAbacus/AbacusStyle.swift` 中使用 `NotoSerifSC-Regular`，原文件为 `iAbacus-ios/iAbacus/Fonts/NotoSerifSC.ttf`。

网站现在直接使用这份原文件生成的 WOFF2：

- `public/fonts/noto-serif-sc-web.woff2`：当前页面用字、ASCII 和常用标点的子集，155,968 字节，包含 1,068 个码点。
- `public/fonts/noto-serif-sc-complete.woff2`：同款完整字库的后备，5,709,388 字节。只有页面遇到子集没有覆盖的字形时才需要下载。
- `public/fonts/app-fonts.css`：两个字体面的统一声明。
- `public/fonts/noto-serif-sc-manifest.json`：原文件 SHA-256、实际字重、覆盖码点与文件大小。
- `public/fonts/NotoSerifSC-OFL.txt`：随 App 原字体复制的授权。

首页、隐私政策、使用条款、技术支持与 404 都接入同一声明，并预加载较小的常用字文件。下载徽章的品牌排版仍保留 Geist。

原始 App 字体是静态 Regular，实际字重为 400，没有可变轴。CSS 如实声明为 400；网站 500、600 等强调字重通过 `font-synthesis: weight` 由浏览器合成，不会把静态文件错误声明为 `100 900`。与 App 使用相同字体文件，不代表不同平台的抗锯齿和字重合成会完全相同。

## 更新字体子集

当前完整后备能保证新增且原字体支持的字形仍使用同款字体。大幅改文案后建议更新子集，避免为新字触发完整后备下载。

安装 FontTools 的 WOFF 支持后执行：

```sh
python3 scripts/build-web-fonts.py --source /path/to/iAbacus-ios/iAbacus/Fonts/NotoSerifSC.ttf
```

不传 `--source` 时按目前相邻 App 仓库的目录寻找原字体。该脚本扫描 `src` 与 `public` 中的源码和页面，保留实际使用的字形；普通 Vite 构建不依赖 Python。

## 验证

- 本地读取两份字体的 cmap，确认旧 Geist 不支持“珠记指尖有数”，App 原文件支持。
- 抽查“珠记指尖有数一拨”八个字，WOFF2 子集与 App 原字体的轮廓、字宽完全一致。
- 临时浏览器检查页确认：主字体状态 loaded，完整后备初始 unloaded；加入子集没有覆盖的“丁”后，完整后备转为 loaded。
- 浏览器首页主字体为 Noto Serif SC，下载徽章品牌排版为 Geist。
- 构建、中文渲染及窄屏布局检查。临时检查页已删除。
