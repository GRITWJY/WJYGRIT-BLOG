<template>
  <div class="footer">
    <div class="icons" v-if="social && social.icons">
      <a
        :href="item.link"
        :title="item.title"
        :class="['iconfont', item.iconClass]"
        v-for="(item, index) in social.icons"
        :key="index"
        target="_blank"
      ></a>
    </div>

    Theme by
    <a
      href="https://github.com/xugaoyi/vuepress-theme-vdoing"
      target="_blank"
      title="本站主题"
      >Vdoing</a
    >
    <template v-if="footer">
      | Copyright © {{ footer.createYear }}-{{ new Date().getFullYear() }}
      <span v-html="footer.copyrightInfo"></span>
    </template>

    <a href="https://beian.miit.gov.cn/" target="_blank"
      >鄂ICP备2022008939号-1</a
    >
    <div class="police-box">
      <img
        src="https://wjygrit.oss-cn-beijing.aliyuncs.com/2021/police.png"
        alt="备案编号图标"
      />
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42900402000379"
        style="
          display: inline-block;
          text-decoration: none;
          height: 20px;
          line-height: 20px;
        "
        ><img src="" style="float: left" />
        <p
          style="
            float: left;
            height: 20px;
            line-height: 20px;
            margin: 0px 0px 0px 5px;
            color: #939393;
          "
        >
          鄂公网安备 42900402000379号
        </p></a
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    social() {
      return this.$themeConfig.social;
    },
    footer() {
      return this.$themeConfig.footer;
    },
  },
};
</script>

<style lang="stylus">
// $mobileSidebarWidth = $sidebarWidth * 0.82
.footer
  padding 5rem 1.5rem 2.5rem
  text-align center
  color #666
  box-sizing border-box
  font-size 0.85rem
  transition all 0.2s ease
  > span
    line-height 1.5rem
  .icons
    margin-bottom 12px
    .iconfont
      padding 0 10px
      font-size 1.3rem
  a
    color inherit
    &:hover
      color $accentColor
@media (min-width ($MQMobile + 1px))
  .sidebar-open .footer
    width auto
    padding-left: ($sidebarWidth + 1.5rem)
@media (min-width 1520px)
  .have-rightmenu .footer
    padding-right: ($rightMenuWidth + 1.5rem)
.no-sidebar .footer
  width auto
  padding-left 1.5rem



.police-box
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: 0 auto;
  padding: 20px 0;
</style>
