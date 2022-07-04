<!--
 *  * @Description: ArticleList
 * @Autor: WJYGRIT
 * @Date: 2022/5/9 9:22 上午
-->

<template>
  <div class="articles-wrapper">
    <!--  一级目录展示框  -->
    <div class="flex flex-wrap">
      <div
        v-for="(val, key, index) in categories"
        :class="['category1-btn', level1 === key ? 'selected' : '']"
        @click="changeLevel1(key)"
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
          v-for="(val, key, index) in categories[level1]"
          :class="['category2-item', level2 === key ? 'selected' : '']"
          @click="changeLevel2(key)"
        >
          {{ key }}
        </div>
      </div>
      <div class="articles">
        <template v-if="Array.isArray(childs)">
          <div v-for="(item, i) in childs">
            <router-link :to="item.path" class="articles-item" :key="i">
              <span class="articles-item-nums">
                {{ childs.length - i }}
              </span>
              <span class="articles-item-title"> {{ item.title }} </span>
              <div
                class="articles-item-tags"
                v-for="(tag, i) in item.tags"
                :key="i"
              >
                <span>{{ tag }}</span>
              </div>
              <div class="articles-item-date">
                <i class="iconfont icon-riqi"></i>
                {{ item.date }}
              </div>
              <div class="articles-item-view">
                <i class="iconfont icon-yanjing"></i>
                {{ item.views }}
              </div>
            </router-link>
          </div>
        </template>
        <template v-else>
          <div
            v-for="(child, key, index) in childs"
            class="articles-box"
            style="margin-bottom: 20px"
          >
            <div class="articles-box-head">{{ key }}</div>
            <div v-for="(item, i) in child" :key="i">
              <router-link class="articles-item" :to="item.path">
                <span class="articles-item-nums">{{ i + 1 }}</span>
                <span class="articles-item-title"> {{ item.title }} </span>
                <div
                  class="articles-item-tags"
                  v-for="(tag, i) in item.tags"
                  :key="i"
                >
                  <span>{{ tag }}</span>
                </div>
                <div class="articles-item-date">
                  <i class="iconfont icon-riqi"></i>
                  {{ item.date }}
                </div>
                <div class="articles-item-view">
                  <i class="iconfont icon-yanjing"></i>
                  {{ item.views }}
                </div>
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat, group } from "../util";

export default {
  props: {
    category: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      categories: null,
      level1: "", // 一级目录
      level2: "", // 二级目录
      indicatorLeft: "", // 指示器位置
      childs: [], // 子节点
    };
  },
  created() {
    // 初始化
    this.categories = this.$groupPosts.categories;
    this.level1 = Object.keys(this.categories)[0];
    let curLevel1 = this.categories[this.level1];
    this.level2 = Object.keys(curLevel1)[0];
  },

  watch: {
    category() {
      let datas = this.$categoriesAndTags.categories;
      for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        if (data.key === this.category) {
          let path = data.path.split("/");
          let level1 = path[0];
          let level2 = path.length > 2 ? path[1] : this.category;
          this.changeLevel1(level1, level2);
        }
      }
    },

    // 二级目录改变后，通过文字去改变指示器内容
    level2() {
      let curLevel2 = this.categories[this.level1][this.level2];
      if (curLevel2.children === undefined) {
        this.childs = {};
        Object.keys(curLevel2).forEach((key) => {
          this.childs[key] = curLevel2[key].children.map((item) => {
            return {
              title: item.frontmatter.title,
              tags: item.frontmatter.tags,
              category: item.frontmatter.categories[0],
              date: dateFormat(new Date(item.frontmatter.date)),
              views: "999",
              path: item.path,
            };
          });
        });
      } else {
        this.childs = curLevel2.children.map((item) => {
          return {
            title: item.frontmatter.title,
            tags: item.frontmatter.tags,
            category: item.frontmatter.categories,
            date: dateFormat(new Date(item.frontmatter.date)),
            views: "999",
            path: item.path,
          };
        });
      }

      this.$nextTick(() => {
        this.getIndicator();
      });
    },
  },

  methods: {
    getIndicator() {
      let e =
        document.getElementsByClassName("category2-item")[
          Object.keys(this.categories[this.level1]).indexOf(this.level2)
        ];
      this.indicatorLeft = e.offsetLeft + e.offsetWidth / 2 - 8;
    },

    // 改变二级目录，赋值二级目录
    changeLevel2(level2) {
      this.level2 = level2;
    },

    // 改变一级目录: 赋值一级目录，二级若没传，则直接给默认的
    changeLevel1(level1, level2) {
      this.level1 = level1;
      this.level2 = level2 || Object.keys(this.categories[this.level1])[0];
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
    background-image: $themeBgColor
    color #ffffff

.category2
  overflow-x: auto
  width:100%
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
    flex-shrink 0
    line-height 16px
    transition: color .5s ease;
    cursor pointer
    color rgba(153, 153, 153, 1)
    height 16px
    margin-right 30px

    &.selected, &:hover
      color $accentColor

  &-indicator
    width 16px
    height 4px
    bottom 12px
    position absolute
    background-image: $themeBgColor
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
    color #666
    font-weight 400
    font-size 14px
    line-height 14px
    transition: transform 0.25s ease-in-out 0.24s, opacity 0.25s ease-in-out 0.24s;
    transform: translateY(0px);


    &:hover
      cursor pointer
      background-color #F5F7FA
      border-radius 10px

    &-nums
      margin-right 20px


    &-title
      flex 1
      display inline-block
      white-space nowrap
      width 100%
      overflow hidden
      text-overflow ellipsis
      margin-right 20px

    &-tags
      margin-right 4px
      box-sizing: border-box;
      color #999
      font-size 12px
      line-height 12px
      border-radius 20px
      background #f0f0f0
      display flex
      justify-content center
      align-items center
      width 68px
      height 20px


    &-date
      margin-right 20px
      margin-left 20px
      color: #888;
      font-size: 12px;

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
