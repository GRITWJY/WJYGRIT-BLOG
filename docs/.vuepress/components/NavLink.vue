<template>
  <router-link
    class="nav-link"
    :to="link"
    @focusout.native="focusoutAction"
    v-if="!isExternal(link)"
    :exact="exact"
  >{{ item.text }}
  </router-link>

  <!--OutboundLink 用来表明当前是一个外部链接。在 VuePress 中这个组件会紧跟在每一个外部链接后面。-->
  <a
    v-else
    :href="link"
    @focusout="focusoutAction"
    class="nav-link external"
    :target="isMailto(link) || isTel(link) ? null : '_blank'"
    :rel="isMailto(link) || isTel(link) ? null : 'noopener noreferrer'"
  >
    {{ item.text }}
    <OutboundLink/>
  </a>


</template>

<script>
import {ensureExt, isExternal, isMailto, isTel} from "../util";

export default {
  props: {
    item: {
      required: true
    }
  },
  computed: {
    link() {
      return ensureExt(this.item.link)
    },
    exact() {
      return this.link === '/'
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    isExternal,
    isMailto,
    isTel,
    focusoutAction() {
      this.$emit('focusout')
    }
  }
}
</script>
