import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGNhOTgyMzA3NjQ0NTI4YzY1NmY2NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Nzk4NjM0MCwiZXhwIjoxNjg4MDcyNzQwfQ.z4y7lztU68TYG8bgBfOsiKUhe_8ibjgI071dR-xg-c8"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token: `Bearer ${TOKEN}`}
})