<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocumentLayout from "../components/DocumentLayout.vue";
import { documents } from "../documents";
</script>
<template>
  <DocumentLayout :document="documents.terms">
    <article class="document-article" aria-label="使用条款正文">
<section id="abacus" aria-labelledby="abacus-title">
<h2 id="abacus-title">算盘、演算与练习</h2>
<p>
        珠记提供自由算盘、演算、挑战与每日一数。当前演算支持两个非负整数的加、减、乘、除，用于观察数位变化，暂不提供完整的乘除珠算口诀课程。重要数值请结合实际用途自行核对。
      </p>
</section>
<section id="data" aria-labelledby="data-title">
<h2 id="data-title">记账与数据保存</h2>
<p>
        记账用于手动记录日常收支，不连接银行或支付账户。账目保存在当前设备的应用存储中，当前没有应用内云同步、跨设备同步或账本导出。删除应用或更换设备前，请先了解设备系统备份和数据保留情况。
      </p>
</section>
<section id="preview" aria-labelledby="preview-title">
<h2 id="preview-title">网页互动预览</h2>
<p>
        本网站的算盘为简化演示，不保存拨珠记录，也不创建真实账目。完整的规制切换、拖动拨珠和记账功能在原生应用中提供。
      </p>
</section>
<section id="download-info" aria-labelledby="download-info-title">
<h2 id="download-info-title">下载与购买信息</h2>
<p>
        应用价格、购买及退款事项，以 App Store、AppGallery
        实际展示及对应商店的服务规则为准；本网页不收取费用或接受付款。
      </p>
</section>
<section id="feedback" aria-labelledby="feedback-title">
<h2 id="feedback-title">隐私与反馈</h2>
<p>
        关于应用数据处理，请阅读<RouterLink to="/privacy">隐私政策</RouterLink>。
        使用问题和功能建议可以发送至<a href="mailto:ssflood7d@gmail.com">ssflood7d@gmail.com</a>，
        也可先查看<RouterLink to="/support">技术支持</RouterLink>。
      </p>
</section>
    </article>
  </DocumentLayout>
</template>
