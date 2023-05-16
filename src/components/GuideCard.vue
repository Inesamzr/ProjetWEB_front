<template>
  <div class="guide">
    <h1>{{ guide.title }}</h1>
    <h2>Categories: <span v-for="category in guide.category" :key="category._id">{{category.name}},{{" "}}</span></h2>
    <h2>Game: {{ guide.game }}</h2>
    <h3>Objective: {{ guide.objective }}</h3>
    <div>{{ guide.content }}</div>
    <p>Author: {{ guide.author }}</p>
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
