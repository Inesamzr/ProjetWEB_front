<template>
<div>
  <div class="text-wrapper">
    <div class="text-overlay">
        <h1 class="text-with-shadow">ALESIO</h1>
        <p class="text-with-shadow">Bienvenue sur Alesio, votre destination ultime pour les passionnés de jeux vidéo. Explorez notre vaste collection de guides détaillés et de ressources exclusives qui vous aideront à maîtriser vos jeux préférés. Que vous soyez un joueur occasionnel à la recherche de conseils ou un compétiteur dévoué en quête de stratégies avancées, nous avons tout ce dont vous avez besoin.</p>

        <p class="text-with-shadow">Découvrez notre système de tri avancé qui vous permet de filtrer les guides par plateforme, jeux spécifiques, catégories de guides et même catégories de jeux. Trouvez rapidement des informations pertinentes qui vous aideront à progresser dans vos aventures virtuelles. De plus, notre communauté dynamique vous permet de partager vos propres guides, astuces et découvertes, vous offrant ainsi l'opportunité de contribuer et de faire partie d'une communauté passionnée.</p>

        <p class="text-with-shadow">Rejoignez-nous dès maintenant et plongez dans un monde de jeux vidéo où l'apprentissage et la découverte sont à portée de main. Préparez-vous à développer vos compétences de jeu et à vivre des expériences inoubliables. Que vous soyez un novice ou un joueur chevronné, Alesio est là pour vous accompagner dans votre voyage vidéoludique.
        </p>
    </div>
  </div>
    <div class="fleche">
      <button class="cta">
        <span class="hover-underline-animation" @click="start">Explorer</span>
        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
        </svg>
      </button>
    </div>
  </div> 
</template>

<script>
//import UserService from "../services/user.service";

export default {
  name: "HomeView",
  data() {
    return {
      content: "",
    };
  },
  methods:{
    start(){
      this.$router.push("/guides");
    }
  }
};
</script>


<style scoped>

.text-with-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

.text-wrapper {
    position: relative;
    margin-top: 200px;
    color: white;
    text-align: left;
    
  }
  .text-overlay {
   
    color: white;
  }

.fleche{
  margin-top: 250px;
  margin-left: 900px;
}

.cta {
  border: none;
  background: none;
}

.cta span {
  padding-bottom: 7px;
  letter-spacing: 4px;
  font-size: 14px;
  padding-right: 15px;
  text-transform: uppercase;
}

.cta svg {
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active svg {
  transform: scale(0.9);
}

.hover-underline-animation {
  position: relative;
  color: white;
  padding-bottom: 20px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>