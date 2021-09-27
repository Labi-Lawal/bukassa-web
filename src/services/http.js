import axios from "axios";

const api_URL = process.env.VUE_APP_API_BASE_URL;
const token = localStorage.getItem("access-token");

const http = axios.create({ baseURL: api_URL });
const httpSec = axios.create({ 
    baseURL: api_URL, 
    headers: {
        'Authorization':`Bearer ${token}`
    } 
});

let net;

export default net = { http, httpSec };