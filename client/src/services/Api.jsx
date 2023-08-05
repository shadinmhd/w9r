import axios from "axios"
import cookies from "js-cookie"

const Api = axios.create(({baseURL : "http://localhost:8000"}))

Api.interceptors.request.use((req) => {
    if(cookies.get("token")){
        req.headers.Authorization = cookies.get("token")
    }
    return req
})

export default Api