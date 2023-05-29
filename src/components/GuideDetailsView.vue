<template>
  <div>

    
    <div class="contenuDetail">
      <h1>Détails du guide</h1>
      <div v-if="guide" class="containerDetail">
        
        <h2 class="titreDetail">{{ guide.title }}</h2> 
        <p class="textDetail"><b>Objectif(s):</b> {{ guide.objective }}</p> 
        <p class="textDetail"><b>Categorie:</b> <span v-for="(category, index) in guide.category" :key="category._id">{{ category.name }}<span v-if="index !== guide.category.length - 1">, </span></span></p>
        <p class="textDetail"><b>Jeu:</b> {{guide.game.name}} </p>
        <p class="textDetail">{{ guide.content }}</p>
        <p class="textDetail"><b>Auteurr:</b> {{ guide.author.username }}</p>
        <p class="textDetail"><b>Date de création:</b> {{ guide.created_at }}</p> 
        <button class="back_buttonDetail" @click="goBack">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <div v-if="isAdmin">
      <button class="delete_buttonDetail" @click="confirmDelete">
       <svg viewBox="0 0 448 512" class="svgIconDeleteDetail"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
      </button>
      <button class="edit-button" @click="editGuide">
       EDITER
      </button>
    </div>

      </div>
      <div v-else>
          <div class="loadingDetail">
            <div class="ballDetail"></div>
            <div class="shadowDetail"></div>
          </div>
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
          // Le guide a été supprimé avec succès
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


.ballDetail {
  left:50%;
  top:50%;
  margin-top: 200px;
  animation: float612 2.4s ease-in-out infinite;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  position: relative;
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

.shadowDetail {
  left:50%;
  top:20%;
  background: rgb(202, 92, 94) 100%;
  width: 80px;
  height: 25px;
  top: 65%;
  animation: expand6234 2.4s ease-in-out infinite;
  position: relative;
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

.edit-button {
  position: absolute;
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
  margin-left: 350px;
  margin-top: 50px;
}

.edit-button:hover{
  background-color: #cf8665ff;
  box-shadow: 0px 5px 10px rgb(150, 97, 72);
  color: #fff;
  transform: translateY(-7px);
}
  


.delete_buttonDetail{
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
  margin-left: 500px;
  margin-top: 50px;
}

.svgIconDeleteDetail {
  width: 12px;
  transition-duration: .3s;
}

.svgIconDeleteDetail path {
  fill: white;
}

.delete_buttonDetail:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: .3s;
  background-color: #a43f40ff;
  align-items: center;
}

.delete_buttonDetail:hover .svgIconDeleteDetail {
  width: 50px;
  transition-duration: .3s;
  transform: translateY(60%);
}

.delete_buttonDetail::before {
  position: relative;
  top: -20px;
  content: "supprimer";
  color: white;
  transition-duration: .3s;
  font-size: 2px;
}

.delete_buttonDetail:hover::before {
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
  position : relative;
  margin-top: 50px; 
  margin-right: 80px;
    
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
  margin-top: 50px;
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
