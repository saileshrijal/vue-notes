import axiosTokenInstance from '@/services/AxiosTokenInstance'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: {}
    }),

    actions: {
        async getLoggedInUser() {
            try {
                const response = await axiosTokenInstance.get('https://localhost:44385/api/User/LoggedInUser')
                this.user = response.data
            } catch (error) {
                console.log(error)
            }
        }
    }
})

