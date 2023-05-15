<template>
  <div class="guide">
    <h1>{{ guide.title }}</h1>
    <h2>Category: {{ guide.category }}</h2>
    <h2>Game: {{ guide.game }}</h2>
    <h3>Objective: {{ guide.objective }}</h3>
    <div>{{ guide.content }}</div>
    <p>Author: {{ guide.author }}</p>
    <p>Created at: {{ guide.created_at }}</p>
  </div>
</template>

<script>
export default {
  name: "Guide",
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
  margin: 20px;
}
</style>
