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
import axios from "axios";
import Global from "../Global";
import News from "./News.vue";
export default {
  name: "LatestNews",
  components: {
      News
  },
  beforeMount() {
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
    };
  },
  methods: {
    getInitialNews() {
      let headers = {
              'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDc0OTUyNDQ1NjQ5NTc5NTQ2NzUiLCJleHAiOjU3NzUwNjk0Mjk1fQ._hYcrnkxSps4fpYM2hSNOevOTo7iaSnw5YT4QUe8aCjA2oJ5GBIEZOkyxaugX6_ln_1mVaA6tw6xgW-Jlei76g',
              'Content-Type': 'application/json'
            };
      axios.get(Global.url + "/latest", {'headers': headers}).then((res) => {
        console.log(res);
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

            let headers = {
              'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDc0OTUyNDQ1NjQ5NTc5NTQ2NzUiLCJleHAiOjU3NzUwNjk0Mjk1fQ._hYcrnkxSps4fpYM2hSNOevOTo7iaSnw5YT4QUe8aCjA2oJ5GBIEZOkyxaugX6_ln_1mVaA6tw6xgW-Jlei76g',
              'Content-Type': 'application/json;charset=utf-8'
            };
            console.log(headers)  
            axios
              .get(Global.url + "/latest?page=" + this.pageNumber, {'headers': headers})
              .then((res) => {
                this.pageNumber++;
                console.log(res);
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
    }
  },
};
</script>