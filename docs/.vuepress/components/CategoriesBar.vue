<!--
 *  * @Description: CategoriesBar
 * @Autor: WJYGRIT
 * @Date: 2022/5/11 6:11 下午
-->

<template>
  <div class="categories-wrapper card-box">
    <router-link
      to="/categories/"
      class="title iconfont icon-floder"
      title="全部分类"
    >
      {{ length === "all" ? "全部分类" : "文章分类" }}
    </router-link>

    <div class="categories">
      <router-link
        :to="`/categories/?category=${encodeURIComponent(item.key)}`"
        v-for="(item, index) in categories"
        :key="index"
        :class="{ active: item.key === category }"
      >
        {{ item.key }}
        <span>{{ item.length }}</span>
      </router-link>

      <router-link
        to="/categories/"
        v-if="(length !== 'all' && length < categoriesData, length)"
        class="mre"
      >
        更多...
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: "",
    },
    categoriesData: {
      type: Array,
      default: [],
    },
    length: {
      type: [String, Number],
      default: "all",
    },
  },
  computed: {
    categories() {
      if (this.length === "all") {
        return this.categoriesData;
      } else {
        return this.categoriesData.slice(0, this.length);
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.categories-wrapper
  padding .3rem
  margin-top 1rem
  .title
    color var(--textColor)
    opacity 0.9
    font-size 1.2rem
    padding 0 0.95rem
    &::before
      margin-right 0.3rem
  .categories
    margin-top 0.6rem
    a
      display block
      padding 8px 0.95rem 7px 0.95rem
      color var(--textColor)
      opacity 0.8
      font-size 0.95rem
      line-height 0.95rem
      position relative
      transition all 0.2s
      border-left 2px solid transparent
      margin-top -1px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      @media (max-width $MQMobile)
        font-weight 400
      &:not(.active):hover
        color #e63affeb
        background #f8f8f8
        border-color #e63affeb
        span
          opacity 0.8
      span
        float right
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)
        color #555
        border-radius 50%
        width 1rem
        height 1rem
        line-height 1rem
        font-size 0.6rem
        text-align center
        opacity 0.6
        transition opacity 0.3s
      &.active
        background $accentColor
        color var(--mainBg)
        padding-left 0.8rem
        border-radius 1px
        border-color transparent
</style>
