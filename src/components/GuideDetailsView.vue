<template>
  <div class="contenu">
    <h1>Guide Details</h1>
    <div v-if="guide">
      <label class="container">
        <!--<input type="checkbox" v-model="isFavorite" @change="toggleFavorite">
        <svg height="24px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="24px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path></g></g></svg>
      -->
      <button @click="toggleFavorite">{{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
      </label>
      <h2>{{ guide.title }}</h2>
      <p>Objectif : {{ guide.objective }}</p>
      <p>Categorie(s): <span v-for="(category, index) in guide.category" :key="category._id">{{ category.name }}<span v-if="index !== guide.category.length - 1">, </span></span></p>
      <p>Jeu: {{guide.game.name}} </p>
      <p>{{ guide.content }}</p>
      <p>Author: {{ guide.author.username }}</p>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { apiUrl } from '../configs/api.config';

export default {
  name: 'GuideDetailsView',
  data() {
    return {
      guide: null,
      isFavorite:false,
    };
  },
  created() {
    this.fetchGuideDetails();
  },
  methods: {
    fetchGuideDetails() {
      
      const guideId = this.$route.params.id;

       axios.get(apiUrl+`/guides/${guideId}`)
        .then(response => {
            this.guide = response.data;
            this.isFavorite = this.isUserFavorite();
        })
        .catch(error => {
          console.error(error);
        });
    },
    isUserFavorite() {
      // Vérifie si l'utilisateur est connecté
      if (!this.$store.state.user) {
        return false;
      }

      // Récupère l'identifiant de l'utilisateur actuel
      const userId = this.$store.state.userInfo.id;

      // Vérifie si le guide est dans la liste des guides favoris de l'utilisateur
      return this.guide.author._id === userId || this.guide.author.favoriteGuides.includes(this.guide._id);
    },
    toggleFavorite() {
    // Récupère l'identifiant du guide
    const guideId = this.guide._id;

    // Effectue un appel à votre API pour ajouter ou supprimer le guide des favoris
    const url = apiUrl + '/favorites';
    const data = { guideId: guideId };

    axios.post(url, data)
      .then(response => {
        // Met à jour l'état isFavorite du guide dans le store front-end
        this.isFavorite = response.data.isFavorite;
      })
      .catch(error => {
        console.error(error);
      });
    },
  },
};
</script>

<style scoped>
.contenu {
    position : absolute;
    margin-left: 100px;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.container svg {
  position: relative;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: all 0.3s;
  fill: #666;
}

.container svg:hover {
  transform: scale(1.1);
}

.container input:checked ~ svg {
  fill: #cf8665ff;
}

</style>
