import axios from 'axios'

let baseURL = 'http://localhost:8081'
let baseURLApi = baseURL + '/api'

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(function(config) {
    let authToken = localStorage.getItem("authToken")
    if (authToken) {
        config.headers.common = {
            "Authorization": authToken
        }
    }

    return config;
}, function (err) {
    return Promise.reject(err)
});
 
apiClient.interceptors.response.use(function(config) {
    return config;
}, function(err) {
    let googleIdToken = localStorage.getItem("googleIdToken")
    let authToken = localStorage.getItem("authToken")
    if (googleIdToken && !authToken) {
        let headers = {
            'Content-Type': 'application/json',
            'X-ID-TOKEN': googleIdToken
        };
        axios.post(baseURL + "/login", "", {'headers': headers})
            .then((res) => {
                if (res.status == 200) {
                    localStorage.setItem("authToken", res.headers.authorization)
                    err.config.headers = {
                        'Content-Type': 'application/json',
                        "Authorization": res.headers.authorization
                    }
                    return axios.request(err.config)
                }
        }).catch(error => {
            console.log(error)
          });
    }
    return Promise.reject(err);
});

export default {
    getLatestNews(pageNumber, path) {
        var apiPath = "/latest"
        if (path === "/rated" || path === "/recommendations") {
            apiPath = path;
        }
        return apiClient.get(baseURLApi + apiPath + '?page=' + pageNumber)
    },
    getNewsDetail(contributionId) {
        return apiClient.get(baseURLApi + '/contributions?id=' + contributionId)
    },
    postRating(contributionId, rating) {
        return apiClient.post(baseURLApi + '/contributions?id=' + contributionId, rating)
    },
    login(googleIdToken) {
        let headers = {
            'X-ID-TOKEN': googleIdToken
        }
        return apiClient.post(baseURLApi + '/login', {'headers': headers})
    }
}