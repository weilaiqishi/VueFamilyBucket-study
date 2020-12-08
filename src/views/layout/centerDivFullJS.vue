<template>
    <div class="father" ref="father">
        <div class="header"></div>
        <div class="full" ref="full"></div>
        <div class="footer"></div>
    </div>
</template>

<script>
export default {
    mounted () {
        this.resize()
        window.addEventListener('resize', this.resize)
    },
    methods: {
        resize () {
            this.$refs.full.style.height = `${this.$refs.father.clientHeight - 200}px`
        }
    }
}
</script>

<style scoped>
    .father {
        height: 50%;
        box-sizing: border-box;
    }
    .full {
        background: #dfd3c3;
    }
    .header,
    .footer {
        height: 100px;
        background: #596e79;
    }
</style>
