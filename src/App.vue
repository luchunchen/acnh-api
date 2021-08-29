<template>

  <h1>ACNH API</h1>  
  <img alt="Vue logo" src="./assets/logo.png">  <br>

  <button v-for=" tab in tabs" :key="tab" @click='changeTab(tab,val), resetKeywords(null)' >{{tab}}</button>  
  
  <component :is='currentTabCompoenet'></component>
  
</template>

<script>
import { mapActions } from 'vuex';
import Fish from './components/Fish.vue';
import Bug from './components/Bug.vue';


export default {
  name: 'App',
  components: {    
    Fish,
    Bug,          
  },
  
  methods: {

    ...mapActions(['fetchFish','fetchBug']), 
    changeTab (value) {
      this.$store.commit('setCurrentTab', value);

    },
    resetKeywords (value) {
      this.$store.commit('setKeywords',value);
    }   
   
    
  },

  computed: {

    currentTabCompoenet: {
      get () {
         return this.$store.state.currentTab;  
      }              
    },

    tabs() {
      return this.$store.state.tabs
    },

  },

  mounted () {
    this.fetchFish();
    this.fetchBug();
  }
 
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}

button {
  padding: 3px 6px;
  margin-right:5px;
}

button:active {
  transform: translateY(5px);
  box-shadow:0px 0px 12px green;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  justify-content: space-evenly;

  img {
    cursor: pointer;
  }
  
}

.light-box {
  width: 100%;
  height: 100%;
  background: rgba(114, 100, 100, 0.634);
  position: fixed;
  top:0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  
} 




.highlight {
  color:  red;
}
</style>
