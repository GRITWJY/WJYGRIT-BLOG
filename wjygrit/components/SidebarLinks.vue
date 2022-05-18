<template>
  <ul class="sidbar-links" v-if="items.length">
    <li v-for="(item, i) in items" :key="i">
      <SidebarGroup
        v-if="item.type === 'group'"
        :item="item"
        :open="i === openGroupIndex"
        :collapsable="item.collapsable"
        :depth="depth"
        @toggle="toggleGroup(i)"
      />
      <SidebarLink v-else :sidebarDepth="sidebarDepth" :item="item" />
    </li>
  </ul>
</template>

<script>
import SidebarGroup from "./SidebarGroup";
import SidebarLink from "./SidebarLink";
import { isActive } from "../util";

export default {
  name: "SidebarLinks",
  components: { SidebarLink, SidebarGroup },
  props: ["items", "depth", "sidebarDepth", "initialOpenGroupIndex"],
  data() {
    return {
      // 当前打开的是哪个组，默认为第一个
      openGroupIndex: this.initialOpenGroupIndex || 0,
    };
  },
  created() {
    // 根据当前路由更新当前打开的组
    this.refreshIndex();
  },

  watch: {
    $route() {
      this.refreshIndex();
    },
  },
  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items);
      if (index > -1) {
        this.openGroupIndex = index;
      }
    },

    // 点击组的时候，更新
    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index;
    },
    isActive(page) {
      return isActive(this.$route, page.regularPath);
    },
  },
};

function resolveOpenGroupIndex(route, items) {
  /*
   要匹配的是path

  * [
    {
        "type": "group",
        "title": "前端基础",
        "children": [
            {
                "title": "JS基础及小tip",
                "frontmatter": {
                    "title": "JS基础及小tip",
                    "date": "2022-05-01T09:51:37.000Z",
                    "permalink": "/pages/a61298/",
                    "categories": [
                        "前端",
                        "前端基础"
                    ],
                    "tags": [
                        "JS"
                    ],
                    "author": "WJYGRIT"
                },
                "regularPath": "/01.%E5%89%8D%E7%AB%AF/01.%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/01.JS%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9.html",
                "relativePath": "01.前端/01.前端基础/01.JS基础知识点.md",
                "key": "v-f1979c9c",
                "path": "/pages/a61298/",
                "headers": [
                    {
                        "level": 2,
                        "title": "1、 script元素",
                        "slug": "_1、-script元素"
                    },
                    {
                        "level": 2,
                        "title": "2、use strict是什么意思 ? 使用它区别是什么？",
                        "slug": "_2、use-strict是什么意思-使用它区别是什么"
                    },
                    {
                        "level": 2,
                        "title": "3、 let中要注意的一些事情",
                        "slug": "_3、-let中要注意的一些事情"
                    },
                    {
                        "level": 2,
                        "title": "4、 数据类型",
                        "slug": "_4、-数据类型"
                    },
                    {
                        "level": 2,
                        "title": "5、 操作符",
                        "slug": "_5、-操作符"
                    },
                    {
                        "level": 2,
                        "title": "6、 with语句",
                        "slug": "_6、-with语句"
                    },
                    {
                        "level": 2,
                        "title": "7、垃圾回收",
                        "slug": "_7、垃圾回收"
                    },
                    {
                        "level": 3,
                        "title": "标记清理",
                        "slug": "标记清理"
                    },
                    {
                        "level": 3,
                        "title": "引用计数",
                        "slug": "引用计数"
                    }
                ],
                "lastUpdated": "5/1/2022, 11:25:54 AM",
                "type": "page"
            }
        ],
        "collapsable": true
    },
]
  * */
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // 用一个新函数去判断
    if (descendantIsActive(route, item)) {
      return i;
    }
  }
  return -1;
}

function descendantIsActive(route, item) {
  if (item.type === "group") {
    // 如果是分了组的，就遍历子数组
    // 我们不需要对没有分组的进行遍历，因为我们只想找到当前打开的是哪一组
    return item.children.some((child) => {
      if (child.type === "group") {
        return descendantIsActive(route, child);
      } else {
        // 还要判断子节点的类型是不是页面，以及用isActive方法判断是不是当前的
        return child.type === "page" && isActive(route, child.path);
      }
    });
  }

  return false;
}
</script>

<style scoped></style>
