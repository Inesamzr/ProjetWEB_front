<template>
  <div>
    <h1>Create Guide</h1>

     <div class="create-guide">
    <form @submit.prevent="submitGuide">
      <label>Title:</label>
      <input type="text" v-model="guideData.title" required>

      <label>Category:</label>
      <select v-model="guideData.category" required>
        <option value="">Select a category</option> 
        <option v-for="category in categoriesData" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>

      <label>Game:</label>
      <select v-model="guideData.game" required>
        <option value="">Select a game</option>
        <option v-for="game in gamesData" :key="game._id" :value="game._id">{{ game.name }}</option>
      </select>

      <label>Objective:</label>
      <textarea v-model="guideData.objective" required></textarea>

      <label>Content:</label>
      <textarea v-model="guideData.content" required></textarea>

      <button type="submit">Create Guide</button>
    </form>
  </div>

  </div>
</template>

<script>
import axios from 'axios';
import {apiUrl} from '../configs/api.config'


export default {

  name: 'CreateGuideView',
  


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
        getAuthToken() {
          const token = localStorage.getItem('token'); 
          return token;
        },
        fetchCategories(){
          console.log('Calling fetchCategories');
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
          console.log('Calling fetchGames');
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
        console.log(token);
        //ajouter le token à l'entete de la requête
        const headers = {
          Authorization: `Bearer ${ token }`,
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
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error);
        });
        },

        
    },
};
</script>

<style>
.create-guide {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: absolute;
}

.create-guide label {
    display: block;
    margin-top: 10px;
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
</style>

