<!--
 *  * @Description: CtegoriesPage
 * @Autor: WJYGRIT
 * @Date: 2022/5/12 11:43 上午
-->

<template>
  <div class="custom-page categories-page">
    <MainLayout>
      <template #mainLeft>
        <ArticleList :category="category" />
      </template>
      <template #mainRight>
        <CategoriesBar
          :categories-data="$categoriesAndTags.categories"
          :category="category"
        />
      </template>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from "@theme/components/MainLayout";
import ArticleList from "@theme/components/ArticleList";
import CategoriesBar from "@theme/components/CategoriesBar";
export default {
  name: "CategoriesPage",
  components: { CategoriesBar, MainLayout, ArticleList },
  data() {
    return {
      category: "",
    };
  },
  mounted() {
    const queryCategory = this.$route.query.category;
    if (queryCategory) {
      this.category = queryCategory;
    }
  },
  watch: {
    "$route.query.category"(category) {
      this.category = category ? decodeURIComponent(category) : "";
    },
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="stylus"></style>
