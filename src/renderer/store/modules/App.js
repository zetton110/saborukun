const state = {
  calling: false
}

const mutations = {
  TOGGLE (state) {
    state.calling = !state.calling
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('TOGGLE')
  }
}

export default {
  state,
  mutations,
  actions
}
