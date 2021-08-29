import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    keywords: '',  //共用關鍵字
    infoId: null, //共用info-id
    fish: [],        
    bug: [],    
    currentTab: 'Fish',
    tabs: ['Fish', 'Bug'],
    modal: false,
  },
  getters: {

    filteredFish(state) {
      
      const {fish} = state;

      return state.keywords ?
        fish.filter((d) => d[1].name['name-TWzh'].includes(state.keywords)) :
        fish;
    },
    filteredBug (state) {

      const {bug} = state;

      return state.keywords ?
      bug.filter((d) => d[1].name['name-TWzh'].includes(state.keywords)) :
      bug;
    }

  },

  mutations: {

    setFish(state, payload) {
      state.fish = payload;
    },
    setBug(state, payload) {
      state.bug = payload
    },
    setCurrentTab(state, payload) {
      state.currentTab = payload
    },
    setModal(state, payload) {
      state.modal = payload
    },
    setInfoId(state, payload) {
      state.infoId = payload
    },
    setKeywords(state, payload) {
      state.keywords = payload
    }

  },
  actions: {

    async fetchFish({
      commit
    }) {
      const json = await fetch('https://acnhapi.com/v1/fish')
        .then((res) => res.json())
        .then((res) => Object.entries(res))

      commit('setFish', json);
    },
    

    async fetchBug({
      commit
    }) {
      const json = await fetch('https://acnhapi.com/v1/bugs')
        .then((res) => res.json())
        .then((res) => Object.entries(res))

      commit('setBug', json);

    }
  },
  modules: {}
})