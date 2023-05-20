<template>
    <div>
        <div class="input-group">
          <input required="" autocomplete="off" type="text" name="text" v-model="searchTerm" @input="handleSearch" />
          <label class="user-label">Rechercher guide</label>

          <button class="button-send" @click="sendSearch">
            <font-awesome-icon :icon="['fas', 'check']"
            class="fa-orange" />
          </button>

          <button class= "button-clear" @click="clearSearch">
            <font-awesome-icon :icon="['fas', 'times']"
            class="fa-red" />
          </button >
        </div>
        
        <button class="add_button" @click="add"> 
          <font-awesome-icon 
            :icon="['fas', 'plus']" 
            class="fa-primary" />
          add
        </button>

        <GuideList ref="guideList" :searchTerm="searchTerm"/>
    </div>
</template>
 
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import GuideList from './GuideList.vue';
import { faPlus, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
    };
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
      this.handleSearch();
      
    },
    sendSearch() {
      // Exécuter une action lorsque l'utilisateur clique sur le bouton de recherche
      console.log('Recherche effectuée:', this.searchTerm);
      this.$refs.guideList.searchTerm = this.searchTerm;
      
    },
  }
};
</script>

<style scoped>
.add_button{
  margin-left: 200px;
  position: absolute;
}

.input-group{
    margin-top: 20px;
    margin-bottom: 20px; 
    margin-left: 250px;   
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
    background-color: white;
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

</style>


