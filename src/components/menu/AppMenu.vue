<template>
  <BaseMenu :active="'1'" :handleMenuSelect="menu.menuOption.select" :menuData="menu.menuData"></BaseMenu>
</template>
<script>
import BaseMenu from './BaseMenu.vue';
import menuData from './MenuData';

export default {
  components: {
    BaseMenu
  },
  data () {
    return {
      menu: {
        menuOption: {
          select: (key, keyPath) => {
            console.log(key, keyPath);
          },
          active: '1'
        },
        menuData
      }
    };
  }
};
</script>
