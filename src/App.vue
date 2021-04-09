<template>
  <HeaderComponent></HeaderComponent>
  <LatestNews></LatestNews>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import LatestNews from './components/LatestNews.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    LatestNews
  }
}
</script>

<style>
@import './assets/css/styles.css';
</style>
