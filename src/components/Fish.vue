<template>

<h2>Hello Fish</h2>
<input type="text" placeholder="search" v-model="keywords">

<section class="wrapper">
  <div v-for="fish in filteredFish" :key="fish" class="fish-item">
    <img :src="fish[1]['icon_uri']" alt="" @click="openModal(fish[1].id)">  
    <h3 v-html="keywordHighlight(fish[1].name['name-TWzh'])"></h3> 
    <p>{{fish[1]['catch-phrase']}}</p> 
    
  </div>  
</section>

<div class="light-box" v-show="modal" @click.self="closeModal">
  
    <div class="light" v-if="currFish">
      <div>
         <h4>{{currFish[1].name['name-TWzh']}}</h4>

         <img :src="currFish[1]['image_uri']" alt="">
          <ul>
            <li>北半球出現月:{{currFish[1].availability['month-array-northern']}} (月份)</li>
            <li>出現時間: {{currFish[1].availability['time-array']}} (24小時制)</li>
            <li>價錢: {{currFish[1].price}} 元</li>            
          </ul>       
      </div>     
      
    </div>  
   
</div>


  
</template>

<script>

import {mapGetters} from 'vuex';



export default {
  name:'fish',

  methods: {

    openModal(val) {
      this.modal = true;  

      this.infoId = val;     
      
    },

    closeModal () {
      this.modal = false;
    },

    keywordHighlight (val) {
      return val.replace(new RegExp(this.keywords, 'g'), `<span class="highlight">${this.keywords}</span>`);

    }
    
  },
  computed: {

    ...mapGetters(['filteredFish']),

    fishData () {
      return this.$store.state.fish
    },  
    modal : {
      get () {
        return this.$store.state.modal
      },
      set (value) {
        this.$store.commit('setModal', value)
      }
    },
    keywords: {
      get () {
        return this.$store.state.keywords;
      },
      set (val) {
        this.$store.commit('setKeywords', val);
      }
    },
    infoId : {
      get () {
        return this.$store.state.infoId
      },
      set (val) {
        this.$store.commit('setInfoId', val)
      }
    },
    currFish() {
      return this.$store.state.fish.filter((d) => d[1].id === this.infoId)[0]
    }
        
  },
  
}
</script>

<style lang="scss" scoped>

.light {
    width: 70vw;
    height: 70vh;
    background: #f0f0f0 ;
    display:flex;
    justify-content: center;
    align-item:center;

    div {
      width:100%;

      h4 {
        font-size: 30px;
      }

      img {
        width:40%;
        @media screen and (max-width:576px) {
          width:100%;
        }
      }

      ul {
        padding: 0px 5px;

        li {
        padding: 3px 5px ;
        text-align: justify;
        list-style-type:none;
      }
      }    
   
    }
  }
  
</style>