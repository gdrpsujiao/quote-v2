const UPDATE_LOCAL_QUOTE = 'SET_LOCAL_QUOTE'
const SET_INIT_QUOTE_FORM = 'SET_INIT_QUOTE_FORM'

const state = {
    localQuote: [],
    initQuoteForm: {}
}

const mutations = {
    [UPDATE_LOCAL_QUOTE]: (state, value) => {
        state.localQuote = value
    },
    [SET_INIT_QUOTE_FORM]: (state, value) => {
        state.initQuoteForm = value
    }
}

const actions = {
    updateLocalQuote({ commit }, val) {
        commit(UPDATE_LOCAL_QUOTE, val)
    },
    setInitQuoteForm({ commit }, val) {
        commit(SET_INIT_QUOTE_FORM, val)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}