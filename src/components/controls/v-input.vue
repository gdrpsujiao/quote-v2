<template>
    <section class="section-input-container">
        <van-field v-model="inputValue" />
    </section>
</template>

<script>
export default {
    name: 'VInput',
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                console.log(val)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>