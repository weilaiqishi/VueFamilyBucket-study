<template>
    <div class="div">
        <virtualTable class="component"></virtualTable>
    </div>
</template>

<script>
import virtualTable from '@/components/virtualTable/AppVirtualTable.vue'

export default {
    components: {
        virtualTable
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
