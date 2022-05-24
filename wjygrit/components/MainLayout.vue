<template>
  <div class="main-wrapper">
    <div class="main-left">
      <slot name="mainLeft" />
    </div>

    <div class="main-right">
      <slot name="mainRight" />
    </div>
  </div>
</template>

<style lang="stylus">
.main-wrapper
  margin 1rem auto
  max-width $homePageWidth
  box-sizing border-box
  position relative
  display flex

  .main-left
    width calc(100% - 270px)
    margin-right 20px

  .main-right
    width 270px
    box-sizing border-box

  .card-box
    padding-bottom 0.95rem



@media (max-width: $MQMobile)
  .main-wrapper
    margin 0.9rem 0.5rem
    display block
    .main-left
      width 100%
    .main-right
      .blogger-wrapper
        display none
      .tags-wrapper
        display none
      .categories-wrapper
        display none
</style>
