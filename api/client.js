import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'http://192.168.1.46:8080/api/v1/quran',
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 6000
})

export default apiClient;
