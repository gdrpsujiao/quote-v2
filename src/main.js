import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@assets/css/common.scss'

import { 
  Button,
  Icon,
  Popup,
  Radio,
  RadioGroup,
  Field,
  Notify
} from 'vant'

Vue.config.productionTip = false

Vue.use(Button)
  .use(Icon)
  .use(Popup)
  .use(Radio)
  .use(RadioGroup)
  .use(Field)
  .use(Notify)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
