import { createStore } from 'vuex'

export default createStore({
  state: {

  },
  mutations: {
  },
  actions: {
    covid() {
      fetch('https://api.covid19india.org/states_daily.json')
        .then(res => res.json())
    }
  },
  modules: {
  }
})
