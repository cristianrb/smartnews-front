<template>
  <HeaderComponent></HeaderComponent>
  <NewsList></NewsList>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import NewsList from './components/NewsList.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    NewsList
  }
}
</script>

<style>
@import './assets/css/styles.css';
</style>
