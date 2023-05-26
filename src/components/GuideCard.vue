<template> 
  <div class="guide">
    <h1>{{ guide.title }}</h1>
    <h2>Jeu: {{guide.game.name}}</h2>
    <h2>Categories: <span v-for="(category, index) in guide.category" :key="category._id">{{ category.name }}<span v-if="index !== guide.category.length - 1">, </span></span></h2> 
    <h2>Plateforme(s): <span v-for="(platform, index) in guide.game.platforms" :key="platform._id">{{ platform.name }}<span v-if="index !== guide.game.platforms.length - 1">, </span></span></h2>
    <h3>Objectif(s): {{ guide.objective }}</h3>
    <div class="content">{{ guide.content }}</div>
    <p>Author: {{ guide.author.username }}</p>
    <p>Created at: {{ guide.created_at }}</p>
 
    <!--<router-link :to="`/guides/${guide._id}`">-->
      <button @click = "guidedet" >View more</button>
    
  </div>
</template>

<script> 
export default {
  name: "GuideCard",
  props: {
    guide: {
      type: Object,
      required: true
    }
  },
  methods:{
    guidedet(){
      this.$router.push(`/guides/${this.guide._id}`)
    }
  }
};
</script>

<style scoped>

.guide {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

button{
  position: absolute;
}
</style>
