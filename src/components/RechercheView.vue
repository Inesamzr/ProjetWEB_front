<template>
  <div>
    <div class="input-group">
      <input required="" autocomplete="off" type="text" name="text" v-model="searchTerm" @input="handleSearch" />
      <label class="user-label">Search guide</label>

      <div class="dropdowns">
        <select v-model="selectedGuideCategory" class="select">
          <option value="">Game Category</option> 
          <option v-for="category in guideCategories" :value="category._id" :key="category._id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="dropdowns">
        <select v-model="selectedGameCategory" class="select">
          <option value="" class="textDROPDOWNS">Guide Category</option> 
          <option class="textDROPDOWNS" v-for="category in gameCategories" :value="category._id" :key="category._id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="dropdowns">
        <select v-model="selectedGameName" class="select">
          <option value="" class="textDROPDOWNS">Game Name</option> 
          <option lass="textDROPDOWNS" v-for="game in gameName" :key="game._id" :value="game._id">
            {{ game.name }}
          </option>
        </select>
      </div>

      <button class="button-send" @click="sendSearch">
        <font-awesome-icon :icon="['fas', 'check']" class="fa-orange" />
      </button>

      <button class="button-clear" @click="clearSearch">
        <font-awesome-icon :icon="['fas', 'times']" class="fa-red" />
      </button>
    

    <button class="add_button" @click="add">
      <font-awesome-icon :icon="['fas', 'plus']" class="fa-primary" />
      <span class="add">create</span>
    </button>
    </div>
    <div class="guidesrecherche">
      <GuideList ref="guideList" :searchTerm="searchTerm" />
    </div>
  </div>
</template>

 
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import GuideList from './GuideList.vue';
import { faPlus, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';
import {apiUrl} from '../configs/api.config'


library.add(faPlus)
library.add(faTimes)
library.add(faCheck)

export default {
  name: 'RechercheView',

  components: {
    GuideList,
    FontAwesomeIcon
  },


  data() {
    return {
      searchTerm: '', // Terme de recherche saisi par l'utilisateur
      guideCategories: [], // Catégories de guide
      gameCategories: [], // Catégories de jeux
      selectedGuideCategory: '',
      selectedGameCategory: '',
      gameName:[],//nom de jeux
      selectedGameName:'',
    };
  },
 
  created() {
  this.fetchGuideCategories();
  this.fetchGameCategories();
  this.fetchGames();
  },

  methods:{
    add(){
      this.$router.push("/guides/createguide"); 
    },
    handleSearch() {
      // Exécuter une action lorsque l'utilisateur saisit un terme de recherche
      if(this.searchTerm.length > 3){
        this.$emit('search', this.searchTerm);
      }
      
    },
    clearSearch() {
      // Réinitialiser le terme de recherche et effacer le champ de recherche
      this.searchTerm = '';
      this.selectedGameCategory = '';
      this.selectedGuideCategory = '';
      this.selectedGameName = '';

      // Réinitialiser les filtres de recherche dans le composant GuideList
      this.$refs.guideList.searchTerm = '';
      this.$refs.guideList.selectedGuideCategory = '';
      this.$refs.guideList.selectedGameCategory = '';
      this.$refs.guideList.selectedGameName='';
    },
    sendSearch() {
      // Exécuter une action lorsque l'utilisateur clique sur le bouton de recherche
      this.$refs.guideList.searchTerm = this.searchTerm;
      this.$refs.guideList.platformName = this.platformName;
      this.$refs.guideList.selectedGuideCategory = this.selectedGuideCategory; 
      this.$refs.guideList.selectedGameCategory = this.selectedGameCategory; 
      this.$refs.guideList.selectedGameName = this.selectedGameName;    
    },
    fetchGuideCategories() {
     axios
      .get(apiUrl + '/catguides')
      .then(response => {
        this.guideCategories = response.data.catguides;
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchGameCategories() {
    axios
      .get(apiUrl + '/catjeu')
      .then(response => {
        this.gameCategories = response.data.catjeux;
      })
      .catch(error => {
        console.error(error);
      });
    },
    fetchGames(){
      axios
      .get(apiUrl+'/jeu')
      .then(response => {
        this.gameName = response.data.jeux;
      })
      .catch(error => {
          console.error(error)
      });
    },

  }
};
</script>

<style >


.input-group{
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-left: 100px;   
}

.fa-red{
    color: white;
}

.input-group input {
  padding: 5px;
  width: 200px;
  margin-right: 10px;
  color: #cf8665ff;
  border: solid 1.5px  #cf8665ff;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1rem;
  background: none;
  transition: border 150ms cubic-bezier(0.4,0,0.2,1);
}

.input-group .user-label {
    position: absolute;
    left: 15px;
    color: #e8e8e8;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4,0,0.2,1);
}

.input-group input:focus, 
.input-group input:valid{
    outline: none;
    border: 1.5px solid #cf8665ff;
}

.input-group input:focus ~ .user-label, 
.input-group input:valid ~ .user-label {
    transform: translateY(-50%) scale(0.8);
    background-color: #554f4dff;
    padding: 0 .2em;
    color: #cf8665ff;
}

.input-group .button-clear {
    padding: 1px ;
    border: 0;
    margin-top: 10px;
    border-radius: 80%;
    background-color: #a43f40ff;
    color: #ffffff;
    font-weight: Bold;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    width:40px;
    height: 40px;
}

.input-group .button-clear:hover {
  background-color: rgb(202, 80, 82);
  box-shadow: 0 0 20px rgb(122, 47, 48);
  transform: scale(1.1);
}

.input-group .button-clear:active {
  background-color: rgb(122, 47, 48);
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}

.input-group .button-send {
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

.input-group .button-send:hover {
  background-color: rgb(231, 150, 112);
  box-shadow: 0 0 20px rgb(153, 99, 73);
  transform: scale(1.1);
}

.input-group .button-send:active {
  background-color: rgb(158, 102, 76);
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}

.dropdowns {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.dropdowns .select {
  width: 200px;
  margin-left: 5px;
  background: #554f4dff;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #cf8665ff solid;
  border-radius: 0.5em;
  padding: 0.5em;
  cursor: pointer;
}



.textDROPDOWNS{
  color: #fff;
}
.add_button{
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #cf8665ff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left: 800px;
  margin-top: 20px;
}

.add_button:hover{
  background-color: #cf8665ff;
  box-shadow: 0px 5px 10px rgb(150, 97, 72);
  color: #fff;
  transform: translateY(-7px);
}
.add{
  margin-left: 5px;
  margin-bottom: 20px;
}

</style>


