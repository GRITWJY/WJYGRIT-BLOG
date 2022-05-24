<!--
 *  * @Description: TagsPage
 * @Autor: WJYGRIT
 * @Date: 2022/5/12 2:54 下午
-->

<template>
  <div class="custom-page tags-page">
    <MainLayout>
      <template #mainLeft>
        <TagsArticleList :curtag="tag" />
      </template>

      <template #mainRight>
        <TagsBar :tagsData="$categoriesAndTags.tags" :length="30" :tag="tag" />
      </template>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from "@theme/components/MainLayout";
import TagsBar from "@theme/components/TagsBar";
import TagsArticleList from "@theme/components/TagsArticleList";
export default {
  components: { TagsArticleList, TagsBar, MainLayout },
  data() {
    return {
      tag: "",
    };
  },
  mounted() {
    const queryTag = this.$route.query.tag;
    if (queryTag) {
      this.tag = queryTag;
    }
  },
  watch: {
    "$route.query.tag"(tag) {
      this.tag = tag ? decodeURIComponent(tag) : "";
    },
  },
};
</script>

<style scoped></style>
