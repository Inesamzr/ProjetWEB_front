<template>
    <div class="guide-list"> 
        <h1>Guides</h1>
        <ul >
            <li v-for="guide in filteredGuides" :key="guide._id">
                <GuideCard :guide="guide" />
            </li>
            <li v-if="guides.length === 0"> 
              <p class="message">No guides available.</p>
            </li>
        </ul>
    </div>
</template>

<script>
import GuideCard from './GuideCard.vue';
import axios from 'axios';
import {apiUrl} from '../configs/api.config'

export default {  

  name: 'GuideList',

  components: {
    GuideCard,
  },
 
  data() {
    return {
      guides: [], //liste de tous les guides
      searchTerm: '',
    };
  },
  created() {
    this.fetchGuides();
  },
  computed: { 
    filteredGuides() {
      if (this.searchTerm && this.searchTerm.length > 0) {
        return this.guides.filter(guide => {
          return (guide.title ?? '').toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      } else {
        return this.guides;
      }
    },
  },

  methods: {
    fetchGuides() {
      axios
        .get(apiUrl+'/guides')
        .then(response => {
          console.log(response.data)
          this.guides = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    

  }
};
</script>

<style scoped>

.guide-list {
  margin-top: 20px;
}

.guide-list ul {
  list-style-type: none;
  padding: 0;
}

.guide-list li {
  margin-bottom: 20px;
  
}

.message{
  margin-left: 100px;
}

.h1{
  margin-left: 100px;
}
 
</style>
