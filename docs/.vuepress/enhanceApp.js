export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (typeof _hmt !== "undefined") {
      if (to.path) {
        if (to.fullPath.split("#").length === 1) {
          _hmt.push(["_trackPageview", to.fullPath.split("#")[0]]);
        }
      }
    }

    next();
  });
};
