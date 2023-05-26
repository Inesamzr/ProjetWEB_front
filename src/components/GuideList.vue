<template>
    <div class="guide-list"> 
        <h1>Guides</h1>
        <ul >
            <li v-for="guide in guides" :key="guide._id">
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
      platformName:'',
      selectedGuideCategory: '',
      selectedGameCategory: '',
    };
  },

  mounted() {
    let plat = this.$route.params;
    console.log(plat)
    //this.platformName = (plat == undefined)? '': plat.platform ; 
    //this.platformName = plat?.platform ?? '';
    this.platformName = plat && plat.platform ? plat.platform : '';
    console.log(this.platformName); 
    this.fetchGuides();
  },
  
  computed: { 
    filteredGuides() {
      //var filteredGuides = this.guides;

      if (this.platformName && this.platformName !== 'All') {
        console.log('filtre plateforme')
        return this.guides.filter(guide => {
          return guide.game.platforms.includes(this.platformName); 
        });
      }

      if (this.selectedGuideCategory) {
        console.log('filtre guide catégorie')
        return this.guides.filter((guide) => {
          return guide.category.includes(this.selectedGuideCategory);
        });
      }

      if (this.selectedGameCategory) {
        console.log('filtre jeu catégorie')
        return this.guides.filter((guide) => {
          return guide.game.category.includes(this.selectedGameCategory);
        });
      }

      if (this.searchTerm && this.searchTerm.length > 0) {
        console.log('filtre recherche')
        return this.guides.filter(guide => {
        return (guide.title ?? '').toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      } else{
        console.log('résultat')
        return this.guides
      }
      //console.log(filteredGuides);
      //return filteredGuides;
    },
  },

  methods: {
    fetchGuides() {

      console.log(this.platformName)

      var url = apiUrl+'/guides';

      if(this.platformName != ''){
        url = url + '/plateforme/' + this.platformName;
      }

      

      axios
        .get(url)
        .then(response => {
          if(response.data){
            console.log(response.data)
            this.guides = response.data;
          }
          
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
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
