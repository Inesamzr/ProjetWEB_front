<template>
  <div class="edit">
    <button class="back_buttonEdit" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button> 
    <h1 class="edit_container">Modifier le guide</h1>
    <div class="edit-guide-box-content">
        <form @submit.prevent="confirmUpdate">
        <label for="title">Titre:</label>
        <input type="text" id="title" v-model="guideData.title" required class="form-controlEdition">

        <div class="dropdownsEdition">
            <select v-model="guideData.category" required class="form-controlEdition">
            <option v-for="category in categoriesData" :key="category._id" :value="category._id">{{ category.name }}</option>
            </select>
        </div>

        <div class="dropdownsEdition">
            <select v-model="guideData.game" required class="form-controlEdition" >
            <option v-for="game in gamesData" :key="game._id" :value="game._id"> {{ game.name }}</option>
            </select>
        </div>

        <label for="objective">Objectif(s):</label>
        <textarea id="objective" v-model="guideData.objective" required class="form-controlEdition"></textarea>

        <label>Contenu:</label>
        <textarea v-model="guideData.content" required class="form-controlEdition"></textarea>

        <button type="submit" class="edition_button">Mettre à jour</button>
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { apiUrl } from '../configs/api.config';
import { library } from '@fortawesome/fontawesome-svg-core'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)

export default {
  name: 'GuideEditView',

   component:{
    FontAwesomeIcon
  },
  data() {
    return {
        guideData: {
            title: '',
            category: '',
            game: '',
            objective: '',
            content:'',
        },
        categoriesData:[], //données des catégories
        gamesData:[], //données des jeux
    };
  },
  created() {
    this.fetchGuideDetails();
    this.fetchCategories();
    this.fetchGames();
  },
  methods: {

    confirmUpdate() {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce guide ?")) {
        this.updateGuide();
      }
    },
    fetchGuideDetails() {
    const guideId = this.$route.params.id;

    axios.get(apiUrl + `/guides/${guideId}`)
        .then(response => {
        const { title, objective, content, category, game } = response.data;
        this.guideData = {
            title: title,
            objective: objective,
            content: content,
            category: category[0]._id,
            game: game._id 
        };
        })
        .catch(error => { 
        console.error(error);
        });
    },

     fetchCategories(){
          axios
          .get(apiUrl+'/catguides')
          .then(response => {
            console.log('Response from fetchCategories:', response);
            this.categoriesData = response.data.catguides;
        
          })
          .catch(error => {
              console.error(error);
          });
        },

    fetchGames(){
        axios
        .get(apiUrl+'/jeu')
        .then(response => {
            console.log('Response from fetchGames:', response);
            this.gamesData = response.data.jeux;
        })
        .catch(error => {
            console.error(error)
        });
    },
    updateGuide() {
      const guideId = this.$route.params.id;

      axios.put(apiUrl + `/guides/${guideId}`, this.guideData)
        .then(() => {
          console.log('Guide mis à jour');
          this.$router.push(`/guides/${guideId}`);
        })
        .catch(error => {
          console.error(error);
        });
    },
    goBack(){ 
    const guideId = this.$route.params.id;
    this.$router.push(`/guides/${guideId}`)

    }
  },
};
</script>

<style scoped>
.edit_container{
    position:absolute;
    margin-top: 40px;
    align-items: center;
}

.edit-guide-box-content{
    position: absolute;
    top: 50%;
    left: 40%;
    width: 400px;
    padding: 40px;
    margin: 20px auto;
    transform: translate(-50%, -55%);
    background: rgba(0,0,0,1);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
}

.edit-guide-box-content label{
  color:white;
  margin-top: 10px;
}

.edit-guide-box-content input,
.edit-guide-box-content textarea{
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #cf8665ff;
  outline: none;
  background: transparent;
}

.edit-guide-box-content input.form-controlEdition,
.edit-guide-box-content textarea.form-controlEdition{
  color: white ;
  box-shadow: none ;
}

.edit-guide-box-content input:focus ~ label,
.edit-guide-box-content input:valid ~ label,
.edit-guide-box-content textarea:focus ~label,
.edit-guide-box-content textarea:valid ~label{
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.back_buttonEdit{
  position: absolute;
  margin-top: 680px;
  padding: 1px ;
  border: 0;
  border-radius: 80%;
  background-color: #a43f40ff;
  color: #ffffff;
  font-weight: Bold;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  width:40px;
  height: 40px;
}
.back_buttonEdit:hover{
  background-color: rgb(202, 80, 82);
  box-shadow: 0 0 20px rgb(122, 47, 48);
  transform: scale(1.1);
}

.back_buttonEdit:active{
  background-color: rgb(122, 47, 48);
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}

.edition_button{
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
  margin-left: 80px;
  margin-top: 30px;
}

.edition_button:hover{
  background-color: #cf8665ff;
  box-shadow: 0px 5px 10px rgb(150, 97, 72);
  color: #fff;
  transform: translateY(-7px);
}

.dropdownsEdition {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
  flex-wrap: wrap;
  background: black;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.dropdownsEdition .form-controlEdition {
  width: 200px;
  margin-left: 5px;
  background: black;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px #cf8665ff solid;
  border-radius: 0.5em;
  padding: 0.5em;
  cursor: pointer;
}
</style>
