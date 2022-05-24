<template>
  <nav class="nav-links" v-if="userLinks.length">
    <!-- user links 导航栏 -->
    <div class="nav-item" v-for="item in userLinks" :key="item.link">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>
  </nav>
</template>

<script>
import { resolveNavLinkItem } from "../util";
import NavLink from "@theme/components/NavLink";
import DropdownLink from "@theme/components/DropdownLink";

export default {
  components: {
    NavLink,
    DropdownLink,
  },
  data() {
    return {};
  },

  computed: {
    // 获取到侧边栏
    userNav() {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || [];
    },

    // 获取到所有侧边栏，咱这就一个
    userLinks() {
      /*
      * items: []
        link: "/deploy/"
        text: "部署"
        type: "link"
      * */
      return (this.userNav || []).map((link) => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem),
        });
      });
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="stylus">


@-webkit-keyframes swing/*创建动画*/
  10%
    -webkit-transform rotate(10deg)
  30%
    -webkit-transform rotate(-10deg)
  50%
    -webkit-transform rotate(10deg)
  70%
    -webkit-transform rotate(-10deg)
  90%
    -webkit-transform rotate(10deg)
  100%
    -webkit-transform rotate(0)

.nav-links
  display inline-block

  a
    line-height 1.4rem
    color inherit
    transition all 0.5s

    &:hover, &.router-link-active
      color #6f86d6

    &:focus
      -webkit-animation swing 2s


  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height: 2rem;
    color #242424

    &:first-child
      margin-left 0


// 959:平板
@media (max-width $MQNarrow)
  .nav-links
    .nav-item
      margin-left 1.2rem

@media (max-width $MQMobile)
  .nav-links
    .nav-item
      margin-left 0
</style>
