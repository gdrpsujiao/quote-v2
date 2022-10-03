import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import view from './view'

export default new Vuex.Store({
    modules: {
        view
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage
        })
    ]
})