const UPDATE_LOCAL_QUOTE = 'SET_LOCAL_QUOTE'

const state = {
    localQuote: []
}

const mutations = {
    [UPDATE_LOCAL_QUOTE]: (state, value) => {
        state.localQuote = value
    }
}

const actions = {
    updateLocalQuote({ commit }, val) {
        commit(UPDATE_LOCAL_QUOTE, val)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}