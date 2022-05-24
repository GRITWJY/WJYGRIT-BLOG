import Vue from "vue";
import postsMixin from "./mixins/posts";

import CodeBlock from "@theme/global-components/CodeBlock.vue";
import CodeGroup from "@theme/global-components/CodeGroup.vue";
// import vueCanvasNest from "vue-canvas-nest";

// Register the Vue global component
Vue.component(CodeBlock);
Vue.component(CodeGroup);

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {
  // 将对文章数据的处理结果混入Vue实例
  Vue.mixin(postsMixin);
  // Vue.component(vueCanvasNest);
};
