<template>
    <div class="guide-list"> 
        <ul class="guide-list-container">
            <li v-for="guide in filteredGuides.slice(startIndex, endIndex + 1)" :key="guide._id" class="guide-item">
              <GuideCard :guide="guide" />
            </li>
            <div v-if="isLoading && guides.length === 0" >
              <div class="loading">
                <div class="ball"></div>
                <div class="shadow"></div>
              </div>
            </div>
            <div v-if="!isLoading && guides.length === 0">
              <p class="message">No guides available.</p>
            </div>
        </ul>
        <div class="pagination" v-if="!isLoading">
          <button class="prev-button" @click="currentPage--" :disabled="currentPage === 1">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
          </button>
          <span class="currentpage center">{{ currentPage }}</span>
          <button class="next-button" @click="currentPage++" :disabled="endIndex >= filteredGuides.length - 1">
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
        </div>
    </div>
</template>

<script>
import GuideCard from './GuideCard.vue';
import axios from 'axios';
import {apiUrl} from '../configs/api.config'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)
library.add(faArrowRight)


export default {  

  name: 'GuideList',

  components: {
    GuideCard,
    FontAwesomeIcon
  },
 
  data() {
    return {
      isLoading: true,
      guides: [], //liste de tous les guides
      searchTerm: '',
      platformName:'',
      selectedGuideCategory: '',
      selectedGameCategory: '',
      selectedGameName:'',
      currentPage: 1, // numéro de la page actuelle
    };
  },
  created(){
    this.fetchGuides();
    this.$watch(
      ()=> this.$route.params,
      (newParams,) => {
        // Effectuez les actions souhaitées lorsque les paramètres de route changent
        let plat = newParams
        this.platformName = plat && plat.platform ? plat.platform : '';
        this.fetchGuides();
      }
    )
  },
  
  computed: { 
    //pagination
    startIndex() {
      return (this.currentPage - 1) * 12; // 12 guides par page
    },
    endIndex() {
      return this.currentPage * 12 - 1;
    },   
    filteredGuides() {
      if (this.selectedGuideCategory) {
        return this.guides.filter((guide) => {
          return guide.category.some(cat => cat._id == this.selectedGuideCategory);
        });
      }

      if (this.selectedGameCategory) {
        return this.guides.filter((guide) => {
          return guide.game.category.includes(this.selectedGameCategory);
        });
      }
      if (this.selectedGameName) {
        console.log(this.selectedGameName)
        return this.guides.filter((guide) => {
          return guide.game._id === this.selectedGameName;
        });
        
      }

      if (this.searchTerm && this.searchTerm.length > 0) {
        let x = this.guides.filter(guide => {
          
          return (guide.title ?? '').toLowerCase().includes(this.searchTerm.toLowerCase());
        });
        return x
      } else{
        return this.guides
      }
    }
  },

  methods: {
    //pagination
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.endIndex < this.filteredGuides.length - 1) {
        this.currentPage++;
      }
    },
    fetchGuides() {
      this.isLoading = true; // Afficher le chargement

      var url = apiUrl+'/guides';

      if(this.platformName != ''){
        url = url + '/plateforme/' + this.platformName; 
      }
      axios
        .get(url)
        .then(response => {
          if(response.data){
            this.guides = response.data;
          }
          this.isLoading = false; 
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style >

.loading{
  margin-top: 250px;
}
.ball {
  left:50%;
  top:20%;
  animation: float612 2.4s ease-in-out infinite;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  position: absolute;
  background: radial-gradient( circle at 75% 30%, white 5px, #a43f40ff 8%, rgb(202, 92, 94) 100% 60%, rgb(202, 92, 94) 100%);
  box-shadow: inset 0 0 20px rgb(175, 79, 81) 100%, inset 10px 0 46px #a43f40ff, inset 88px 0px 60px rgb(202, 92, 94) 100%, inset -20px -60px 100px rgb(214, 139, 141) 100%, inset 0 50px 140px rgb(214, 139, 141) 100%, 0 0 90px #fff;
}

@keyframes float612 {
  0% {
    transform: translatey(0px);
  }

  50% {
    transform: translatey(-50px);
  }

  100% {
    transform: translatey(0px);
  }
}

.shadow {
  left:50%;
  top:20%;
  background: rgb(202, 92, 94) 100%;
  width: 80px;
  height: 25px;
  top: 65%;
  animation: expand6234 2.4s ease-in-out infinite;
  position: absolute;
  border-radius: 50%;
  margin-top: 20px;
}

@keyframes expand6234 {
  0%,
            100% {
    transform: scale(0.6);
  }

  50% {
    transform: scale(0.3);
    filter: blur(5px);
  }
}





.pagination{
  position: absolute;
  left: 50%;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.currentpage{
  font-size: 20px;
  margin-left: 20px;
  margin-right: 20px;
  color: white;
  
}

.prev-button,.next-button{
  padding: 1px ;
  margin-right: 4px;
  border: 0;
  margin-top: 10px;
  border-radius: 80%;
  background-color: #cf8665ff;
  color: #ffffff;
  font-weight: Bold;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  width:40px;
  height: 40px;
}

.prev-button:hover, .next-button:hover{
  background-color: rgb(231, 150, 112);
  box-shadow: 0 0 20px rgb(153, 99, 73);
  transform: scale(1.1);
}

.prev-button:active ,.next-button:active{
  background-color: rgb(158, 102, 76);
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}


.guide-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  position: relative;
}

.guide-list li {
  width: 33.33% ;
  margin-bottom: 20px;
  display:flex;
  
}

.message {
  margin-left: 100px;
}

.h1 {
  margin-left: 100px;
}
 
</style>
