<template>
    <van-button 
        :type="type" 
        :size="size" 
        :text="text"
        :block="block"
        :plain="plain"
        @click="handlerClick"
    >
        <!-- {{ label }} -->
    </van-button>
</template>

<script>
export default {
    name: 'VButton',
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        text: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'normal'
        },
        block: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handlerClick(evt) {
            this.$emit('click', evt)
        }
    }
}
</script>