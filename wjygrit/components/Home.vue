<template>
  <div class="home-wrapper">
    <!-- 这里我通过对bannerBgStyle 进行定时器切换，每5s一次，同时判断此部分是否在可视区域内，只有在可视区域内才开始计时 -->
    <div class="banner">
      <div
        class="img"
        :style="{
          background: slide3bg,
          animation: 'slide3 24s infinite',
        }"
      >
        <!-- 每一个图片下的文字内容，这里本来是放原来的内容的，这里
         就根据我的需要进行修改了
         -->
        <div class="banner-content">
          <!-- 文字内容: 只包括标题和段落-->
          <p class="description">
            {{ homeData.banner[2].txt }}
          </p>

          <!-- feature块就不需要先 -->
        </div>
      </div>
      <div
        class="img"
        :style="{
          background: slide2bg,
          animation: 'slide2 24s infinite',
        }"
      >
        <!-- 每一个图片下的文字内容，这里本来是放原来的内容的，这里
         就根据我的需要进行修改了
         -->
        <div class="banner-content">
          <!-- 文字内容: 只包括标题和段落-->
          <p class="description">
            {{ homeData.banner[1].txt }}
          </p>

          <!-- feature块就不需要先 -->
        </div>
      </div>
      <div
        class="img"
        :style="{
          background: slide1bg,
          animation: 'slide1 24s infinite',
        }"
      >
        <!-- 每一个图片下的文字内容，这里本来是放原来的内容的，这里
         就根据我的需要进行修改了
         -->
        <div class="banner-content">
          <!-- 文字内容: 只包括标题和段落-->
          <p class="description">
            {{ homeData.banner[0].txt }}
          </p>

          <!-- feature块就不需要先 -->
        </div>
      </div>
    </div>

    <!--     banner块 e -->
    <main-layout>
      <template #mainLeft>
        <article-list />
      </template>

      <template #mainRight>
        <blogger-bar />
        <CategoriesBar
          :categoriesData="$categoriesAndTags.categories"
          :length="10"
        />
        <TagsBar :tagsData="$categoriesAndTags.tags" :length="30" />
      </template>
    </main-layout>
  </div>
</template>

<script>
import MainLayout from "@theme/components/MainLayout";
import BloggerBar from "@theme/components/BloggerBar";
import ArticleList from "@theme/components/ArticleList";
import CategoriesBar from "@theme/components/CategoriesBar";
import TagsBar from "@theme/components/TagsBar";

export default {
  components: { TagsBar, CategoriesBar, BloggerBar, MainLayout, ArticleList },
  data() {
    return {
      slide1bg: "",
      slide2bg: "",
      slide3bg: "",
    };
  },
  mounted() {
    this.generateStars();
    this.slide1bg = `url(${this.$withBase(
      this.homeData.banner[0].img
    )}) center center / cover no-repeat`;
    this.slide2bg = `url(${this.$withBase(
      this.homeData.banner[1].img
    )}) center center / cover no-repeat`;
    this.slide3bg = `url(${this.$withBase(
      this.homeData.banner[2].img
    )}) center center / cover no-repeat`;
  },
  // mounted() {
  //   // this.generateStars();
  // },
  destoryed() {},

  methods: {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateStars() {
      let banner = document.getElementsByClassName("banner")[0];
      let bannerW = banner.clientWidth;
      let bannerH = banner.clientHeight;
      let colorrange = [0, 60, 240];
      let fragment = document.createDocumentFragment();
      window.requestAnimationFrame(() => {
        for (let i = 0; i < 100; i++) {
          let div = document.createElement("div");
          let x = parseInt(Math.random() * bannerW);
          let y = parseInt(Math.random() * bannerH);
          let hue = colorrange[this.getRandom(0, colorrange.length - 1)];
          let radius = Math.random() * 3;
          let sat = this.getRandom(50, 100);
          div.className = "stars";
          div.style.left = (x / bannerW) * 100 + "%";
          div.style.top = (y / bannerH) * 100 + "%";
          div.style.zIndex = "0";
          div.style.width = radius + "px";
          div.style.height = radius + "px";
          div.style.borderRadius = radius + "px";
          div.style.animationDelay = radius + "s";
          div.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, 88%)";
          div.style.boxShadow =
            "0px 0px 10px 3px " + "hsl(" + hue + ", " + sat + "%, 88%)";
          var scale = Math.random() * 1.5;
          div.style.transform = "scale(" + scale + ", " + scale + ")";
          fragment.appendChild(div);
        }
        banner.appendChild(fragment);
      });
    },
  },
  computed: {
    homeData() {
      return {
        ...this.$page.frontmatter,
      };
    },
  },
};
</script>

<style lang="stylus">
.banner
  /*transition: property duration timing-function delay;*/
  transition: all 3s ease;
  height: calc(100vh - 160px);
  position: relative;
  color $bannerTextColor
  margin-top $navbarHeight
  width: 100%

  .img
    position absolute
    width 100%
    height 100%


  .stars
    position: absolute;
    animation: flash 4s infinite;

  .description
    color #ffffff
    position absolute
    top: 20%;
    width: 40%;
    left: 20%;
    transform: translate(-40%, -50%);
    max-width 60rem
    font-size 2rem
    line-height 2rem
    font-family wjy3 !important
    font-weight bold
    opacity 0.9
    transition: all 3s ease;


@media (max-width: 1025px)
  .banner
    height calc(100vh - 300px)

    .description
      font-size 1.5rem

@keyframes slide3 {
  66%,94% {
    opacity: 1;
  }

  0%,61%,100% {
    opacity: 0;
  }
}

@keyframes slide2 {
  33%,61% {
    opacity: 1;
  }

  0%,27%,66%,100% {
    opacity: 0;
  }
}


@keyframes slide1 {
  0%,27%,100% {
    opacity: 1;
  }

  33%,94% {
    opacity: 0;
  }
}

@keyframes flash {
  0% {
    opacity: 1;
  }

  10% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }

  50% {
    opacity: 0.1;
  }

  75% {
    opacity: 0.5;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}
</style>
