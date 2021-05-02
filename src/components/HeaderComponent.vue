<template>
  <div class="headerComponent">
    <!-- HEADER -->
    <header>
      <div class="container">
        <!-- Logo + Menu -->
        <div
          class="nav row rounded-top align-items-strech justify-content-between"
        >
          <!-- Logotipo -->
          <div
            class="col-md-12 col-lg logo d-flex align-items-center justify-content-center justify-content-lg-start"
          >
            <router-link to="/home"
              ><img src="../assets/img/logo.png" alt=""
            /></router-link>
            <p class="text-light ms-3">Smart News</p>
          </div>

          <!-- Menu -->
          <nav
            class="col-md-12 col-lg-auto menu d-flex align-items-stretch flex-wrap flex-sm-nowrap justify-content-center"
          >
            <a href="#" class="c-1 d-flex align-items-center">
              <div class="d-flex flex-column text-center">
                <router-link to="/home"
                  ><img data-testid="newButton" src="../assets/img/new2.png" alt=""
                /></router-link>
              </div>
            </a>
            <a href="#" class="c-2 d-flex align-items-center">
              <div class="d-flex flex-column text-center">
                <router-link
                  v-if="Vue3GoogleOauth.isAuthorized"
                  to="/recommendations"
                >
                  <img data-testid="recommendationButton" src="../assets/img/quality2.png" alt="" />
                </router-link>
              </div>
            </a>
            <a href="#" class="c-3 d-flex align-items-center">
              <div class="d-flex flex-column text-center">
                <router-link v-if="Vue3GoogleOauth.isAuthorized" to="/rated"
                  ><img data-testid="ratedButton" src="../assets/img/rating3.png" alt="" />
                </router-link>
              </div>
            </a>

             <a href="#" class="c-3 d-flex align-items-center">
              <div class="d-flex flex-column text-center">
                <div v-if="!Vue3GoogleOauth.isAuthorized">
                  <button data-testid="header-component-login-button"
                    class="btn-sm btn-outline-dark"
                    role="button"
                    style="text-transform: none"
                    @click="handleClickSignIn"
                  >
                    <img
                      class="googleButton"
                      alt="Google sign-in"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    />
                    Login
                  </button>
                </div>

                <div v-if="Vue3GoogleOauth.isAuthorized">
                  <button data-testid="header-component-logout-button"
                    class="btn-sm btn-outline-secondary"
                    role="button"
                    style="text-transform: none"
                    @click="handleClickSignOut"
                  >
                    <img
                      class="googleButton"
                      alt="Google sign-in"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                    />
                    Log out
                  </button>
                </div>
              </div>
            </a>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import AxiosService from "../AxiosService";

export default {
  name: "HeaderComponent",
  data() {
    return {
      user: null,
      authorized: localStorage.getItem("authorized"),
    };
  },
  methods: {
    async handleClickSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        localStorage.setItem("googleIdToken", googleUser.getAuthResponse().id_token);
        this.user = googleUser.getBasicProfile().getEmail();
        AxiosService.login(googleUser.getAuthResponse().id_token);
        this.$router.push(this.$router.currentRoute);
      } catch (error) {
        //on fail do something
        console.log(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        localStorage.removeItem("googleIdToken");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authorized");
        this.authorized = null;
        await this.$gAuth.signOut();
        this.user = null;
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
      }
    },
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