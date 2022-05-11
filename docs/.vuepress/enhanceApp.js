import Vue from "vue";
import postsMixin from "./mixins/posts";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {
  Vue.use(Element);
  Vue.prototype.$moment = moment;
  // 将对文章数据的处理结果混入Vue实例
  Vue.mixin(postsMixin);
};
