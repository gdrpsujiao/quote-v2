import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

import view from './view'
import quote from './quote'

export default new Vuex.Store({
    modules: {
        view,
        quote
    },
    plugins: [
        createPersistedState({
            storage: window.localStorage
        })
    ]
})