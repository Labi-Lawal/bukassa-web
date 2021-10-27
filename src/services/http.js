import axios from "axios";

const api_URL = process.env.VUE_APP_API_BASE_URL;

const http = axios.create({ baseURL: api_URL });

const httpSec = axios.create({ 
    baseURL: api_URL, 
    headers: {
        'x-access-token':`Bearer ${localStorage.getItem("access-token")}`
    } 
});

let net;

export default net = { http, httpSec };