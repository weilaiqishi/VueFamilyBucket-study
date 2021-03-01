<template>
    <div id="app">
        <div id="nav">
            <AppMenu></AppMenu>
        </div>
        <div id="body">
            <router-view class="view" />
        </div>
    </div>
</template>

<script>
import AppMenu from '@/components/menu/AppMenu.vue'

export default {
    components: {
        AppMenu
    }
}
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #nav {
        padding: 10px;
    }

    #body {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0;
        position: relative;
    }

    .view {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    html,
    body {
        margin: 0;
    }
</style>
