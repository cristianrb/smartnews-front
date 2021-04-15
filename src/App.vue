<template>
  <HeaderComponent></HeaderComponent>
  <div>
    <router-view :key="$route.path"></router-view>
  </div>

</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
//import LatestNews from './components/LatestNews.vue'
//import NewsDetail from './components/NewsDetail.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    //LatestNews,
    //NewsDetail
  }
}
</script>

<style>
@import './assets/css/styles.css';
</style>
