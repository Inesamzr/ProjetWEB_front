import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./components/HomeView.vue";
import LoginView from "./components/LoginView.vue";
import RegisterView from "./components/RegisterView.vue";
import RechercheView from "./components/RechercheView.vue";
import GuideCreationView from "./components/GuideCreationView.vue";


// lazy-loaded
const ProfileView = () => import("./components/ProfileView.vue")
const BoardAdmin = () => import("./components/BoardAdmin.vue")
const BoardModerator = () => import("./components/BoardModerator.vue")
const BoardUser = () => import("./components/BoardUser.vue")
const GuideDetailsView = () => import("./components/GuideDetailsView.vue")
const GuideEditView = () => import("./components/GuideEditView.vue")
/*const GuideCreationView = () => import("./components/GuideCreationView.vue")*/
/*const GuideList = () => import("./components/GuideList.vue")*/



const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/register",
    component: RegisterView,
  }, 
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: ProfileView,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
  {
    path:"/guides",
    name:"guide",
    component : RechercheView,
  },
  {
    path:"/guides/plateforme/:platform",
    name:"guidePlatform",
    component : RechercheView,
  },
  {
    path:"/guides/createguide",
    name:"createguide",
    component : GuideCreationView,
  },
  {
    path: '/guides/:id',
    name: 'GuideDetails',
    component: GuideDetailsView,
  },
  {
    path:'/guides/:id/edit',
    name:'GuideEdit',
    component: GuideEditView,
  }
  /*{
    path: '/favorites/:id',
    name:'addFavorite',
    component: GuideCreationView,
  }*/
  //{
    //path:'*',
    //name:'error404page',
    // component: pagenotfound
  //}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home','/guides', '/guides/:id' ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('userInfo');
  
   
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router; 