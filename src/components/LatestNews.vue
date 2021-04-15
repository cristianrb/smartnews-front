<template>
  <div class="LatestNews">
    <div class="row row-cols-1 row-cols-md-2 g-4 justify-content-center mt-4">
      <div class="col">
        
          <div id="contributions" v-if="contributions">
              <News :contributions="contributions"></News>
          </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import AxiosService from "../AxiosService"
import News from "./News.vue";
export default {
  name: "LatestNews",
  components: {
      News
  },
  beforeMount() {
    this.setPath(this.$route.path)
    this.getInitialNews();
  },
  mounted() {
    this.getFollowingNews();
  },
  data() {
    return {
      contributions: [],
      pageNumber: 1,
      lock: false,
      path: null
    };
  },
  methods: {
    getInitialNews() {
      AxiosService.getLatestNews(0, this.path)
        .then((res) => {
        this.contributions = this.formatAndReduceDescription(res.data.content);
      });
    },
    getFollowingNews() {
      window.onscroll = () => {
        if (!this.lock) {
          let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight >=
            document.documentElement.offsetHeight;
          if (bottomOfWindow) {
              this.lock = true;

              AxiosService.getLatestNews(this.pageNumber, this.path)
              .then((res) => {
                this.pageNumber++;
                this.formatAndReduceDescription(res.data.content).forEach((element) => {
                  this.contributions.push(element);
                });
                this.lock = false;
              });
          }
        }
      };
    },
    formatAndReduceDescription(contributions) {
        contributions.forEach(function (element, i) {
            if (element.description != null && element.description.length > 450) {
                var description = element.description.substring(0, 450) + " [...] ";
                contributions[i].description = description;
            }
            
        })
        return contributions;
    },
    setPath(path) {
      this.path = path
    }
  },
};
</script>