<template>
    <a @click="scrollTop" v-show="visible" class="bottom-right">
        <slot></slot>
    </a>
</template>

<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    scrollTop: function () {
      window.scrollTo(0, 0)
    },
    scrollListener: function () {
      this.visible = window.scrollY > 150
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeUnmount: function () {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>
