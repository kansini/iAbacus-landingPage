<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocumentLayout from "../components/DocumentLayout.vue";
import { documents } from "../documents";
</script>
<template>
  <DocumentLayout :document="documents.support">
<article class="document-article" aria-label="技术支持正文">
<div class="summary">
<h2>使用中的问题，写信给我们。</h2>
<a class="support-email" href="mailto:ssflood7d@gmail.com">ssflood7d@gmail.com</a>
<p>这里有算盘使用说明、记账帮助和常见问题。需要进一步协助时，可以通过邮件联系珠记开发者。</p>
<a class="button" href="mailto:ssflood7d@gmail.com?subject=%E7%8F%A0%E8%AE%B0%20iOS%20%E4%BD%BF%E7%94%A8%E5%8F%8D%E9%A6%88&amp;body=%E5%BA%94%E7%94%A8%E7%89%88%E6%9C%AC%EF%BC%9A%0AiPhone%20%E5%9E%8B%E5%8F%B7%EF%BC%9A%0AiOS%20%E7%89%88%E6%9C%AC%EF%BC%9A%0A%0A%E9%97%AE%E9%A2%98%E5%87%BA%E7%8E%B0%E5%89%8D%E7%9A%84%E6%93%8D%E4%BD%9C%EF%BC%9A%0A%E9%A2%84%E6%9C%9F%E7%BB%93%E6%9E%9C%EF%BC%9A%0A%E5%AE%9E%E9%99%85%E7%BB%93%E6%9E%9C%EF%BC%9A%0A%0A%E5%A6%82%E9%99%84%E6%88%AA%E5%9B%BE%EF%BC%8C%E8%AF%B7%E5%85%88%E9%81%AE%E6%8C%A1%E7%A7%81%E4%BA%BA%E8%B4%A6%E7%9B%AE%E5%8F%8A%E5%85%B6%E4%BB%96%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E3%80%82">发送使用反馈 <span aria-hidden="true">↗</span>
</a>
</div>
<section id="start" aria-labelledby="start-title">
<h2 id="start-title">快速开始</h2>
<div class="quick-start">
<div class="step">
<span class="step-no">01 / 拨珠</span>
<h3>横过手机，展开算盘</h3>
<p>轻点或拖动算珠，靠近横梁的算珠才计数。每颗上珠为五，每颗下珠为一。默认最右为个位，向左依次进十。</p>
</div>
<div class="step">
<span class="step-no">02 / 演算</span>
<h3>让算盘，算给你看</h3>
<p>在模式菜单选择“演算”，输入如 128 + 256 的算式。可以暂停、单步查看和重播数值变化。</p>
</div>
<div class="step">
<span class="step-no">03 / 练习</span>
<h3>每天一数，慢慢来</h3>
<p>在模式菜单选择“挑战”或“每日一数”，根据提示拨出对应数值。每日一数没有倒计时。</p>
</div>
<div class="step">
<span class="step-no">04 / 记账</span>
<h3>拨出金额，记下这一笔</h3>
<p>点击“记账”进入小账，选择收入或支出，填写分类与备注，再保存。金额区域也支持直接输入。</p>
</div>
</div>
</section>
<section id="ledger" aria-labelledby="ledger-title">
<h2 id="ledger-title">账本与数据管理</h2>
<p>从“全部账目”或“账簿”进入账本，可以查看收支流水、月结和分类统计。通过“查账”按事由、金额或分类搜索，也可以按日期和收支类型筛选。打开一笔记录后，可以修改内容或确认删除。</p>
<p>当前版本的记账金额按人民币的元、角、分展示，支持两位小数；每笔金额须大于零，最高为 ¥9,999,999.99。当前版本不提供多币种换算。</p>
<div class="note">账目保存在本机。当前没有应用内云同步、跨设备同步或账本导出功能。开发者无法远程读取或恢复你的账目；删除 App 前，请先了解设备系统备份及数据保留情况。</div>
<p>如需了解删除数据、管理系统备份及隐私咨询的方式，请阅读 <RouterLink to="/privacy#control">隐私政策中的数据管理说明</RouterLink>。</p>
</section>
<section id="faq" aria-labelledby="faq-title">
<h2 id="faq-title">常见问题</h2>
<details open>
<summary>为什么应用是横屏？</summary>
<p>珠记以横屏呈现完整算盘和双页账本。请横向持握 iPhone；如显示方向异常，可退出后重新打开应用，并检查系统方向锁定设置。</p>
</details>
<details>
<summary>“上二下五”和“上一下四”有什么区别？</summary>
<p>两种规制的上珠都以五计、下珠都以一计。“上二下五”保留传统算盘的更多珠位表达，“上一下四”每档通常表示零至九。在设置中可切换规制；如果当前数值或暂存草稿无法适配，应用会提示先调整数值或归零。</p>
</details>
<details>
<summary>如何归零？会删除账目吗？</summary>
<p>点击算盘上的“归零”，或在算盘页面摇一摇手机，即可清空当前珠位。归零不删除已保存的账目；账目需在详情页单独删除。</p>
</details>
<details>
<summary>为什么有些算式不能演算？</summary>
<p>当前演算支持两个非负整数的加、减、乘、除，结果范围为 0 至 999,999,999。除数不能为零，除法结果必须为整数；负数、小数结果及连续多项算式暂不支持。</p>
</details>
<details>
<summary>为什么乘法、除法没有完整珠算口诀教学？</summary>
<p>当前演算功能中，加减展示数位变化；乘除按数位拨入计算结果。它用于观察算盘数值变化，当前不提供完整的乘除珠算口诀课程。</p>
</details>
<details>
<summary>为什么没有拨珠声音？</summary>
<p>请检查应用中的声音开关、iPhone 静音模式和设备音量，也可检查声音是否输出到了耳机或其他音频设备。珠记在系统静音模式下不播放拨珠声。</p>
</details>
<details>
<summary>如何切换材质和桌面图标？</summary>
<p>点击算盘左下方的材质名称，可选择青玉、紫檀、黄铜、琉璃、白瓷、黑曜、玛瑙或琥珀。在材质面板或设置中开启“桌面图标跟随算珠”后，图标会随材质切换；关闭后恢复青玉图标。iOS 可能显示系统图标更改提示。</p>
</details>
<details>
<summary>需要注册、联网或登录银行账户吗？</summary>
<p>不需要。算盘、演算、挑战和本地记账均可离线使用。珠记不会连接或读取你的银行、支付账户。浏览帮助网页或发送邮件时，需要使用相应的网络服务。</p>
</details>
<details>
<summary>换手机后能自动同步账目吗？</summary>
<p>当前没有应用内跨设备同步。账目是否能通过 iOS 系统备份或设备迁移恢复，取决于你的系统设置、备份内容和恢复结果；请勿将其视为应用提供的同步保证。</p>
</details>
<details>
<summary>账目误删后能恢复吗？</summary>
<p>删除后，应用会短暂显示撤销提示，可在提示仍可用时选择“撤销”。提示结束后，当前版本没有回收站或开发者云端备份可供恢复。</p>
</details>
<details>
<summary>出现“账目暂时无法读取”或保存失败怎么办？</summary>
<p>先保留当前应用和设备中的数据，不要急于删除 App 或清理文稿。检查设备可用空间，记录提示文字、应用版本和发生问题前的操作，然后联系技术支持。请勿直接发送完整账本文件。</p>
</details>
<details>
<summary>支持哪些设备和系统版本？</summary>
<p>当前版本面向 iPhone，使用横屏界面。最低 iOS 版本与具体兼容设备，请以 App Store 中该版本的兼容性信息为准。</p>
</details>
</section>
<section id="report" aria-labelledby="report-title">
<h2 id="report-title">反馈问题</h2>
<p>如果上述说明没有解决问题，请发送邮件至 <a href="mailto:ssflood7d@gmail.com">ssflood7d@gmail.com</a>。为了帮助我们定位问题，可以提供：</p>
<ul class="feedback-list">
<li>珠记的应用版本</li>
<li>iPhone 型号与 iOS 版本</li>
<li>出现问题前的操作步骤</li>
<li>预期结果与实际表现</li>
<li>是否每次都能重现</li>
<li>必要时附上已遮挡隐私的截图</li>
</ul>
<p class="muted">请不要发送密码、身份资料或完整账本。截图中的私人金额、备注和其他敏感内容，请先遮挡。</p>
<a class="button" href="mailto:ssflood7d@gmail.com?subject=%E7%8F%A0%E8%AE%B0%20iOS%20%E4%BD%BF%E7%94%A8%E5%8F%8D%E9%A6%88&amp;body=%E5%BA%94%E7%94%A8%E7%89%88%E6%9C%AC%EF%BC%9A%0AiPhone%20%E5%9E%8B%E5%8F%B7%EF%BC%9A%0AiOS%20%E7%89%88%E6%9C%AC%EF%BC%9A%0A%0A%E9%97%AE%E9%A2%98%E5%87%BA%E7%8E%B0%E5%89%8D%E7%9A%84%E6%93%8D%E4%BD%9C%EF%BC%9A%0A%E9%A2%84%E6%9C%9F%E7%BB%93%E6%9E%9C%EF%BC%9A%0A%E5%AE%9E%E9%99%85%E7%BB%93%E6%9E%9C%EF%BC%9A%0A%0A%E5%A6%82%E9%99%84%E6%88%AA%E5%9B%BE%EF%BC%8C%E8%AF%B7%E5%85%88%E9%81%AE%E6%8C%A1%E7%A7%81%E4%BA%BA%E8%B4%A6%E7%9B%AE%E5%8F%8A%E5%85%B6%E4%BB%96%E6%95%8F%E6%84%9F%E4%BF%A1%E6%81%AF%E3%80%82">用邮件反馈问题 <span aria-hidden="true">↗</span>
</a>
</section>
<section id="contact" aria-labelledby="contact-title">
<h2 id="contact-title">联系开发者</h2>
<div class="contact">
<h3>珠记技术支持</h3>
<a class="email" href="mailto:ssflood7d@gmail.com">ssflood7d@gmail.com</a>
<p>适用于使用咨询、故障反馈和功能建议。我们会尽快核实并回复你的来信。</p>
<p class="muted">点击邮箱将调用设备上可用的邮件应用；如无法打开，可复制邮箱地址，在你常用的邮件服务中发送。</p>
</div>
<p>关于个人信息和数据管理的咨询，请参阅 <RouterLink to="/privacy#contact">隐私政策中的联系方式</RouterLink>。应用价格和购买相关事项，以 App Store 实际展示及 Apple 的相应服务规则为准。</p>
</section>
</article>
  </DocumentLayout>
</template>
