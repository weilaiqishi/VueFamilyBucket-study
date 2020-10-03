<template>
    <div class="father">
        <div class="header"></div>
        <div class="full"></div>
        <div class="footer"></div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
    .father {
        height: 50%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    .full {
        flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0;
        position: relative;
        background: #dfd3c3;
    }
    .header, .footer {
        height: 10%;
        background: #596e79;
    }
</style>
