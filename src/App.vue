<template>
  <HeaderComponent></HeaderComponent>
  <div>
    <router-view :key="$route.path"></router-view>
  </div>
  <ScrollTopArrow></ScrollTopArrow>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import ScrollTopArrow from './components/ScrollTopArrow'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ScrollTopArrow
  }
}
</script>

<style>
@import './assets/css/styles.css';
</style>
