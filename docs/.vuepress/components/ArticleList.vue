<!--
 *  * @Description: ArticleList
 * @Autor: WJYGRIT
 * @Date: 2022/5/9 9:22 上午
-->

<template>
  <div style="height: 400px">
    <!--  一级目录展示框  -->
    <div class="flex flex-wrap">
      <div
        v-for="(val, key, index) in categories"
        :class="[
          'category1-btn',
          curLevel1 === categories[key] ? 'selected' : '',
        ]"
        @click="curLevel1 = categories[key]"
      >
        {{ key }}
      </div>
    </div>

    <div class="card-box">
      <div class="category2">
        <div
          class="category2-indicator"
          :style="{ left: indicatorLeft + 'px' }"
        ></div>
        <div
          v-for="(val, key, index) in curLevel1"
          :class="[
            'category2-item',
            curLevel2 === curLevel1[key] ? 'selected' : '',
          ]"
          @click="changeLevel2($event, curLevel1[key])"
        >
          {{ key }}
        </div>
      </div>
      <div class="articles">
        <template v-if="Array.isArray(childs)">
          <div class="articles-item" v-for="(item, i) in childs" :key="i">
            <span class="articles-item-title"> {{ item.title }} </span>

            <div class="articles-item-tags">
              <i class="el-icon-price-tag"></i>
              {{ item.tags }}
            </div>
            <div class="articles-item-date">
              <i class="el-icon-date"></i>
              {{ item.date }}
            </div>
            <div class="articles-item-view">
              <i class="el-icon-view"></i>
              {{ item.views }}
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="(child, key, index) in childs" class="articles-box">
            <div class="articles-box-head">{{ key }}</div>
            <div class="articles-item" v-for="(item, i) in child" :key="i">
              <span class="articles-item-title"> {{ item.title }} </span>
              <div class="articles-item-tags">
                <i class="el-icon-price-tag"></i>
                {{ item.tags }}
              </div>
              <div class="articles-item-date">
                <i class="el-icon-date"></i>
                {{ item.date }}
              </div>
              <div class="articles-item-view">
                <i class="el-icon-view"></i>
                {{ item.views }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curLevel1: null,
      categories: null,
      curLevel2: "",
      indicatorLeft: "",
      childs: [],
    };
  },
  created() {
    this.categories = this.$groupPosts.categories;
    this.curLevel1 = this.categories[Object.keys(this.categories)[0]];
    this.$nextTick(() => {
      this.getIndicatorLeft();
    });
  },

  watch: {
    curLevel1() {
      this.curLevel2 = this.curLevel1[Object.keys(this.curLevel1)[0]];
      this.$nextTick(() => {
        this.getIndicatorLeft();
      });
    },
    curLevel2() {
      if (this.curLevel2.children === undefined) {
        this.childs = {};
        Object.keys(this.curLevel2).forEach((key) => {
          this.childs[key] = this.curLevel2[key].children.map((item) => {
            return {
              title: item.frontmatter.title,
              tags: item.frontmatter.tags.join("、"),
              date: this.$moment(item.frontmatter.date).format(
                "YYYY-MM-DD HH:mm:ss"
              ),
              views: "999",
            };
          });
        });
      } else {
        this.childs = this.curLevel2.children.map((item) => {
          return {
            title: item.frontmatter.title,
            tags: item.frontmatter.tags.join("、"),
            date: this.$moment(item.frontmatter.date).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            views: "999",
          };
        });
      }
    },
  },

  mounted() {},
  methods: {
    getIndicatorLeft(e = document.getElementsByClassName("category2-item")[0]) {
      this.indicatorLeft = e.offsetLeft + e.offsetWidth / 2 - 8;
    },

    changeLevel2(e, data) {
      this.curLevel2 = data;
      this.getIndicatorLeft(e.path[0]);
    },
  },
};
</script>

<style scoped lang="stylus">
.category1-btn
  transition: color .5s ease;
  color #333333
  font-size 14px
  line-height 14px
  padding 0 16px
  border-radius 8px
  display flex
  justify-content center
  align-items center
  cursor pointer
  background-color: #ffffff;
  box-sizing border-box
  height 32px
  min-width: 88px;
  margin-bottom 8px
  margin-right 8px

  &:hover
    color #e63affeb

  &.selected
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)
    color #e63affeb

.category2
  padding 0 20px
  display flex
  box-sizing border-box
  margin-bottom 12px
  position relative
  padding-top 30px
  height 68px
  border-bottom: 1px solid #ddd;

  &-item
    font-size 16px
    line-height 16px
    transition: color .5s ease;
    cursor pointer
    color rgba(153, 153, 153, 1)
    height 16px
    margin-right 30px

    &.selected, &:hover
      color #e63affeb

  &-indicator
    width 16px
    height 4px
    bottom 12px
    position absolute
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)
    border-radius: 2px;
    transition-duration: 150ms;
    transition all 1s

.articles
  padding 0 20px

  &-item
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    padding 10px
    color #333
    font-size 14px
    line-height 14px

    &:hover
      cursor pointer
      background-color #F5F7FA
      border-radius 10px

    &-title
      flex 1
      display inline-block
      white-space nowrap
      width 100%
      overflow hidden
      text-overflow ellipsis
      margin-right 20px

    &-tags
      margin-right 20px

    &-date
      margin-right 20px

    &-view
      font-size 12px
      color #888888

  &-box
    border 1px solid #f8f8f8
    border-radius 10px

    &-head
      padding-left  12px
      display flex
      justify-content space-between
      align-items center
      background-color #F8F8F8
      height 40px
      color #555
      font-size 16px
      line-height 16px
    .articles-item
      padding-left 15px


>>>
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf
  border none

.el-table .cell
  line-height 14px


@media (max-width: $MQMobileNarrow)
  .articles
    padding 0

    &-item-tags
      display none

    &-item-date
      display none
    &-box
      margin 10px
      &-head
        height 30px
        color #BBB
        font-size 15px
</style>
