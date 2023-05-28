<template>
  <div class="col-md-12 login-box">
    <div class="login-box-content">
      <!--<img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />-->
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="user-box">
            <Field name="username" type="text" class="form-control" placeholder="Username"/>
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="user-box">
            <Field name="email" type="email" class="form-control" placeholder="Email"/>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="user-box">
            <Field name="password" type="password" class="form-control" placeholder="Password"/>
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button  id="submit-button" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import store from'@/store/store';

import AuthService from "../services/auth.service";


export default {
  name: "RegisterView",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      

      AuthService.register(user)

      .then(() => {
        this.successful = true;
        this.loading = false;
        this.$router.push("/login");
      })
      .catch((error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
      });
    },
  },
};
</script>

<style scoped>
.login-box {
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