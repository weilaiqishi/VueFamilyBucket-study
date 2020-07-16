<template>
  <div id="app">
    <div id="nav">
      <AppMenu></AppMenu>
    </div>
    <router-view />
  </div>
</template>

<script>
import AppMenu from '@/components/menu/AppMenu.vue';

export default {
  components: {
    AppMenu
  }
};
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }
</style>
