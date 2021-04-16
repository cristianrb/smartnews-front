import axios from 'axios'

//let baseURL = "http://localhost:8081"
let baseURL = 'https://smart-news-fib.herokuapp.com'
let baseURLApi = baseURL + '/api'

const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(function (config) {
    if (config.url.includes("/login")) return config;
    
    let authToken = localStorage.getItem("authToken")
    let googleIdToken = localStorage.getItem("googleIdToken")
    if (authToken) {
        config.headers.common = {
            "Authorization": authToken
        }
    } else {
        if (googleIdToken && !authToken) {
            let headers = {
                'Content-Type': 'application/json',
                'X-ID-TOKEN': googleIdToken
            };
            axios.post(baseURL + "/login", "", { 'headers': headers })
                .then((res) => {
                    if (res.status == 200) {
                        localStorage.setItem("authToken", res.headers.authorization)
                        localStorage.setItem("authorized", true)
                        console.log("Authorized: " + localStorage.getItem("authorized"))
                        config.headers.common = {
                            'Content-Type': 'application/json',
                            "Authorization": res.headers.authorization
                        }
                    }
                }).catch(error => {
                    console.log(error)
                });
        }
    }
    console.log(config)
    return config;
}, function (err) {
    return Promise.reject(err.response)
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
        return apiClient.post(baseURL + '/login', "", { 'headers': headers })
            .then((res) => {
                if (res.status == 200) {
                    localStorage.setItem("authToken", res.headers.authorization)
                    localStorage.setItem("authorized", true)
                }
            }).catch(error => {
                console.log(error)
            });
    }
}