import { createStore } from 'vuex'

export default createStore({
  state: {
    covidCaseData: []
  },
  mutations: {
    cov(state, covidData) {
      console.log(covidData);
      state.covidCaseData = covidData
      console.log(state.covidCaseData)
    }
  },
  actions: {
    covid({ commit }) {
      fetch('https://api.covid19india.org/states_daily.json')
        .then(res => res.json())
        .then(data => {
          commit("cov", data.states_daily)
        })
    }
  },
  getters: {
    covidCasesData: state => state.covidCaseData
  }
})
