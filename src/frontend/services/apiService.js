import axios from 'axios';

export default class apiClient {
    constructor() {
        this.apiUrl = 'http://localhost:8080/api';
        this.client = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.client.interceptors.response.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config
        });
    }

    async post(endpoint, data) {
        try {
            const res = await this.client.post(`/${endpoint}`, data);
            return res.data;
        } catch (error) {
            return { error: error.response?.data?.error || error.message };
        }
    }

    async get(endpoint) {
        try {
            const res = await this.client.get(`/${endpoint}`);
            return res.data
        } catch (error) {
            return { error: error.response?.data?.error || error.message };
        }
    }
}
