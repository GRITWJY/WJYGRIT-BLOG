<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
      v-show="showSidebar"
    ></Sidebar>

    <Home v-if="$page.frontmatter.home"></Home>
    <CategoriesPage v-else-if="$page.frontmatter.categoriesPage" />
    <TagsPage v-else-if="$page.frontmatter.tagsPage" />
    <!-- 归档页 -->
    <ArchivesPage v-else-if="$page.frontmatter.archivesPage" />

    <Page v-else :sidebar-items="sidebarItems"></Page>

    <Footer />

    <Buttons ref="buttons" @toggle-theme-mode="toggleThemeMode" />
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar";
import Buttons from "@theme/components/Buttons";
import Sidebar from "@theme/components/Sidebar";
import { resolveSidebarItems } from "../util";
import Home from "@theme/components/Home";
import CategoriesPage from "@theme/components/CategoriesPage";
import _ from "lodash";
import TagsPage from "@theme/components/TagsPage";
import Page from "@theme/components/Page";
import Footer from "@theme/components/Footer";
import ArchivesPage from "@theme/components/ArchivesPage";
import storage from "good-storage";

const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
const NAVBAR_HEIGHT = 58; // 导航栏高度
export default {
  components: {
    Footer,
    Page,
    TagsPage,
    Navbar,
    Home,
    Sidebar,
    CategoriesPage,
    ArchivesPage,
    Buttons,
  },
  data() {
    return {
      isSidebarOpen: true,
      showSidebar: false,
      hideNavbar: false,
      themeMode: "light",
    };
  },
  created() {
    const sidebarOpen = this.$themeConfig.sidebarOpen;
    if (sidebarOpen === false) {
      this.isSidebarOpen = sidebarOpen;
    }
  },
  beforeMount() {
    // 正常
    this.isSidebarOpenOfclientWidth();
    const mode = storage.get("mode"); // 不放在created是因为vuepress不能在created访问浏览器api，如window
    if (!mode || mode === "auto") {
      // 当未切换过模式，或模式处于'跟随系统'时
      this._autoMode();
    } else {
      this.themeMode = mode;
    }
    this.setBodyClass();

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
    // 初始化页面时链接锚点无法跳转到指定id的解决方案
    const hash = document.location.hash;
    if (hash.length > 1) {
      const id = decodeURIComponent(hash.substring(1));
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }

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
    showRightMenu() {
      const { headers } = this.$page;
      return (
        !this.$frontmatter.home &&
        this.$themeConfig.rightMenuBar !== false &&
        headers &&
        headers.length &&
        this.$frontmatter.sidebar !== false
      );
    },

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
          "have-rightmenu": this.showRightMenu,
          "have-body-img": this.$themeConfig.bodyBgImg,
          "only-sidebarItem":
            this.sidebarItems.length === 1 &&
            this.sidebarItems[0].type === "page", // 左侧边栏只有一项时
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
    toggleThemeMode(key) {
      if (key === "auto") {
        this._autoMode();
      } else {
        this.themeMode = key;
      }
      storage.set("mode", key);
    },

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
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },
    setBodyClass() {
      document.body.className = "theme-mode-" + this.themeMode;
    },

    _autoMode() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // 系统处于深色模式
        this.themeMode = "dark";
      } else {
        this.themeMode = "light";
      }
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
