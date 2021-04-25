<template>
  <div class="NewsDetail container p-3" v-if="contribution">
    <div class="row">
      <div class="col">
        <h2>{{ contribution.title }}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <small class="text-muted"
          >Fecha de publicación: {{ contribution.pubDate }} | Creado por:
          {{ contribution.creator }}</small
        >
      </div>
    </div>

    <div class="row">
      <div class="col">
        <small class="text-muted"
          >Fuente:
          <a target="_blank" :href="contribution.link">{{
            contribution.source
          }}</a></small
        >
      </div>
    </div>

    <div class="row">
      <div class="col">
        <img
          v-if="contribution.urlImage"
          class="imgDetail py-3"
          :src="contribution.urlImage"
          alt="Card image"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <img
          v-if="!contribution.urlImage"
          class="imgDetail py-3"
          src="../assets/img/defaultImage.jpg"
          alt="Card image"
        />
      </div>
    </div>

    <div class="row py-3">
      <div class="col">
        <p class="text-justify" v-html="contribution.description"></p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p><strong>Valoración</strong></p>
        <star-rating
          :rating="rating"
          v-model="rating"
          @update:rating="setRating"
        ></star-rating>
      </div>
    </div>
  </div>
</template>

<script>
import AxiosService from "../AxiosService";
import Global from "../Global";
import StarRating from "vue-star-rating";
import swal from "sweetalert";

export default {
  name: "NewsDetail",
  components: {
    StarRating,
  },
  beforeMount() {},
  mounted() {
    var contributionId = this.$route.params.id;
    this.getContribution(contributionId);
  },
  data() {
    return {
      url: Global.url,
      contribution: null,
      rating: 0,
      loggedIn: false,
    };
  },

  methods: {
    getContribution(contributionId) {
      AxiosService.getNewsDetail(contributionId).then((res) => {
        if (res.status == 200) {
          this.contribution = res.data;
          this.rating = this.contribution.vote;
        }
      });
    },
    setRating(rating) {
      this.rating = rating;
      AxiosService.postRating(this.contribution.id, rating)
        .then((res) => {
          if (res.status == 200) {
            swal(
              "Puntuación: " + this.rating,
              "Puntuación añadida correctamente! :)",
              "success"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.status == 401) {
            swal(
              "Puntuación no registrada",
              "Debes iniciar sesión para poder puntuar una noticia.",
              "error"
            );
          }
          console.log(error);
        });
    },
  },
};
</script>