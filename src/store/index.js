import Vuex from 'vuex'

export function createStore() {
  return new Vuex.Store({
    state: {
      showDrawer: true
    },
    getters: {
      getDrawer: state => state.showDrawer
    },
    mutations: {
      toggleDrawer: (state,flag) => {
        state.showDrawer = flag
      },
      closeDrawer: (state) => {
        state.showDrawer = false
      }
    }
  })
}