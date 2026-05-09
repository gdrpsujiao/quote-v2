import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 自定义封装组件
import './plugins/components'

import '@assets/css/common.scss'

import { 
  Button,
  Icon,
  Popup,
  Radio,
  RadioGroup,
  Field,
  Notify,
  Collapse,
  CollapseItem,
  Tabs,
  Tab,
  Dialog,
  Toast
} from 'vant'

Vue.config.productionTip = false

Vue.use(Button)
  .use(Icon)
  .use(Popup)
  .use(Radio)
  .use(RadioGroup)
  .use(Field)
  .use(Notify)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tabs)
  .use(Tab)
  .use(Dialog)
  .use(Toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
