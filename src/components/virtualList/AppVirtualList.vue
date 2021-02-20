<template>
    <div class="div">
        <VirtualList :listData="data" :itemSize="100" />
    </div>
</template>

<script>
import VirtualList from './BaseVirtualList.vue'

const d = []
for (let i = 0; i < 1000; i++) {
    d.push({ id: i, value: i })
}

export default {
    data () {
        return {
            data: d
        }
    },
    components: {
        VirtualList
    }
}
</script>

<style scoped>
.div {
    height: 100%;
    box-sizing: border-box;
}
</style>
