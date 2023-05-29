<template>
  <div id="app">
    <div class="background-image"></div>

    

    <NavBar />

    <div class="container">

      <div class="logo-container">
        <img src="./image/logo2.png" alt="Logo">
      </div>
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
}
</script>

<style>

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

/*.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(./image/essai13.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 1;
  background-attachment: fixed;
}*/

.background-image{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(./image/essai15.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 1;
  z-index: 0;
  background-attachment: fixed;
}

.logo-container img {
  width: 40%; 
  height: auto; 
  position: absolute;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);
  
}


h1, h2, h3, h4{
  font-family: 'Courier New', Courier, monospace;
}

</style>