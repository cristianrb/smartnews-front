<template>
  <div v-if="!contributions.length && (this.$route.path.includes('rated') || this.$route.path.includes('recommendations'))">
    <NotRatedNews></NotRatedNews>
  </div>
  <div
    class="card border-secondary mb-3"
    v-for="contribution in contributions"
    :key="contribution.id"
  >
    <div class="row g-0">
      <div class="col-md-4" v-if="contribution.urlImage">
        <img data-testid="news-image"
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
            <h4 class="text-justify card-title me-2" data-testid="news-title">
              {{ contribution.title }}
            </h4>
          </router-link>
          <div data-testid="news-description" class="card-text text-justify me-2" v-html="contribution.description"></div>
          <router-link data-testid="news-read-more" class="btn btn-primary my-1"
            :to="{ name: 'contribution', params: { id: contribution.id } }"
          >Leer más</router-link>
        </div>
      </div>

      <div class="ps-3 py-2">
        <small class="text-muted" data-testid="news-pubdate"
          >Fecha de publicación: {{ contribution.pubDate }} | Fuente:
          <a data-testid="news-source" target="_blank" :href="contribution.link">{{ contribution.source }}</a></small
        >
      </div>
    </div>
  </div>
</template>

<script>
import Global from "../Global";
import NotRatedNews from "./NotRatedNews.vue";

export default {
  name: "Contributions",
  components: {
    NotRatedNews
  },
  props: ["contributions"],
  data() {
    return {
      url: Global.url,
    };
  },
};
</script>
