<template>
    <van-popup
        v-model="showPopup"
        class="ap-setting"
        @close="handlerCancel"
    >

        <section class="popup-container">
          <h4>设置默认值</h4>
          <div class="form-box">
            <div class="form-item">
              <van-field 
                v-model="formData.density" 
                label="密度"
                placeholder="密度"
                type="number"
                class="v-input" />
                <van-field 
                    v-model="formData.price" 
                    label="单价"
                    placeholder="单价"
                    type="number"
                    class="v-input" />
            </div>
            <div class="btn-expand">
                <!-- <v-button 
                    text="取消" 
                    type="default"
                    size="small"
                    @click="handlerCancel"/> -->
                <v-button 
                    text="保存"
                    size="small"
                    type="info"
                    :block="true"
                    @click="handlerSave" />
            </div>
          </div>
        </section>
    </van-popup>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ApSettingValue',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        showPopup: false,
        formData: {
          density: 1.2,
          price: '',
        }
    }
  },
  computed: {
    ...mapState('quote', ['initQuoteForm'])
  },
  watch: {
    value: {
      immediate: true,
      handler(status) {
        if(status !== this.showPopup) {
          this.showPopup = status
        }
      }
    },
    showPopup: {
      handler(status) {
        if(status !== this.value) {
          this.$emit('input', status)
        }
        if(status) {
          // 检查默认值
          Object.keys(this.initQuoteForm).some(key => {
            this.formData[key] = this.initQuoteForm[key]
          })
        }
      }
    }
  },
  methods: {
    ...mapActions('quote', ['setInitQuoteForm']),
    handlerCancel() {
        this.showPopup = false
    },
    handlerSave() {
      let data = {
        ...this.initQuoteForm,
        ...this.formData
      }

      this.setInitQuoteForm(data)

      // 通知父组件
      this.$emit('save')
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ap-setting {
    padding: 30px 20px;
    width: 300px;
    max-width: 300px;
    border-radius: 20px;
    .popup-container {
      h4 {
        padding-bottom: 20px;
      }
      .btn-expand {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;
        button {
            margin-right: 20px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    }
}
</style>

<style lang="scss">
.ap-setting {

}
</style>