<template>
    <div>
        <InputRecherche />
        <GuideList />
    </div>
</template>

<script>
import GuideList from './GuideList.vue';
import InputRecherche from './InputRecherche.vue';

export default {
  name: 'RechercheView',

  components: {
    GuideList,
    InputRecherche,
  },
};
</script>


