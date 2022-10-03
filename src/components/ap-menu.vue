<template>
    <van-popup
        v-model="showMenu"
        position="left"
        :style="{
            height: '100%',
        }"
        class="ap-menu"
        @close="handleClose"
    >
        <div class="tips">广告位出租</div>
    </van-popup>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ApMenu',
  data() {
    return {
        showMenu: false
    }
  },
  computed: {
    ...mapState('view', ['menuState'])
  },
  watch: {
    menuState: {
        handler(state) {
            this.showMenu = state
        }
    },
    showMenu: {
        immediate: true,
        handler(state) {
            this.setMenuState(state)
        }
    },
    $route: {
      handler() {
        this.setMenuState(false)
      },
    },
  },
  methods: {
    ...mapActions('view', ['setMenuState']),
    handleClose() {
        this.showMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ap-menu {
    padding-bottom: 100px;
    width: 300px;
    max-width: 300px;
    .tips {
        margin: 100px auto;
        font-size: 26px;
        writing-mode: vertical-lr;
    }
}
</style>