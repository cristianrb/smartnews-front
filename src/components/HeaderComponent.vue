<template>
  <div class="headerComponent">
    <!-- HEADER -->
    <header class="fixed-top">
      <div class="container">
        <div class="row">
          <!-- COLUMNA DEL LOGOTIPO -->
          <div class="col-8 d-none d-md-block">
            <h1>Smart News</h1>
          </div>

          <!-- COLUMNA DEL MENU DE NAVEGACION DERECHO -->
          <nav
            class="col-12 col-sm-3 col-lg-2 order-1 order-sm-2 menu d-flex justify-content-between ml-auto mb-2 mb-sm-0"
          >
            <router-link to="/home"
              ><img src="../assets/img/new.png" alt=""
            /></router-link>
            <router-link v-if="Vue3GoogleOauth.isAuthorized" to="/recommendations"
              ><img src="../assets/img/quality.png" alt=""
            /></router-link>
            <router-link v-if="Vue3GoogleOauth.isAuthorized" to="/rated"
              ><img src="../assets/img/rating.png" alt=""
            /></router-link>
            <div v-if="!Vue3GoogleOauth.isAuthorized" class="ps-2">
                <button class="btn btn-outline-dark" role="button" style="text-transform:none" 
                    @click="handleClickSignIn">
                    <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    Login with Google
                </button>
            </div>

             <div v-if="Vue3GoogleOauth.isAuthorized" class="ps-2">
                <button class="btn btn-outline-dark" role="button" style="text-transform:none" 
                    @click="handleClickSignOut">
                    <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    Log out
                </button>
             </div>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import AxiosService from "../AxiosService"

export default {
  name: "HeaderComponent",
  data() {
    return {
      user: null,
      authorized: localStorage.getItem("authorized")
    };
  },
  methods: {
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        localStorage.setItem("googleIdToken", googleUser.tc.id_token)
        this.user = googleUser.getBasicProfile().getEmail();
        AxiosService.login(googleUser.tc.id_token)
        this.$router.push(this.$router.currentRoute)
      } catch (error) {
        //on fail do something
        console.log(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        localStorage.removeItem("googleIdToken")
        localStorage.removeItem("authToken")
        localStorage.removeItem("authorized")
        this.authorized = null
        await this.$gAuth.signOut();
        this.user = null;
        this.$router.push({name: "home"})
      } catch (error) {
        console.log(error);
      }
    }
  },
  setup(props) {
    const { isSignIn } = toRefs(props);
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    const handleClickLogin = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
};
</script>