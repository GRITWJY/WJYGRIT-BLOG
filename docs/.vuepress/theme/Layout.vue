<template>
  <div class="theme-container" :class="pageClasses">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <Sidebar></Sidebar>

    <Home></Home>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { resolveSidebarItems } from "../util";
import Home from "../components/Home";
import _ from "lodash";

const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
const NAVBAR_HEIGHT = 58; // 导航栏高度
export default {
  components: {
    Navbar,
    Home,
    Sidebar,
  },
  data() {
    return {
      isSidebarOpen: true,
      showSidebar: false,
      hideNavbar: false,
    };
  },
  created() {
    const sidebarOpen = this.$themeConfig.sidebarOpen;
    if (sidebarOpen === false) {
      this.isSidebarOpen = sidebarOpen;
    }
    console.log("created", this.isSidebarOpen);
  },
  beforeMount() {
    // 正常
    this.isSidebarOpenOfclientWidth();

    // 引入图标库
    const social = this.$themeConfig.social;
    if (social && social.iconfontCssFile) {
      let linkElm = document.createElement("link");
      linkElm.setAttribute("rel", "stylesheet");
      linkElm.setAttribute("type", "text/css");
      linkElm.setAttribute("href", social.iconfontCssFile);
      document.head.appendChild(linkElm);
    }
  },
  mounted() {
    this.showSidebar = true;
    this.$router.afterEach(() => {
      this.isSidebarOpenOfclientWidth();
    });

    // 向下滚动收起导航栏
    let p = 0,
      t = 0;
    window.addEventListener(
      "scroll",
      _.throttle(() => {
        console.log("win", this.isSidebarOpen);
        if (!this.isSidebarOpen) {
          // 侧边栏关闭时
          p = this.getScrollTop();
          if (t < p && p > NAVBAR_HEIGHT) {
            // 向下移动
            this.hideNavbar = true;
          } else {
            // 向上
            this.hideNavbar = false;
          }
          setTimeout(() => {
            t = p;
          }, 0);
        }
      }, 300)
    );
  },
  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
          "hide-navbar": this.hideNavbar, // 向下滚动隐藏导航栏
        },
        userPageClass,
      ];
    },
    // 是否显示导航栏，这个是手机上要用遮罩层，所以就要取消掉
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;

      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return this.$title || themeConfig.logo || themeConfig.nav;
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length &&
        frontmatter.showSidebar !== false
      );
    },
  },
  methods: {
    getScrollTop() {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },

    isSidebarOpenOfclientWidth() {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.isSidebarOpen = false;
      }
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
    },
  },
  watch: {
    isSidebarOpen() {
      if (this.isSidebarOpen) {
        // 侧边栏打开时，恢复导航栏显示
        this.hideNavbar = false;
      }
    },
  },
};
</script>

<style lang="stylus">
.custom-html-window
  position fixed
  bottom 0
  display flex
  overflow hidden
  font-weight 350
  @media (max-width 960px)
    display none

  .custom-wrapper
    position relative
    max-width 200px
    max-height 400px

    .close-but
      cursor pointer
      position absolute
      right 0
      top 0
      font-size 1.5rem
      line-height 1.5rem
      width 1.5rem
      height 1.5rem
      opacity 0
      transition all 0.2s

      &:hover
        opacity 0.9

    &:hover
      .close-but
        opacity 0.7

  &.custom-html-window-lb
    left 0
    z-index 99

    & > *
      align-self flex-end

  &.custom-html-window-rb
    right 80px
    z-index 10
    justify-content flex-end

    & > *
      align-self flex-end
</style>
