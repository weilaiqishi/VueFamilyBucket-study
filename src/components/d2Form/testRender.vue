<template>
<div>
    {{num}}
    <el-button @click="$emit('add', num + 1)">+1s</el-button>
</div>
</template>

<script>
export default {
    props: {
        num: {
            default: 0
        }
    }
}
</script>
