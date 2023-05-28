<template>
<div>
  <div class="text-wrapper">
    <div class="text-overlay">
        <h1 class="text-with-shadow">ALESIO</h1>
        <p class="text-with-shadow">Welcome to Alesio, your ultimate destination for gaming enthusiasts. Explore our vast collection of detailed guides and exclusive resources that will help you master your favorite games. Whether you're a casual player seeking tips or a dedicated competitor looking for advanced strategies, we have everything you need.</p>

        <p class="text-with-shadow">Discover our advanced sorting system that allows you to filter guides by platform, specific games, guide categories, and even game categories. Quickly find relevant information that will assist you in progressing through your virtual adventures. Additionally, our vibrant community enables you to share your own guides, tips, and discoveries, providing you with the opportunity to contribute and be part of a passionate community.</p>

        <p class="text-with-shadow"> Join us now and immerse yourself in a world of video games where learning and discovery are at your fingertips. Get ready to elevate your gaming skills and embark on unforgettable experiences. Whether you're a novice or a seasoned gamer, Alesio is here to accompany you on your gaming journey.
        </p>
    </div>
  </div>
    <div class="fleche">
      <button class="cta">
        <span class="hover-underline-animation" @click="start"> Start now </span>
        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
            <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
        </svg>
      </button>
    </div>
  </div> 
</template>

<script>
//import UserService from "../services/user.service";

export default {
  name: "HomeView",
  data() {
    return {
      content: "",
    };
  },
  methods:{
    start(){
      this.$router.push("/guides");
    }
  }
};
</script>


<style scoped>

.text-with-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    /* Ajustez les valeurs ci-dessus selon vos préférences */
  }

.text-wrapper {
    position: relative;
    margin-top: 200px;
    color: white;
    text-align: left;
    
  }
  .text-overlay {
   
    color: white;
  }

.fleche{
  margin-top: 250px;
  margin-left: 900px;
}

.cta {
  border: none;
  background: none;
}

.cta span {
  padding-bottom: 7px;
  letter-spacing: 4px;
  font-size: 14px;
  padding-right: 15px;
  text-transform: uppercase;
}

.cta svg {
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active svg {
  transform: scale(0.9);
}

.hover-underline-animation {
  position: relative;
  color: white;
  padding-bottom: 20px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>