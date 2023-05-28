<template> 
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <!--<p>
      <strong>Token:</strong>
      {{token}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>-->
    <p class="mail">
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <span class="roles">
      <strong>Authorities:</strong>
      <ul class="role-list">
        <li v-for="role in currentUser.roles" :key="role">
          <font-awesome-icon 
          :icon="['fas', 'star']"
          class="liste"/>
          {{role}} 
          </li>
      </ul>
    </span>
  </div>
</template>

<script>
  import{library} from '@fortawesome/fontawesome-svg-core'
  import { fas} from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add(fas)

  export default {
    name: 'ProfileView',

    components:{
      FontAwesomeIcon
    },
    computed: {
      currentUser() {
        return JSON.parse(localStorage.getItem("userInfo"));
      },
      token() {
        return localStorage.getItem("token");
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 40%;
  width: 400px;
  padding: 40px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0,0,0,.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.jumbotron{
  background: none;
  color: white;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.mail{
  color: white;
}

.roles{
  color: white;
}

.liste{
  color: #cf8665ff ;
}

ul.role-list {
  list-style-type: none; 
  padding-left: 0;
}

</style>