module.exports = {
  title: "WJYGRIT的笔记",
  description:
    "每当你被漫天乌云压的喘不过气时，往往是一切问题解决的时候。而当你感觉晴空万里时，其实并没有你想得那样好",
  dest: "./dist",
  plugins: {
    "@vuepress/medium-zoom": {
      selector: "img",
      options: {
        margin: 36,
      },
    },
    "vuepress-plugin-code-copy": true,
    "@vuepress/search": {
      searchMaxSuggestions: 10,
    },
  },
  base: "/",
  port: "8888",
  head: [["link", { rel: "icon", href: "/wjy.jpeg" }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: "/wjy.jpeg",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",
        link: "/web/",
        items: [
          { text: "前端基础", link: "/pages/a61298/" },
          { text: "前端技巧", link: "/pages/8143cc480faf9a11/" },
          {
            text: "源码系列",
            items: [{ text: "vue源码解析", link: "/source/vue/" }],
          },
        ],
      },
    ],
    sidebar: require("./sidebar.js"), // 侧栏
    lastUpdated: "Last Updated",
    searchMaxSuggestoins: 10,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容",
        buttonText: "更新",
      },
    },

    editLinks: true,
    editLinkText: "在github上编辑此页！",
    blogger: {
      avatar: "https://wjygrit.oss-cn-beijing.aliyuncs.com/wjy.jpeg",
      name: "WJYGRIT",
      slogan: "专研前端技术",
    },
  },
};
