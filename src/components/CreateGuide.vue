<template>
  <div class="create-guide">
    <form @submit.prevent="submitGuide">
      <label>Title:</label>
      <input type="text" v-model="guideData.title" required>

      <label>Category:</label>
      <select v-model="guideData.category" required>
        <option value="">Select a category</option> {{categories}}
        <option v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
      </select>

      <label>Game:</label>
      <select v-model="guideData.game" required>
        <option value="">Select a game</option>
        <option v-for="game in games" :key="game._id" :value="game._id">{{ game.name }}</option>
      </select>

      <label>Objective:</label>
      <textarea v-model="guideData.objective" required></textarea>

      <label>Content:</label>
      <textarea v-model="guideData.content" required></textarea>

      <button type="submit">Create Guide</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import {apiUrl} from '../configs/api.config'
export default {

  name: 'CreateGuide',

  data() {
    return {
        guideData: {
            title: '',
            category: '',
            game: '',
            objective: '',
            content: '',
        },
        categories: [],
        games: [],
      };
    },
    created() {
        this.fetchCategories();
        this.fetchGames();
    },

    methods: {
        submitGuide() {
        // Soumettre le guide à l'API ou effectuer toute autre logique de création
        axios
        .post(apiUrl+'/guides/',this.guideData)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error);
        });
        },

        fetchCategories(){
            axios
            .get(apiUrl+'/catguides')
            .then(response => {
                this.categories = response.data.catguides
          
            })
            .catch(error => {
                console.error(error);
            });
        },

        fetchGames(){
            axios
            .get(apiUrl+'/jeu')
            .then(response => {
                this.games = response.data.jeux;
            })
            .catch(error => {
                console.error(error)
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
