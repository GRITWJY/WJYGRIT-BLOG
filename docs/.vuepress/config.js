const dayjs = require("dayjs");
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
    "@vuepress/search": {
      searchMaxSuggestions: 10,
    },
    "one-click-copy": {
      copySelector: [
        'div[class*="language-"] pre',
        'div[class*="aside-code"] aside',
      ], // String or Array
      copyMessage: "复制成功", // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false, // whether to display on the mobile side, default: false.
    },
    "@vuepress/demo-block": {
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false, // 是否展示为横向样式
      },
    },
    "@vuepress/last-update": {
      transformer: (timestamp, lang) => {
        return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
      },
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
        name: "WJYGRIT",
        link: "https://github.com/GRITWJY",
      },
    },
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
    author: {
      name: "WJYGRIT", // 必需
      link: "https://github.com/GRITWJY", // 可选的
    },
    blogger: {
      avatar: "https://wjygrit.oss-cn-beijing.aliyuncs.com/wjy.jpeg",
      name: "WJYGRIT",
      slogan: "专研前端技术的小白",
    },
    social: {
      iconfontCssFile: "//at.alicdn.com/t/font_3393912_2otw5nsb5ru.css",
    },
  },
  // 监听文件变化并重新构建
  extraWatchFiles: [".vuepress/config.ts", ".vuepress/config/htmlModules.ts"],
  markdown: {
    lineNumbers: true,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },
};
