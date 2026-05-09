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
            <!-- <div class="van-collapse-item van-cell">
              <span class="van-cell__title" @click="onClick">旺旺照妖镜</span>
            </div> -->
            <!-- <div class="van-collapse-item van-cell">
              <span class="van-cell__title" @click="onPlay">娱乐赛</span>
            </div> -->
            <van-collapse-item title="娱乐赛" name="play">
              <section class="confirm-container">
                <span class="title">内部功能请输入邀请码</span>
                <van-field l
                  v-model="confirmCode" 
                  placeholder="输入邀请码"
                  class="v-input" />
                  <v-button 
                      text="确认"
                      type="info"
                      size="small"
                      :block="true"
                      class="btb-confirm"
                      @click="handlerConfirm" />
              </section>
            </van-collapse-item>
          </van-collapse>

          <!-- <van-popup v-model="showConfirmPassword">
            <section class="confirm-popup-container">
              <span class="title">付费功能请输入邀请码</span>
              <van-field 
                v-model="confirmCode" 
                placeholder="邀请码"
                class="v-input" />
              <div class="btn-container">
                <v-button 
                    text="取消" 
                    @click="showConfirmPassword = false"
                     />
                <v-button 
                    text="确认"
                    @click="handlerConfirm" />
              </div>
            </section>
          </van-popup> -->

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
        showConfirmPassword: false,
        activeNames: 'play',
        menuList: [
          {
            name: 'test',
            label: '测试页',
          }
        ],
        confirmCode: ''
    }
  },
  computed: {
    ...mapState('view', ['menuState', 'confirmView'])
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
    ...mapActions('view', ['setMenuState', 'setConfirmView']),
    handleClose() {
        this.showMenu = false
    },
    onClick() {
      window.location.href = 'https://tb-search.vercel.app'
    },
    onPlay() {
      // console.log('van')
      // this.$dialog({ message: 'test' })
      this.showConfirmPassword = true
    },
    handlerConfirm(){
      // console.log(this.confirmCode)
      // 娱乐限制
      // 单机没服务器写着玩
      let code = this.confirmCode.toLowerCase().trim()
      if(code== 'apeng') {
        // 保存到本地 Store
        this.setConfirmView(true)
        // 跳转页面
        this.$router.push('/play')
      }
      else {
        this.$toast.fail('邀请码有误')
      }
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
    .confirm-container {
      // padding: 20px;   
      .title {
        color: $primary;
      }
      .v-input {
        &::after {
          border-bottom: 0px;
        }
      }
      .btn-confirm {

      }
    }
}
</style>

<style lang="scss">
.ap-menu {
  .menu-container {
    .van-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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