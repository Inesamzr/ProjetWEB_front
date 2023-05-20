import { createStore } from "vuex";

const token = localStorage.getItem('token');
const userString = localStorage.getItem('userInfo');

const user = (userString == ''? null : JSON.parse(userString));


export default createStore({
    state:{
        token: token,
        user : user,
    },
    getters: {
        getToken(state){
            return state.token;
        },
        getUser(state){
            return state.user;
        }
    },
    mutations: {
        CHANGE_TOKEN(state,payload){
            state.token = payload;
        },
        CHANGE_USER(state,payload){
            state.user = payload;
        }
    }
})
