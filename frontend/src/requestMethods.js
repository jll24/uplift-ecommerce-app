import axios from "axios";

const BASE_URL = "https://hi-wrld.herokuapp.com/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTc3OWU3YTMxMGY4ZTI2NGI1NjI2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzczNTY5NywiZXhwIjoxNjM3OTk0ODk3fQ.PDVMV_Z7MAFN2IkkQf-7jxhbbzAfPhDNDbIYAIfOeMA"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token:`Bearer ${TOKEN}`}
    
})