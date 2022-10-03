
const SET_MENU_STATE = 'SET_MENU_STATE'

const state = {
    menuState: false,
}

const mutations = {
    [SET_MENU_STATE]: (state, value) => {
        state.menuState = value
    }
}

const actions = {
    setMenuState({ commit }, val) {
        commit(SET_MENU_STATE, val)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }