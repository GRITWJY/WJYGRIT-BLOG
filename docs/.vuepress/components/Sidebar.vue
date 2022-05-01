<template>
  <aside class="sidebar">
    <!-- 侧边栏博主介绍 -->
    <div class="blogger" v-if="blogger">
      <img :src="blogger.avatar"/>
      <div class="blogger-info">
        <h3>{{ blogger.name }}</h3>
        <span>{{ blogger.slogan }}</span>
      </div>
    </div>

    <!-- 移动端Nav -->
    <NavLinks/>

  </aside>
</template>

<script>
import NavLinks from "./NavLinks";

export default {
  name: 'Sidebar',
  components: {NavLinks},
  data() {
    return {}
  },
  created() {
  },
  computed: {
    blogger() {
      return this.$themeConfig.blogger
    }
  },
  methods: {}
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none

  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid var(--borderColor)
    padding 0.5rem 0 0.75rem 0

    a
      font-weight 600

    .nav-item
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem

  .blogger
    display none
    border-bottom 1px solid var(--borderColor)

    img
      width 60px
      height 60px
      border-radius 5px
      margin 0.75rem 1rem

    .blogger-info
      flex 1
      padding 0 0.3rem 0.3rem 0

      h3
        margin 0.95rem 0 0.6rem
        font-size 1.1rem


@media (max-width $MQMobile)
  .sidebar
    .blogger
      display flex
    .nav-links
      display block
</style>
