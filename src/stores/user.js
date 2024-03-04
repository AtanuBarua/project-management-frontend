import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('token'),
    }),

    actions: {
        setToken(token) {
            localStorage.setItem('token', token)
            this.token = token;
        },
        removeToken() {
            localStorage.removeItem('token')
            this.token = null;
        }
    }
});