<template>
  <h2>Hello Bug </h2>
  <input type="text" placeholder="search" v-model="keywords">
<section class="wrapper">
  <div v-for="bug in filteredBug" :key="bug">
    <img :src="bug[1]['icon_uri']" alt="" @click="openModal(bug[1].id)"> 
    <h3 v-html="keywordHighlight(bug[1].name['name-TWzh'])"></h3>
    <p>{{bug[1]['catch-phrase']}}</p> 
  </div>  
</section>

<div class="light-box" v-show="modal" @click.self="closeModal">
  
    <div class="light" v-if="currBug">
      <div>
         <h4>{{currBug[1].name['name-TWzh']}}</h4>
         <img :src="currBug[1]['image_uri']" alt="">
          <ul>
            <li>北半球出現月:{{currBug[1].availability['month-array-northern']}} (月份)</li>
            <li>出現時間: {{currBug[1].availability['time-array']}} (24小時制)</li>
            <li>價錢: {{currBug[1].price}} 元</li>            
          </ul>        
      </div>
      
      

    </div>  
   
</div>


  
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  name:'bug',
  computed: {

    ...mapGetters(['filteredBug']),
    
      keywords: {
        get () {
          return this.$store.state.keywords
        },
        set(val) {
          this.$store.commit('setKeywords', val);
        }
      },
      modal: {
        get () {
          return this.$store.state.modal;
        },
        set(val) {
           this.$store.commit('setModal', val);
        }
      },
      infoId: {
        get() {
          return this.$store.state.infoId;
        },
        set (val) {
          this.$store.commit('setInfoId', val);
        }
      },
      currBug: {
        get () {
          return this.$store.state.bug.filter((d) => d[1].id === this.infoId)[0]
        }
      }
      
    },
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
    }
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
        width:20%;
        @media screen and (max-width:576px) {
          width:80%;
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