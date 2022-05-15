module.exports = {
  "/guide/": [""],
  "/computed/": [
    {
      title: "操作系统",
      children: ["operatingSystem/foundation.md"],
    },
    {
      title: "Linux",
      children: ["Linux/linux.md"],
    },
    {
      title: "数据库",
      children: ["database/dbs.md"],
    },
    {
      title: "浏览器",
      children: [
        "browser/GarbageCollectionAndMemoryLeakage.md",
        "browser/cors.md",
        "browser/RenderEvents.md",
        "browser/cache.md",
        "browser/principle.md",
      ],
    },
    {
      title: "网络",
      children: [
        "net/ProcessThread.md",
        "net/TCP.md",
        "net/https.md",
        "net/foundation.md",
      ],
    },
  ],
  "/Lag/": [
    {
      title: "HTML基础",
      children: ["html/SecurityAttack.md", "html/foundation.md"],
    },
    {
      title: "CSS基础",
      children: ["css/css.md", "css/flex.md"],
    },
    {
      title: "JSVue基础",
      children: ["jsvue/js.md", "jsvue/foundation.md", "jsvue/vue.md"],
    },
  ],
  "/deploy/": [
    {
      title: "部署",
      children: ["AutomatedDeployment.md", "LinuxDeployment.md", "CICD1.md"],
    },
  ],
  "/front/": [
    {
      title: "前端技巧",
      children: [
        "skill/array.md",
        "skill/VirtualList.md",
        "skill/JS-SKILL.md",
        "skill/onlyone.md",
        "skill/oop.md",
        "skill/split.md",
        "skill/promise.md",
        "skill/stream.md",
        "skill/callback.md",
        "skill/vue-instruct.md",
        "skill/vueModifier.md",
        "skill/axios.md",
        "skill/vueError.md",
        "skill/changetab.md",
      ],
    },
    {
      title: "组件开发",
      children: [
        "components/provide-inject-dispatch-broadcast.md",
        "components/findComponents.md",
      ],
    },
    {
      title: "前端监控",
      children: ["monitor/frontmonitor.md"],
    },
    {
      title: "前端优化",
      children: [
        "optimization/devtool.md",
        "optimization/config.md",
        "optimization/mysql.md",
        "optimization/all.md",
      ],
    },
    {
      title: "源码",
      children: [
        "source/vue/01.vue数据响应式.md",
        "source/vue/vue-2-render.md",
        "source/vue/vue-3-data-reactive.md",
        "source/vue/vue-3-data-reactive-2.md",
        "source/vue/vue-3-data-reactive-simplify.md",
        "source/vue/vue-4-pubsub.md",
        "source/vueRouter-0-install.md",
        "source/vueRouter-1-build.md",
        "source/vueRouter-2-init.md",
        "source/vueRouter-3-router-view-link.md",
        "source/vueRouter-4-transitionTo.md",
        "source/vueRouter-5-matchmap.md",
        "source/vueRouter-6-nestCom.md",
        "source/vueRouter-7-dynamicRouting.md",
        "source/vueRouter-8-replace-go-push.md",
      ],
    },
    {
      title: "Android",
      children: [],
    },
    {
      title: "IOS",
      children: [],
    },
  ],
  "/back/": [
    {
      title: "后端内容",
      children: ["ReplayAttack.md", "JWT.md", "Login.md", "secret.md"],
    },
  ],
  "/algorithm/": [
    {
      title: "链表",
      children: ["Link/link.md"],
    },
    {
      title: "二分查找",
      children: [],
    },
    {
      title: "二叉树",
      children: [],
    },
    {
      title: "堆、栈、队列",
      children: [],
    },
    {
      title: "哈希",
      children: [],
    },
    {
      title: "递归、回溯",
      children: [],
    },
    {
      title: "动态规划",
      children: ["DP/longestCommonSubsequence", "DP/KMP"],
    },
    {
      title: "双指针",
      children: [],
    },
  ],
};
