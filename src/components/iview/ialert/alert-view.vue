<template>
    <div ref="show"></div>
</template>
<script>
import Alert from './notification'

export default {
    created () {
        const a = new Alert.Notification()
        a.log = null
    }
}
</script>
