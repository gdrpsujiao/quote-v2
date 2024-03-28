<template>
    <van-button 
        :type="type" 
        :size="size" 
        :text="text"
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