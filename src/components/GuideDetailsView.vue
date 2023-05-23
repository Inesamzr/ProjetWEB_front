<template>
  <div class="contenu">
    <h1>Guide Details</h1>
    <div v-if="guide">
      <h2>{{ guide.title }}</h2>
      <p>{{ guide.objective }}</p>
      <p>{{ guide.content }}</p>
      <p>Author: {{ guide.author }}</p>
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
    };
  },
  created() {
    this.fetchGuideDetails();
  },
  methods: {
    fetchGuideDetails() {
      const guideId = this.$route.params.id;
      console.log(guideId);

       axios.get(apiUrl+`/guides/${guideId}`)
        .then(response => {
            console.log(response.data)
            this.guide = response.data;
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
}
</style>
