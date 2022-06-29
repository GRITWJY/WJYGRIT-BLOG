const dayjs = require("dayjs");
const { path } = require("@vuepress/utils");

module.exports = {
  theme: require.resolve("../../wjygrit"),
  title: "WJYGRIT的博客",
  description:
    "每当你被漫天乌云压的喘不过气时，往往是一切问题解决的时候。而当你感觉晴空万里时，其实并没有你想得那样好",
  base: "/",
  port: "8888",
  dest: "./dist",
  plugins: [
    [
      "@vuepress/medium-zoom",
      {
        selector: ".theme-wjygrit-content :not(.custom) > img",
        options: {
          margin: 16,
        },
      },
    ],
    [
      "one-click-copy",
      {
        copySelector: [
          'div[class*="language-"] pre',
          'div[class*="aside-code"] aside',
        ], // String or Array
        copyMessage: "复制成功", // default is 'Copy successfully and then paste it for use.'
        duration: 1000, // prompt message display time.
        showInMobile: false, // whether to display on the mobile side, default: false.
      },
    ],
    [
      "@vuepress/demo-block",
      {
        settings: {
          // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
          // cssLib: ['http://xxx'], // 在线示例中的css依赖
          // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
          jsfiddle: false, // 是否显示 jsfiddle 链接
          codepen: true, // 是否显示 codepen 链接
          horizontal: false, // 是否展示为横向样式
        },
      },
    ],
    [
      "@vuepress/last-update",
      {
        transformer: (timestamp) => {
          return dayjs(timestamp).format("YYYY/MM/DD, HH:mm:ss");
        },
      },
    ],
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        audios: [
          {
            name: "千与千寻",
            artist: "昼夜",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/1.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/1.webp",
          },
          {
            name: "巨蟹座",
            artist: "尤起胜",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/2.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/2.webp",
          },
          {
            name: "星河万里",
            artist: "艾希",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/3.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/3.webp",
          },
          {
            name: "散",
            artist: "胡丝茹Through",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/4.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/4.webp",
          },
          {
            name: "天空之城",
            artist: "Audio Magician",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/5.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/5.webp",
          },
          {
            name: "Big Big World",
            artist: "Emilia Rydberg",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/6.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/6.webp",
          },
          {
            name: "钢琴",
            artist: "Cheetah Mobile",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/7.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/7.webp",
          },
          {
            name: "星河万里",
            artist: "欣蒂",
            url: "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/8.mp3",
            cover:
              "https://wjygrit.oss-cn-beijing.aliyuncs.com/music/QQ%E9%9F%B3%E4%B9%90/8.webp",
          },
        ],
        autoplay: false,
      },
    ],
    [
      "dline",
      {
        zIndex: -50, // 背景层级
        opacity: 0.9, // 背景透明度
        color: "#666", // 线条颜色 16进制
        count: 66, // 线条密度
      },
    ],
    ["tabs"],
  ],
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    [
      "script",
      {},
      `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?86a1230b61635a1596165ee216c1097d";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
        </script>`,
    ],
  ],
  themeConfig: {
    logo: "https://wjygrit.oss-cn-beijing.aliyuncs.com/2021/wjy.jpeg",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",
        link: "/web/",
        items: [
          { text: "前端基础概念", link: "/pages/fawgwrgker/" },
          { text: "前端技巧", link: "/pages/a61298/" },
          { text: "性能优化", link: "/pages/OEKNDE/" },
          { text: "CSS集合", link: "/pages/WKWEKD/" },
          {
            text: "源码系列",
            items: [
              { text: "vue源码解析", link: "/source/vue/" },
              { text: "lodash源码解析", link: "/source/lodash/" },
              { text: "jQuery源码解析", link: "/source/jquery/" },
              { text: "d3源码解析", link: "/source/d3/" },
              { text: "vue-cli源码解析", link: "/source/vuecli/" },
            ],
          },
        ],
      },
      {
        text: "计算机",
        link: "/computed/",
        items: [
          { text: "计算机网络", link: "/pages/aFADFAFA61298/" },
          { text: "算法", link: "/pages/KEMAWL/" },
        ],
      },
      {
        text: "更多",
        link: "/more/",
        items: [{ text: "思绪整理", link: "/pages/thinking0618/" }],
      },
      {
        text: "索引",
        link: "/archives/",
        items: [
          { text: "分类", link: "/categories/" },
          { text: "标签", link: "/tags/" },
          { text: "归档", link: "/archives/" },
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
    lastUpdated: "上次更新",
    searchMaxSuggestoins: 10,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容",
        buttonText: "更新",
      },
    },
    footer: {
      createYear: 2022, // 博客创建年份
      copyrightInfo:
        'WJYGRIT | <a href="https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版权信息，支持a标签或换行标签</br>
    },
    editLinks: true,
    editLinkText: "在github上编辑此页！",
    author: {
      name: "WJYGRIT", // 必需
      link: "https://github.com/GRITWJY", // 可选的
    },
    blogger: {
      avatar: "https://wjygrit.oss-cn-beijing.aliyuncs.com/2021/wjy.jpeg",
      name: "WJYGRIT",
      slogan: "专研前端技术的小白",
    },
    social: {
      iconfontCssFile: "//at.alicdn.com/t/font_3393912_pq97fl21b6.css",
      icons: [
        {
          iconClass: "icon-youjian",
          title: "发邮件",
          link: "mailto:1435408225@qq.com",
        },
        {
          iconClass: "icon-github",
          title: "GitHub",
          link: "https://github.com/GRITWJY",
        },
        {
          iconClass: "icon-erji",
          title: "听音乐",
          link: "https://y.qq.com/n/ryqq/playlist/8486647157",
        },
      ],
    },
  },
  // 监听文件变化并重新构建
  extraWatchFiles: [".vuepress/config.js"],
  markdown: {
    lineNumbers: false,
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },
};
