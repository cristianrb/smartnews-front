<template>
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
                <h4 class="card-title"><a href="#">{{contribution.title}}</a></h4>
                <div class="card-text" v-html="contribution.description"></div>
                <a href="#" class="btn btn-primary my-1"
                  >Leer más</a
                >
              </div>
            </div>

            <div class="ps-3 py-2">
              <small class="text-muted"
                >Fecha de publicación: {{ contribution.pubDate }} | Fuente: <a :href=contribution.link>{{contribution.source}}</a></small
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
