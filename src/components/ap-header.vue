<template>
    <header>
        <div class="header-container">
            <div class="logo">
                <img src="@/assets/img/logo.png" @click="handlerLogo" />
            </div>
            <div class="icon">
                <van-icon name="apps-o" @click="handlerMenu" />
            </div>
        </div>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ApHearde',
  computed: {
    ...mapState('view', ['menuState'])
  },
  methods: {
    ...mapActions('view', ['setMenuState']),
    handlerMenu() {
        this.setMenuState(!this.menuState)
    },
    handlerLogo() {
        this.$notify({
            type: 'danger',
            message: '你想干嘛'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2001;
  background: white;
  filter: drop-shadow(0px 0.3125rem 0.5rem rgba(0, 35, 124, 0.08));
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 65px;
    .logo {
        display: flex;
        align-items: center;
        font-size: 22px;
        img {
            height: 65px;
        }
    }
    .icon {
        font-size: 26px;
        cursor: pointer;
    }
  }
}
</style>