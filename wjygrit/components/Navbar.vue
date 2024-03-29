<template>
  <header class="navbar blur">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />
    <router-link :to="$localePath" class="home-link">
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span
      >
    </router-link>

    <div
      class="links"
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': linksWrapMaxWidth + 'px',
            }
          : {}
      "
    >
      <SearchBox />
      <!-- 手机屏幕不显示 -->
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import SidebarButton from "@theme/components/SidebarButton";
import SearchBox from "@SearchBox";
import NavLinks from "@theme/components/NavLinks";

export default {
  components: { SidebarButton, SearchBox, NavLinks },
  data() {
    return {
      linksWrapMaxWidth: null,
    };
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };

    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },
};

function css(el, property) {
  const win = el.ownerDocument.defaultView;
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  transition transform 0.3s

  a, span, img
    display inline-block

  .logo
    height $navbarHeight - 1.1rem
    min-width $navbarHeight - 1.1rem
    border-radius $navbarHeight - 1.1rem
    margin-right 0.8rem
    vertical-align top

  .site-name
    font-size 1.3rem
    font-weight 600
    color #6f86d6
    //color var(--textColor)
    position relative

  .links
    padding-left 1.5rem
    box-sizing border-box
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex

    .search-box
      flex 0 0 auto
      vertical-align top

.hide-navbar
  .navbar
    transform translateY(-100%)

@media (max-width $MQNarrow)
  .navbar
    .site-name
      display none

@media (max-width $MQMobile)
  .navbar
    padding-left 4rem

    .can-hide
      display none

    .links
      padding-left 1.5rem

    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
