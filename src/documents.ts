export type DocumentPage = {
  title: string;
  lead: string;
  eyebrow: string;
  sections: { id: string; label: string }[];
};
export const documents = {
  "privacy": {
    "title": "隐私政策",
    "lead": "清楚说明本机数据、系统备份与邮件反馈的处理方式，让每一笔记录都有据可循。",
    "eyebrow": "珠记 / 隐私与数据",
    "sections": [
      {
        "id": "scope",
        "label": "关于本政策"
      },
      {
        "id": "local-data",
        "label": "应用在本机处理的信息"
      },
      {
        "id": "permissions",
        "label": "权限、广告与跟踪"
      },
      {
        "id": "storage",
        "label": "保存、备份与安全"
      },
      {
        "id": "control",
        "label": "你对数据的管理"
      },
      {
        "id": "support-data",
        "label": "邮件反馈与网页访问"
      },
      {
        "id": "sharing",
        "label": "共享、披露与未成年人"
      },
      {
        "id": "changes",
        "label": "政策更新"
      },
      {
        "id": "contact",
        "label": "联系我们"
      }
    ]
  },
  "support": {
    "title": "技术支持",
    "lead": "从第一颗算珠，到记下日常收支。这里为你解答珠记的使用问题。",
    "eyebrow": "珠记 / 帮助与反馈",
    "sections": [
      {
        "id": "start",
        "label": "快速开始"
      },
      {
        "id": "ledger",
        "label": "账本与数据管理"
      },
      {
        "id": "faq",
        "label": "常见问题"
      },
      {
        "id": "report",
        "label": "反馈问题"
      },
      {
        "id": "contact",
        "label": "联系开发者"
      }
    ]
  },
  "terms": {
    "title": "使用条款与说明",
    "lead": "本页说明当前珠记应用的功能与使用范围。具体下载版本、兼容设备和购买信息，以对应应用商店的展示为准。",
    "eyebrow": "珠记 / 使用说明",
    "sections": [
      {
        "id": "abacus",
        "label": "算盘、演算与练习"
      },
      {
        "id": "data",
        "label": "记账与数据保存"
      },
      {
        "id": "preview",
        "label": "网页互动预览"
      },
      {
        "id": "download-info",
        "label": "下载与购买信息"
      },
      {
        "id": "feedback",
        "label": "隐私与反馈"
      }
    ]
  }
} satisfies Record<string, DocumentPage>;
