<template>
  <div>

    <button class="back_buttonDetail" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <div v-if="isAdmin">
      <button class="delete-button" @click="confirmDelete">
       <svg viewBox="0 0 448 512" class="svgIconDelete"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
      </button>
      <button class="edit-button" @click="editGuide">
       edit
      </button>
    </div>
    <div class="contenuDetail">
      <h1 >Guide Details</h1>
      <div v-if="guide" class="containerDetail">
        
        <h2 class="titreDetail">{{ guide.title }}</h2> 
        <p class="textDetail"><b>Objectif:</b> {{ guide.objective }}</p> 
        <p class="textDetail"><b>Categorie(s):</b> <span v-for="(category, index) in guide.category" :key="category._id">{{ category.name }}<span v-if="index !== guide.category.length - 1">, </span></span></p>
        <p class="textDetail"><b>Jeu:</b> {{guide.game.name}} </p>
        <p class="textDetail">{{ guide.content }}</p>
        <p class="textDetail"><b>Author:</b> {{ guide.author.username }}</p>
        <p class="textDetail"><b>Created at:</b> {{ guide.created_at }}</p>   
      </div>
      <div v-else>
        Loading...
      </div>
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
  name: 'GuideDetailsView',

  component:{
    FontAwesomeIcon
  },
  data() {
    return {
      guide: null,
    };
  },
  created() {
    this.fetchGuideDetails();
  
  },
  computed: {
      currentUser() {
        return JSON.parse(localStorage.getItem("userInfo"));
      },
      isAdmin() {
      return this.currentUser && this.currentUser.roles.includes('admin');
    }
  },
  
  methods: {
    confirmDelete() {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce guide ?")) {
        this.deleteGuide();
      }
    },
    goBack() {
          this.$router.push("/guides");
        },
    fetchGuideDetails() {
      const guideId = this.$route.params.id;
      
       axios.get(apiUrl+`/guides/${guideId}`)
        .then(response => {
            this.guide = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteGuide() {
      // Récupérez l'identifiant du guide à supprimer
      const guideId = this.guide._id;

      axios.delete(apiUrl + `/guides/${guideId}`)
        .then(() => {
          // Le guide a été supprimé avec succès, vous pouvez effectuer des actions supplémentaires si nécessaire
          console.log('Guide supprimé');
          this.$router.push('/guides');
        })
        .catch(error => {
          console.error(error);
        });
    },
    editGuide() {
      const guideId = this.$route.params.id;
      this.$router.push(`/guides/${guideId}/edit`);
    },
  },
};
</script>

<style scoped>
.edit-button {
  position: absolute;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #cf8665ff;
  color: white;
  font-weight: bold;
  transition: all 0.5s;
  margin-top: 602px;
  margin-left: 400px;
}

.delete-button{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: .3s;
  overflow: hidden;
  position: absolute;
  margin-top: 600px;
  margin-left: 500px;
}

.svgIconDelete {
  width: 12px;
  transition-duration: .3s;
}

.svgIconDelete path {
  fill: white;
}

.delete-button:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: .3s;
  background-color: #a43f40ff;
  align-items: center;
}

.delete-button:hover .svgIconDelete {
  width: 50px;
  transition-duration: .3s;
  transform: translateY(60%);
}

.delete-button::before {
  position: absolute;
  top: -20px;
  content: "Delete";
  color: white;
  transition-duration: .3s;
  font-size: 2px;
}

.delete-button:hover::before {
  font-size: 13px;
  opacity: 1;
  transform: translateY(30px);
  transition-duration: .3s;
}

.edit-button:hover {
  background-color: #cf8665ff;
  box-shadow: 0 0 20px rgb(150, 97, 72);
  transform: scale(1.1);
}

.edit-button:active {
  background-color: #cf8665ff;
  transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}

.contenuDetail {
  position : absolute;
  margin-left: 40px;
  margin-top: 50px; 
    
}

.containerDetail{
  left: 30%;
  padding: 40px;
  background: rgba(0,0,0,.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
  margin-top:50px;
}

.titreDetail{
  background: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.textDetail{
  color: white;
}


.back_buttonDetail{
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

.back_buttonDetail:hover{
  background-color: rgb(202, 80, 82);
  box-shadow: 0 0 20px rgb(122, 47, 48);
  transform: scale(1.1);
}

.back_buttonDetail:active{
  background-color: rgb(122, 47, 48);
  transition: all 0.25s;
  -webkit-transition: all 0.25s;
  box-shadow: none;
  transform: scale(0.98);
}
</style>
