<template>
    <div class="div">
        <h1>LAYOUT</h1>
        <h1>{{ $router.currentRoute.path.split("/").pop() }}</h1>
        <div class="view">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
    .div {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .view {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0;
        position: relative;
    }
</style>
