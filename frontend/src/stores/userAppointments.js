import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user' 

export const useUserAppointments = defineStore('userAppointments', {
  state: () => ({
    appointments: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAppointments() {
      this.loading = true
      this.error = null

      const userStore = useUserStore()
      const email = userStore.user?.email
      const token = userStore.token

      if (!email) {
        this.error = 'User email not available'
        this.loading = false
        return
      }

      try {
        const response = await axios.get(`http://localhost:3333/appointments/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.appointments = response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error'
      } finally {
        this.loading = false
      }
    }
  }
})
