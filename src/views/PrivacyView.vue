<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocumentLayout from "../components/DocumentLayout.vue";
import { documents } from "../documents";
</script>
<template>
  <DocumentLayout :document="documents.privacy">
<article class="document-article" aria-label="隐私政策正文">
<div class="summary">
<h2>你的账目，由你保管。</h2>
<p>珠记的核心功能无需账号、无需联网。账目和设置在本机处理，开发者不会自动接收你的账目内容。系统备份和你主动发送的支持邮件，分别按下文说明处理。</p>
<div class="facts" aria-label="隐私概览">
<span>无需账号</span>
<span>账目本机保存</span>
<span>无广告跟踪</span>
</div>
</div>
<section id="scope" aria-labelledby="scope-title">
<h2 id="scope-title">关于本政策</h2>
<p>本隐私政策说明珠记 iOS 应用如何处理与你有关的信息，以及你可以如何管理这些信息。本政策中的“我们”指珠记开发者。</p>
<p>本政策适用于当前版本提供的算盘、演算、挑战、随手记账及设置功能，也说明通过技术支持邮箱联系我们时的信息处理方式。App Store、iOS 系统备份及邮件服务各自的数据处理规则，由相应服务提供者说明。</p>
</section>
<section id="local-data" aria-labelledby="local-data-title">
<h2 id="local-data-title">应用在本机处理的信息</h2>
<p>珠记无需注册或登录。你输入的账目和选择的偏好设置保存在设备的应用存储空间中，用于提供相应功能，不会由珠记自动上传至开发者服务器。</p>
<div class="table-wrap" role="region" aria-label="本机数据及用途" tabindex="0">
<table>
<thead>
<tr>
<th scope="col">信息类型</th>
<th scope="col">内容与用途</th>
<th scope="col">处理位置</th>
</tr>
</thead>
<tbody>
<tr>
<td>账目记录</td>
<td>金额、收入或支出类型、分类、备注、记账日期，以及记录标识、创建和修改时间。用于保存、展示、查找、修改、删除账目和计算统计。</td>
<td>本机应用存储</td>
</tr>
<tr>
<td>偏好设置</td>
<td>算盘规制、材质、声音、使用模式及图标跟随选项。用于记住你的使用偏好。</td>
<td>本机应用存储</td>
</tr>
<tr>
<td>演算与练习</td>
<td>算式、算盘数值和练习交互在设备上处理，用于展示演算和判断拨珠结果。</td>
<td>本机运行，不向开发者发送</td>
</tr>
</tbody>
</table>
</div>
<p>账目可能包含你自行输入的私人或财务内容。是否记录以及记录哪些内容，由你决定。珠记不会访问你的银行账户、支付账户或交易账单。</p>
</section>
<section id="permissions" aria-labelledby="permissions-title">
<h2 id="permissions-title">权限、广告与跟踪</h2>
<p>当前版本不接入广告、第三方统计或第三方崩溃分析 SDK，不使用广告标识符进行跟踪，也不建立用户画像。</p>
<p>核心功能不申请定位、通讯录、照片、相机或麦克风访问权限。拨珠声音由应用在本机生成和播放，不录制环境声音。“摇一摇归零”使用系统提供的摇动事件在设备上响应，不向开发者发送动作或传感器记录。</p>
<p>应用使用 Apple 提供的系统功能完成本地存储、声音播放、界面展示和图标切换。这些调用不代表开发者可以读取你在 Apple 账户中的信息。</p>
</section>
<section id="storage" aria-labelledby="storage-title">
<h2 id="storage-title">保存、备份与安全</h2>
<p>账目和设置会在设备上保存，供你后续使用。我们没有用于保管这些账目内容的开发者服务器，也无法从服务器为你找回本机账目。</p>
<p>当前版本不提供应用内云同步、跨设备同步或账本导出功能。根据你的 iOS 设置，应用数据可能被纳入 iCloud 或电脑的系统备份；这属于系统备份功能，与珠记提供云同步不同。备份的保存、恢复和删除由 Apple 及你的系统设置控制。请参阅 <a href="https://www.apple.com/legal/privacy/szh/" rel="external noreferrer">Apple 隐私政策</a>。</p>
<div class="note">本机保存并不等于永不丢失。删除 App、设备损坏或系统恢复可能影响数据。请妥善保管设备，并根据需要管理系统备份。</div>
<p>珠记使用 iOS 应用存储隔离机制保存本地文件。当前版本未提供应用内独立密码锁；请使用设备锁屏密码等系统安全功能保护设备。</p>
</section>
<section id="control" aria-labelledby="control-title">
<h2 id="control-title">你对数据的管理</h2>
<ul>
<li>
<strong>查看和更正：</strong>进入账本，查找并打开一笔记录，可以查看或修改金额、日期、收支类型、分类及备注。</li>
<li>
<strong>删除账目：</strong>在账目详情中选择删除并确认。应用会短暂提供撤销操作；撤销提示结束后，无法通过该提示恢复。</li>
<li>
<strong>移除本地数据：</strong>在 iOS 中删除 App 通常会同时移除该设备上的应用数据。系统的“卸载 App”选项可能保留文稿与数据，不等同于删除 App。</li>
<li>
<strong>管理备份：</strong>如需删除系统备份中保留的数据，请通过相应的 iCloud 或电脑备份管理功能操作。删除本机记录不代表历史备份也已删除。</li>
</ul>
<p>珠记没有账号系统，因此无需注销账号。开发者无法直接读取、修改或远程删除你设备中的账目。对于你主动通过邮件提供的信息，可以通过本页邮箱提出查阅、更正或删除请求；我们会核实并在适用法律允许的范围内处理。</p>
</section>
<section id="support-data" aria-labelledby="support-data-title">
<h2 id="support-data-title">邮件反馈与网页访问</h2>
<p>当你主动发送邮件至 <a href="mailto:ssflood7d@gmail.com">ssflood7d@gmail.com</a> 时，我们会收到你的发件邮箱、邮件内容，以及你主动提供的设备型号、系统版本、应用版本、截图或附件。这些信息仅用于回复咨询、排查问题和处理你的隐私请求，不会用于广告营销。</p>
<p>请只提供解决问题所需的信息。发送截图前，请遮挡私人账目、身份信息和其他敏感内容；无需提供完整账本或任何密码。我们仅在处理问题、必要跟进或法律要求所需的期间保留支持邮件。你可以通过同一邮箱请求删除主动提供的信息。</p>
<p>我们使用 Gmail 接收支持邮件。来信会通过邮件服务商处理和存储，可能涉及你所在国家或地区之外的服务器。你可查看 <a href="https://policies.google.com/privacy?hl=zh-CN" rel="external noreferrer">Google 隐私权政策</a>，并自行决定发送内容。珠记应用不会自动向该邮箱发送任何账目或诊断信息。</p>
<p>本隐私政策及技术支持页面本身不使用 Cookies、统计脚本或跟踪像素。网站仅在浏览器本地保存明暗主题偏好，不向开发者发送这项偏好。网页托管服务可能为交付网页和保障安全记录 IP 地址、访问时间和浏览器信息，具体以实际托管服务的说明为准。</p>
</section>
<section id="sharing" aria-labelledby="sharing-title">
<h2 id="sharing-title">共享、披露与未成年人</h2>
<p>我们不会出售或出租你的个人信息，也不会把支持邮件用于第三方广告。应用不会自动向开发者或第三方共享你的账目。对于主动发给我们的信息，除完成邮件传递和存储所需的服务处理、依法必须披露，或你另行明确要求的情况外，我们不向无关第三方提供。</p>
<p>珠记不通过应用主动收集未成年人的个人信息，也不要求填写年龄或身份资料。未成年人联系技术支持时，应在监护人的指导下提供必要信息。如你认为未成年人向我们发送了不必要的个人信息，请联系我们处理。</p>
</section>
<section id="changes" aria-labelledby="changes-title">
<h2 id="changes-title">政策更新</h2>
<p>如果功能或信息处理方式发生变化，我们会更新本页内容和更新日期。涉及新增个人信息收集或用途的变化，将在相关功能启用前依法说明，并在需要时征得同意。请以你所使用版本对应的说明和实际功能为准。</p>
</section>
<section id="contact" aria-labelledby="contact-title">
<h2 id="contact-title">联系我们</h2>
<p>如对本政策、本地数据管理或邮件信息的处理有疑问，请联系珠记开发者。</p>
<div class="contact">
<h3>隐私咨询邮箱</h3>
<a class="email" href="mailto:ssflood7d@gmail.com?subject=%E7%8F%A0%E8%AE%B0%E9%9A%90%E7%A7%81%E5%92%A8%E8%AF%A2">ssflood7d@gmail.com</a>
<p class="muted">建议在主题中注明“珠记隐私咨询”，并说明你的具体问题。我们会尽快核实并回复。</p>
<a class="button" href="mailto:ssflood7d@gmail.com?subject=%E7%8F%A0%E8%AE%B0%E9%9A%90%E7%A7%81%E5%92%A8%E8%AF%A2">发送隐私咨询 <span aria-hidden="true">↗</span>
</a>
</div>
<p>如果你需要功能说明或故障排查，请前往 <RouterLink to="/support">技术支持页面</RouterLink>。</p>
</section>
</article>
  </DocumentLayout>
</template>
