<template>
  <div>

    <button class="back_button" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button> 

    <h1 class="create">Create Guide</h1>

    <div class="create-guide-box-content">
    <form @submit.prevent="submitGuide">
      <!--<label cl>Title:</label>-->
      <input type="text" v-model="guideData.title" required class="form-controlCreation" placeholder="Title">

      <div class="dropdownsCreation">
        <select v-model="guideData.category" required class="form-controlCreation" >
          <option value="">Select a category</option> 
          <option v-for="category in categoriesData" :key="category._id" :value="category._id">{{ category.name }}</option>
        </select>
      </div>

      <div class="dropdownsCreation">
        <select v-model="guideData.game" required class="form-controlCreation" >
          <option value="">Select a game</option>
          <option v-for="game in gamesData" :key="game._id" :value="game._id">{{ game.name }}</option>
        </select>
      </div>

      <!--<label>Objective:</label>-->
      <textarea v-model="guideData.objective" required class="form-controlCreation" placeholder="Objective"></textarea>

      <!--<label>Content:</label>-->
      <textarea v-model="guideData.content" required class="form-controlCreation" placeholder="Content"></textarea>

      <button type="submit" class="create_button" >Create Guide</button>
    </form>
  </div>

  </div>
</template>

<script>
import axios from 'axios';
import {apiUrl} from '../configs/api.config'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faArrowLeft)

export default {

  name: 'CreateGuideView',
  
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
            content: '',
            author: '', 
        },
        
        categoriesData:[], //données des catégories
        gamesData:[], //données des jeux
      };
    },
    created() {
      this.fetchCategories();
      this.fetchGames();
    },

    methods: {
        goBack() {
          this.$router.push("/guides");
        },
        getAuthToken() {
          const token = localStorage.getItem('token'); 
          return token;
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

        submitGuide() {
 
  
        const token = this.getAuthToken();
        //ajouter le token à l'entete de la requête
        const headers = {
          Authorization: `Bearer `+ token ,
        }; 
        
        const guideData = {
          title: this.guideData.title,
          category: this.guideData.category,
          game: this.guideData.game,
          objective: this.guideData.objective,
          content: this.guideData.content,
          author: this.guideData.author,
        };
        
         
        axios
        .post(apiUrl+'/guides', guideData , { headers })
        .then(() => {
          this.$router.push("/guides");
        })
        .catch(error => {
          console.error(error);
        });
        },

        
    },
};
</script>

<style>

.back_button{
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

.back_button:hover{
  background-color: rgb(202, 80, 82);
  box-shadow: 0 0 20px rgb(122, 47, 48);
  transform: scale(1.1);
}

.back_button:active{
  background-color: rgb(122, 47, 48);
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}


.create{
  position: absolute;
  margin-top: 80px;
  align-items: center;
}
.create-guide-box-content{
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



.create-guide-box-content label{
  color:white;
  margin-top: 10px;
}

.create-guide-box-content input,
.create-guide-box-content textarea{
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

.create-guide-box-content input.form-controlCreation,
.create-guide-box-content textarea.form-controlCreation{
  color: white ;
  box-shadow: none ;
}

.create-guide-box-content input:focus ~ label,
.create-guide-box-content input:valid ~ label,
.create-guide-box-content textarea:focus ~label,
.create-guide-box-content textarea:valid ~label{
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.create-guide input,
.create-guide textarea {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
    
}

.create-guide button {
  margin-top: 10px;
}

.dropdownsCreation {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
  flex-wrap: wrap;
  background: black;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.dropdownsCreation .form-controlCreation {
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


.create_button{
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
  margin-left: 60px;
  margin-top: 30px;
}

.create_button:hover{
  background-color: #cf8665ff;
  box-shadow: 0px 5px 10px rgb(150, 97, 72);
  color: #fff;
  transform: translateY(-7px);
}
</style>

