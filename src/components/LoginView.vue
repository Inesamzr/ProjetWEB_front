<template>
  <div class="col-md-12 login-box">
    <div class="login-box-content">
      <!--<img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      /> -->
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="user-box">
          
          <Field name="username" type="text" class="form-control" placeholder="Username" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="user-box">

          <Field name="password" type="password" class="form-control" placeholder="Password" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button id="submit-button" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import AuthService from'../services/auth.service'
import store from'@/store/store';



export default {
  name: "LoginView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return store.getters.getUser;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;
      AuthService.login(user)
      .then(() => {
        this.loading = false;
        this.$router.push('/home');
      })
      .catch(error => {
        console.log(error)
        this.loading = false;
        this.message = 
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      });
    },
  },
};
</script>


<style scoped>
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  margin: 20px auto;
  transform: translate(-50%, -55%);
  background: rgba(0,0,0,.9);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box p:first-child {
  margin: 0 0 30px;
  padding: 0;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #cf8665ff;
  outline: none;
  background: transparent;
}


.login-box .user-box input.form-control {
  color: white ;
}

.login-box .user-box input.form-control {
  box-shadow: none ;
}


.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.login-box-content{
  color: white;
}

#submit-button{
  padding: 1.3em 3em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #cf8665ff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-left: 90px;
}

#submit-button:hover{
  background-color:#cf8665ff;
  box-shadow: 0px 5px 10px rgb(150, 97, 72);
  color: #fff;
  transform: translateY(-7px);
}

</style>