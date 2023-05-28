<template>
    <div class="guide-list"> 
        <ul class="guide-list-container">
          
            <li v-for="guide in filteredGuides" :key="guide._id" class="guide-item">
                <GuideCard :guide="guide" />
            </li>
          
            <li v-if="filteredGuides.length === 0"> 
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
  created(){
    this.fetchGuides();
    this.$watch(
      ()=> this.$route.params,
      (newParams,) => {
        // Effectuez les actions souhaitées lorsque les paramètres de route changent
        let plat = newParams
        this.platformName = plat && plat.platform ? plat.platform : '';
        this.fetchGuides();
      }
    )
  },
  
  computed: { 
    filteredGuides() {
      console.log(this.guides)
      //var filteredGuides = this.guides;
      /*if (this.platformName && this.platformName !== 'All') {
        console.log('filtre plateforme')
        return this.guides.filter(guide => {
          return guide.game.platforms.includes(this.platformName); 
        });
      }*/

      if (this.selectedGuideCategory) {
        return this.guides.filter((guide) => {
          return guide.category.some(cat => cat._id == this.selectedGuideCategory);
        });
      }

      if (this.selectedGameCategory) {
        console.log('filtre jeu catégorie')
        console.log(this.selectedGameCategory)
        return this.guides.filter((guide) => {
          return guide.game.category.includes(this.selectedGameCategory);
        });
      }

      if (this.searchTerm && this.searchTerm.length > 0) {
        console.log(this.searchTerm)
        console.log('filtre recherche')
        console.log(this.guides.length)
        let x = this.guides.filter(guide => {
          
          return (guide.title ?? '').toLowerCase().includes(this.searchTerm.toLowerCase());
        });
        console.log(this.guides.length)
        console.log(x)
        return x
      } else{
        console.log('résultat')
        return this.guides
      }
      //console.log(filteredGuides);
      //return filteredGuides;
    }
  },

  methods: {
    fetchGuides() {
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

<style >

.guide-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
  position: relative;
  
}

.guide-list li {
  width: 33.33% ;
  margin-bottom: 20px;
  display:flex;
  
}

.message {
  margin-left: 100px;
}

.h1 {
  margin-left: 100px;
}
 
</style>
