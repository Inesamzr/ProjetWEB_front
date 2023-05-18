<template>
    <div>
        <InputRecherche />
        
        <button @click="add"> 
          <font-awesome-icon 
            :icon="['fas', 'plus']" 
            class="fa-primary" />
          add
        </button>

        <GuideList />
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import GuideList from './GuideList.vue';
import InputRecherche from './InputRecherche.vue'; 
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus)

export default {
  name: 'RechercheView',

  components: {
    GuideList,
    InputRecherche,
    FontAwesomeIcon
  },
  methods:{
    add(){
      this.$router.push("/guides/createguide")
    }
  }
};
</script>

<style scoped>
button{
  margin-left: 200px;
  position: absolute;
}
</style>


