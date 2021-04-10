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
          <a target="_blank" :href="contribution.link">{{ contribution.source }}</a></small
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

    <div class="row py-3">
      <div class="col">
        <p v-html="contribution.description"></p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p><strong>Valoración</strong></p>
        <star-rating v-model="rating" @update:rating="setRating"></star-rating>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Global from "../Global";
import StarRating from "vue-star-rating";

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
    };
  },

  methods: {
    getContribution(contributionId) {
      axios
        .get(this.url + "/contributions?id=" + contributionId)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.contribution = res.data;
          }
        });
    },
    setRating(rating) {
      this.rating = rating
      console.log("Rating: " + this.rating)
      // TODO: Axios call to POST/PUT rating (if vote was null, then POST, otherwise PUT)
      console.log(this.$gAuth.instance.currentUser.fe.Aa)
      console.log(this.$gAuth)
      if (this.$gAuth.instance.isSignedIn.fe) {
      axios.post(this.url + "/contributions?id=" + this.contribution.id, this.rating)
        .then(res => {
          if (res.status == 200) {
            console.log("VOTED!!!!!")
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
  },
};
</script>