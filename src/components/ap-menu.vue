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
        <!-- <div class="tips">广告位出menu-container租</div> -->
        <section class="menu-container">
          <van-collapse 
            v-model="activeNames"
            :accordion="true"
          >

            <van-collapse-item title="测试页面" name="test">

            </van-collapse-item>
            <router-link to="" class="van-collapse-item van-cell">
              <span class="van-cell__title">测试页面</span>
            </router-link>

          </van-collapse>
        </section>
    </van-popup>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ApMenu',
  data() {
    return {
        showMenu: false,
        activeNames: [],
        menuList: [
          {
            name: 'test',
            label: '测试页',
          }
        ]
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

<style lang="scss">
.ap-menu {
  .menu-container {
    .van-collapse {
      font-size: 16px;
      a.van-collapse-item {
        display: block;
        font-size: 16px;
        color: $primary;
      }
      .van-collapse-item {
        .van-cell {
          font-size: 16px;
          .van-cell__title {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>