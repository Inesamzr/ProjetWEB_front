<template>
  <div id="app">
    <!--<div class="background-image"></div>-->

    <NavBar />


    <div class="container">
      <router-view />
    </div>
   
  </div>
</template>

<script>
import NavBar from "./components/Navbar.vue";


export default {
  name:"App",
  components: {
    NavBar,
   
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    

  },
  
};
</script>

<style scoped>

:root {
  --rouge: #a43f40ff;
  --orange: #cf8665ff;
  
  /*temporaire*/
  --dark-purple: #210124ff;
  --gris: #61707dff;
  --jet: #30323dff;
  --oxford-blue: #0a2342ff;
  --space-cadet: #2d3047ff;

  --plat: #ced6d6ff;
  --noir: #050406ff;
  }
.app {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.container {
  margin-left: 15rem; /* Pour décaler le contenu*/
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(./image/fond_accueil.jpg);
  background-size: cover;
  background-position: center;
  opacity: 0.5; 
  z-index: 1;
  background-attachment: fixed;
}

h1, h2, h3, h4{
  font-family: 'Courier New', Courier, monospace;
}

</style>