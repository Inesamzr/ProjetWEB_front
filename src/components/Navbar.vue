<template>
    <div class="NavBar">
        <nav class="navbar">
            <div class="deplacement">
                <ul class="navbar-nav">

                    <li class="logo">
                        <a href="#" class="nav-link">
                            <span class="link-text logo-text">Alesio</span>
                            <font-awesome-icon
                                :icon="['fas', 'angle-double-right']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        </a>
                    </li>

                    <li class="nav-item">
                        <a @click="hom" class="nav-link">
                            <font-awesome-icon
                                :icon="['fas', 'star']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">Accueil</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a @click="rech" class="nav-link">
                            <font-awesome-icon 
                                :icon="['fas', 'magnifying-glass']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">Rechercher</span>
                        </a>
                    </li>

                    
                
                    <li class="nav-item">
                        <a class="nav-link">
                        <font-awesome-icon
                                :icon="['fas', 'computer']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">PC</span>
                        </a>
                    </li>
                
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <font-awesome-icon
                                :icon="['fas', 'gamepad']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">Console de salon</span>
                        </a>
                    </li>
                
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <font-awesome-icon
                                :icon="['fas', 'mobile-screen-button']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">Mobile</span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            <font-awesome-icon
                                :icon="['fas', 'headphones-simple']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">Console portable</span>
                        </a>
                    </li>
                    
                    <div v-if="!currentUser" class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/register" class="nav-link">
                                <font-awesome-icon icon="user-plus" /> Sign Up
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link">
                                <font-awesome-icon icon="sign-in-alt" /> Login
                            </router-link>
                        </li>
                    </div>

                    <div v-if="currentUser" class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/profile" class="nav-link">
                                <font-awesome-icon icon="user" />
                                {{ currentUser.username }}
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="logOut">
                                <font-awesome-icon icon="sign-out-alt" /> LogOut
                            </a>
                        </li>
                    </div>
                
                    <li class="nav-item" id="themeButton">
                        <a href="#" class="nav-link">
                        <font-awesome-icon
                                :icon="['fas', 'moon']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <font-awesome-icon
                                :icon="['fas', 'sun']"
                                class="fa-primary"
                                class-prefix="fa"
                            />
                        <span class="link-text">Themify</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>        
    </div> 
</template>

<script>
 

    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faUserPlus, faSignInAlt , faAngleDoubleRight, faComputer, faStar, faGamepad, faMobileScreenButton, faHeadphonesSimple, faSun, faMoon, faUser, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    library.add(faAngleDoubleRight)
    library.add(faComputer)
    library.add(faStar)
    library.add(faGamepad)
    library.add(faMobileScreenButton)
    library.add(faHeadphonesSimple)
    library.add(faSun)
    library.add(faMoon)
    library.add(faUser)
    library.add(faUserPlus)
    library.add(faSignInAlt)
    library.add(faMagnifyingGlass);



    export default {
        name: "NavBar",
        // Votre configuration de composant ici
        components: {
            FontAwesomeIcon
        },
        computed:{
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
            log(){
                this.$router.push('/login');
            },
            rech(){
                this.$router.push('/guides');
            },
            hom(){
                this.$router.push('/home');
            },
            logOut() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            },
        }
    };

</script>

<style>
    :root {
        font-size: 16px;
        font-family: 'Open Sans';
        --text-primary: #b6b6b6;
        --text-secondary: #ececec;
        --bg-primary: #23232e;
        --bg-secondary: #141418;
        /*--bg-primary: black;
        --bg-secondary: #ced6d6ff;*/
        --transition-speed: 600ms;
    }

    body::-webkit-scrollbar {
        width: 0.25rem;
    }

    body::-webkit-scrollbar-track {
        background: #1e1e24;
    }

    body::-webkit-scrollbar-thumb {
        background: #a43f40ff;
    }


    body {
        color: white;
        background-color: black;
        margin: 0;
        padding: 0;
    }

    main {
        margin-left: 5rem;
        padding: 1rem;
    }

    .deplacement{
        margin-left: -25px;
        margin-bottom: auto;
        margin-top: -8px;
    }

    .NavBar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        
    }
  
    .navbar {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        background-color: var(--bg-primary);
        transition: width 600ms ease;
      
    }

    .navbar-nav {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-between;
        
    }

    .nav-item {
        width: 100%;
    }

    
    
    .nav-item:last-child {
        margin-top: auto;
    }

    .nav-link {
        display: flex;
        align-items: center;
        height: 5rem;
        color: var(--text-primary);
        text-decoration: none;
        filter: grayscale(100%) opacity(1) brightness(1.9);
        transition: var(--transition-speed);
        margin-left: 0.5rem;
    }

    .nav-link:hover {
        filter: grayscale(0%) opacity(1);
        background: var(--bg-secondary);
        color: var(--text-secondary);
        
        
    }

    .link-text {
        display: none;
        margin-left: 1rem;
    }

    .nav-link svg {
        width: 2rem;
        min-width: 2rem;
        margin: 0 1.5rem;
        
        /*filter: grayscale(100%) opacity(0.7);*/
    
        
    }

    .fa-primary, .fa-secondary {
        color: #a43f40ff;
        font-size: 2em;
    }
    
    /*.fa-secondary {
        color: #a43f40ff;
    }*/
    
    .fa-primary,
    .fa-secondary {
        transition: var(--transition-speed);
    }


    .logo {
        font-weight: bold;
        text-transform: uppercase;
        
        margin-bottom: 1rem;
        text-align: center;
        color: var(--text-secondary);
        background: var(--bg-secondary);
        font-size: 1.5rem;
        letter-spacing: 0.3ch;
        width: 100%;
    }
    
    .logo svg {
        transform: rotate(0deg);
        transition: var(--transition-speed);
        
    }
    
    .logo-text{
        display: none;
        position: absolute;
        
        transition: var(--transition-speed);
    }

    .navbar:hover .logo-text {
        display: inline; 
        left: 20%;
        
        
    }

    .navbar:hover .logo svg {
        transform: rotate(-540deg);
        
        
    }

    /* Small screens */
    @media only screen and (max-width: 600px) {
        .navbar {
            bottom: 0;
            width: 100vw;
            height: 5rem;
        }

        nav
    
        .logo {
        display: none;
        }
    
        .navbar-nav {
        flex-direction: row;
        }
    
        .nav-link {
        justify-content: center;
        }
    
        main {
        margin: 0;
        }
    }
    
    /* Large screens */
    @media only screen and (min-width: 600px) {
        .navbar {
            top: 0;
            width: 5rem;
            height: 100vh;
        }
    
        .navbar:hover {
            width: 14.5rem;
        }
    
        .navbar:hover .link-text {
        display: inline;
        transition: opacity var(--transition-speed);
        }
    
        .navbar:hover .logo svg
        {
        margin-left: 11rem;
        }
    
        .navbar:hover .logo-text
        {
        top: 20px;
        left: 5px;
        }
    }
    
    .dark {
        --text-primary: #b6b6b6;
        --text-secondary: #ececec;
        --bg-primary: #23232e;
        --bg-secondary: #141418;
    }
    
    .light {
        --text-primary: #1f1f1f;
        --text-secondary: #000000;
        --bg-primary: #ffffff;
        --bg-secondary: #e4e4e4;
    }
    
    .solar {
        --text-primary: #576e75;
        --text-secondary: #35535c;
        --bg-primary: #fdf6e3;
        --bg-secondary: #f5e5b8;
    }
    
    .theme-icon {
        display: none;
    }
    
    .dark #darkIcon {
        display: block;
    }
    
    .light #lightIcon {
        display: block;
    }
    
    .solar #solarIcon {
        display: block;
    }
</style>