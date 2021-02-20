<template>
    <div class="div">
        <VirtualList
            :listData="data"
            :estimatedItemSize="100"
            v-slot="slotProps"
        >
            <Item :item="slotProps.item" />
        </VirtualList>
    </div>
</template>

<script>
import faker from 'faker'
import VirtualList from './BaseVirtualListDynamic.vue'
import Item from './Item'

const data = []
for (let id = 0; id < 1000; id++) {
    data.push({
        id,
        value: faker.lorem.sentences() // 长文本
    })
}

export default {
    name: 'app',
    data () {
        return {
            data
        }
    },
    components: {
        VirtualList,
        Item
    }
}
</script>

<style scoped>
.div {
    height: 100%;
    box-sizing: border-box;
}
</style>
