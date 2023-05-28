<template>
  <div class="guide" >
    <div class="text">
      <h1 class="jumbotronGuideTitre">{{ truncateText(guide.title,10) }}</h1>
      <h2 class="jumbotronGuideJeu"><b>Jeu:</b> {{ guide.game.name }}</h2>
      <h2 class="jumbotronGuideCat"><b>Categorie(s): </b>
        <span v-for="(category, index) in guide.category" :key="category._id" >
          {{ truncateText(category.name, 20) }}
          <span v-if="index !== guide.category.length - 1">, </span>
        </span>
      </h2>
      <h2 class="jumbotronGuidePlat"><b>Plateforme(s): </b> 
        <span v-for="(platform, index) in guide.game.platforms" :key="platform._id">
          {{ platform.name }}
          <span v-if="index !== guide.game.platforms.length - 1">, </span>
        </span>
      </h2>
      <h3 class="jumbotronGuideObj"><b>Objectif: </b> {{ truncateText(guide.objective,20) }}</h3>
      
      <p class="jumbotronGuideAuthor"><b>Author: </b> {{ guide.author.username }}</p>
      
      <button class="viewMoreButton" @click="guidedet">View more</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideCard",
  props: {
    guide: {
      type: Object,
      required: true
    },
  },
  methods: {
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        const truncatedText = text.substring(0, maxLength);
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
          return truncatedText.substring(0, lastSpaceIndex) + '...';
        } else {
          return truncatedText + '...';
        }
      }
    },

    guidedet() {
      this.$router.push(`/guides/${this.guide._id}`)
    }
  }
};
</script>

<style scoped>

.guide{
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  background: rgba(0,0,0,.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.8);
  border-radius: 10px;
  padding: 40px;
}
.guide .text{
  color: white;
}
.jumbotronGuideTitre {
  font-size: 20px;
  margin-bottom: 10px;
}

.jumbotronGuideJeu{
  font-size: 15px;
}

.jumbotronGuideCat{
  font-size: 15px;
}

.jumbotronGuidePlat{
  font-size: 15px;
}

.jumbotronGuideObj{
  font-size: 15px;
}

.jumbotronGuideAuthor{
  font-size: 15px;
}



.viewMoreButton {
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
  margin-left: 100px;
  
}

.viewMoreButton:hover {
  background-color: #cf8665ff;
  box-shadow: 0px 5px 10px rgb(150, 97, 72);
  color: #fff;
  transform: translateY(-7px);
}
</style>
