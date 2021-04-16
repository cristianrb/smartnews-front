<template>
  <div v-if="!contributions.length && !this.$route.path.includes('home')">
    <h1>Vaya... parece que no hay nada por aquí! Prueba a puntuar unas cuantas noticias primero :)</h1>
  </div>
  <div
    class="card border-secondary mb-3"
    v-for="contribution in contributions"
    :key="contribution.id"
  >
    <div class="row g-0">
      <div class="col-md-4" v-if="contribution.urlImage">
        <img
          class="card-img-top img-fluid p-3"
          :src="contribution.urlImage"
          alt="Card image"
        />
      </div>

      <div class="col-md-4" v-if="!contribution.urlImage">
        <img
          class="card-img-top img-fluid p-3"
          src="../assets/img/defaultImage.jpg"
          alt="Card image"
        />
      </div>

      <div class="col-md-8">
        <div class="card-body">
          <router-link
            :to="{ name: 'contribution', params: { id: contribution.id } }"
          >
            <h4 class="card-title">
              {{ contribution.title }}
            </h4>
          </router-link>
          <div class="card-text" v-html="contribution.description"></div>
          <router-link class="btn btn-primary my-1"
            :to="{ name: 'contribution', params: { id: contribution.id } }"
          >Leer más</router-link>
        </div>
      </div>

      <div class="ps-3 py-2">
        <small class="text-muted"
          >Fecha de publicación: {{ contribution.pubDate }} | Fuente:
          <a target="_blank" :href="contribution.link">{{ contribution.source }}</a></small
        >
      </div>
    </div>
  </div>
</template>

<script>
import Global from "../Global";

export default {
  name: "Contributions",
  props: ["contributions"],
  data() {
    return {
      url: Global.url,
    };
  },
};
</script>
