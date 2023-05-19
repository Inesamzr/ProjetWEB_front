<template> 
  <div class="guide">
    <h1>{{ guide.title }}</h1>
    <h2>Jeu: {{guide.game.name}}</h2>
    <h2>Categories: <span v-for="(category, index) in guide.category" :key="category._id">{{ category.name }}<span v-if="index !== guide.category.length - 1">, </span></span></h2> 
    <h3>Objectif(s): {{ guide.objective }}</h3>
    <div class="content">{{ guide.content }}</div>
    <p>Author: {{ guide.author.username }}</p>
    <p>Created at: {{ guide.created_at }}</p>
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
  }
};
</script>

<style>
.guide {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
