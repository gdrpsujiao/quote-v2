
const SET_MENU_STATE = 'SET_MENU_STATE'
const SET_CONFIRM_VIEW = 'SET_CONFIRM_VIEW'

const state = {
    menuState: false,
    confirmView: false
}

const mutations = {
    [SET_MENU_STATE]: (state, value) => {
        state.menuState = value
    },
    [SET_CONFIRM_VIEW]: (state, value) => {
        state.confirmView = value
    }
}

const actions = {
    setMenuState({ commit }, val) {
        commit(SET_MENU_STATE, val)
    },
    setConfirmView({ commit }, val) {
        commit(SET_CONFIRM_VIEW, val)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }