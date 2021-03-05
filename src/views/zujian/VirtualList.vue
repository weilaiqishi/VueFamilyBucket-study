<template>
    <div class="div">
        <virtualList class="component"></virtualList>
        <virtualListDynamic class="component"></virtualListDynamic>
    </div>
</template>

<script>
import virtualList from '@/components/virtualList/AppVirtualList.vue'
import virtualListDynamic from '@/components/virtualList/AppVirtualListDynamic.vue'

export default {
    components: {
        virtualList,
        virtualListDynamic
    }
}
</script>

<style scoped>
    .div {
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    .component {
        flex: 1;
        height: 100%;
    }
</style>
