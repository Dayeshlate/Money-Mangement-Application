import axios from "axios";

const axiosConfig = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type": "application/json",
        Accept:"application/json"
    }
})

//List of endpoint that donot require autherization
const excludeEndpoint = ["/profile/login","/profile/register","/status","/profile/activate","/health"];

//request intercepter

axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoint.some((endpoint) =>{
        config.url?.includes(endpoint)
});

    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `"Bearer" ${accessToken}`;
        }
    }
    return config;
},(error) =>{
    return Promise.reject(error);
})

//response interceptor
axiosConfig.interceptors.response.use((respone)=>{
    return response;
},(error)=>{
    if(error.response){
        if(error.response.status == 401){
            window.location.href ="/profile/login";

        }else if(error.response.status === 500){
            console.log("Server error please try again later");
        }else if(error.code === "ECONNABORTED"){
            console.log("Request timeout please try again");
        }
    }return Promise.reject(error);
})