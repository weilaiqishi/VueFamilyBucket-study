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
        display: grid;
        grid-template-rows: 100px auto 100px;
    }
    .full {
        background: #dfd3c3;
    }
    .header,
    .footer {
        background: #596e79;
    }
</style>
