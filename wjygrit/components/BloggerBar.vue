<template>
  <aside class="blogger-wrapper card-box">
    <div class="avatar">
      <img :src="blogger.avatar" alt="我的头像" />
    </div>

    <div class="blogger">
      <span class="name">{{ blogger.name }}</span>
      <span class="slogan">{{ blogger.slogan }}</span>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    blogger() {
      return this.$themeConfig.blogger;
    },
  },
};
</script>

<style lang="stylus">
.blogger-wrapper
  height auto
  display inline-table
  padding-top 0 !important
  overflow hidden
  background-color #ffffff


  .avatar
    width 100%
    overflow hidden

    img
      width 100%
      height 100%
      border-radius 10px

  .blogger
    padding 10px

    .name
      font-size 1.3rem
      display block
      margin-bottom 6px

    .slogan
      color var(--textColor)
</style>
