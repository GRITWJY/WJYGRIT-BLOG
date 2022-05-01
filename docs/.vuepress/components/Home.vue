<template>
  <div class="home-wrapper">
    <!-- 这里我通过对bannerBgStyle 进行定时器切换，每5s一次，同时判断此部分是否在可视区域内，只有在可视区域内才开始计时 -->
    <div
      class="banner"
      :style="bannerBgStyle"
    >
      <!-- 每一个图片下的文字内容，这里本来是放原来的内容的，这里
       就根据我的需要进行修改了
       -->
      <div
        class="banner-content"
      >
        <!-- 文字内容: 只包括标题和段落-->
        <div class="hero">
          <transition name="fade">
            <p class="description" v-show="bannerBgText">
              {{ bannerBgText }}
            </p>
          </transition>
        </div>

        <!-- feature块就不需要先 -->

      </div>

    </div>




  </div>
</template>

<script>


export default {
  data() {
    return {
      bannerBgStyle: "",
      bannerBgIndex: 0,
      bannerBgTimer: null,
      bannerBgText: ""
    }
  },
  created() {
    // console.log(this.$page.frontmatter)
    this.bannerBgStyle = `background: url(${this.$withBase(this.homeData.banner[this.bannerBgIndex].img)}) center center / cover no-repeat`
    this.bannerBgText = this.homeData.banner[this.bannerBgIndex].txt
    let num = 0
    this.timer = setInterval(() => {
      num++;
      this.bannerBgIndex++
      this.bannerBgIndex = this.bannerBgIndex > this.homeData.banner.length ? 0 : this.bannerBgIndex
      this.bannerBgText = this.homeData.banner[this.bannerBgIndex].txt
      this.bannerBgStyle = `background: url(${this.$withBase(this.homeData.banner[this.bannerBgIndex].img)}) center center / cover no-repeat`
    }, 8000)
  },
  mounted() {
    this.generateStars()
  },
  destoryed() {
    clearInterval(this.timer)
  },
  methods: {

    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    generateStars() {
      let banner = document.getElementsByClassName('banner')[0]
      let bannerW = banner.clientWidth
      console.log(bannerW)
      let bannerH = banner.clientHeight
      let colorrange = [0, 60, 240];
      let fragment = document.createDocumentFragment();
      window.requestAnimationFrame(() => {
        for (let i = 0; i < 60; i++) {
          let div = document.createElement('div')
          let x = parseInt(Math.random() * bannerW);
          let y = parseInt(Math.random() * bannerH);
          let hue = colorrange[this.getRandom(0, colorrange.length - 1)];
          let radius = Math.random() * 3
          let sat = this.getRandom(50, 100)
          div.className = "stars"
          div.style.left = x + 'px'
          div.style.top = y + 'px'
          div.style.zIndex = "0"
          div.style.width = radius + 'px'
          div.style.height = radius + 'px'
          div.style.borderRadius = radius + 'px'
          div.style.animationDelay = radius + 's'
          div.style.backgroundColor = "hsl(" + hue + ", " + sat + "%, 88%)";
          div.style.boxShadow = '0px 0px 10px 3px ' + "hsl(" + hue + ", " + sat + "%, 88%)";
          var scale = Math.random() * 1.5;
          div.style.transform = 'scale(' + scale + ', ' + scale + ')';
          fragment.appendChild(div);
        }
        banner.appendChild(fragment)
      })
    }
  },
  computed: {
    homeData() {
      return {
        ...this.$page.frontmatter
      }
    },
  }
}
</script>

<style lang="stylus">
.banner
  /*transition: property duration timing-function delay;*/
  transition: all 3s ease;
  height: calc(100vh - 160px);
  position: absolute;
  color $bannerTextColor
  margin-top $navbarHeight
  width: 100%

  .stars
    position: absolute;
    animation: flash 4s infinite;

  .banner-content
    max-width $homePageWidth
    margin 0px auto
    position relative
    z-index 1
    overflow hidden

    .hero
      text-align center
      margin-top 6rem

      .description
        max-width 60rem
        font-size 2rem
        line-height 6rem
        margin 0 auto
        font-family wjy3 !important
        font-weight bold
        opacity 0.9
        transition: all 3s ease;


@media (max-width: 1025px)
  .banner
    height calc(100vh - 300px)

    .banner-content
      .hero
        .description
          font-size 1.5rem

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
