const path = require("path");
module.exports = {
  theme: path.resolve(__dirname, "../../wjygrit"),
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
      {
        text: "计算机",
        link: "/computed/",
        items: [{ text: "计算机网络", link: "/pages/aFADFAFA61298/" }],
      },
      {
        text: "索引",
        link: "/archives/",
        items: [
          { text: "分类", link: "/categories/" },
          { text: "标签", link: "/tags/" },
        ],
      },
    ],
    // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    extendFrontmatter: {
      author: {
        name: "wjygrit",
        link: "https://github.com/gritwjy",
      },
    },
    sidebarOpen: false,
    // sidebar: require("./sidebar.js"), // 侧栏
    sidebar: "structuring",
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
      slogan: "专研前端技术的小白",
    },
    social: {
      iconfontCssFile: "//at.alicdn.com/t/font_3393912_vd43efx1yzo.css",
    },
  },
};
