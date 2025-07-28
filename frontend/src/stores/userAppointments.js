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
      const email = userStore.email
      const token = userStore.token

      if (!email) {
        this.error = 'User email not available'
        this.loading = false
        return
      }

      try {
        console.log("im called with email : ", email)
        const response = await axios.get(`http://localhost:3333/appointments/?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.appointments = response.data.data || []
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error'
      } finally {
        this.loading = false
      }
    },

    async bookAppointment(service_id, vehicle_id) {
      const userStore = useUserStore()
      const token = userStore.token

      try {
        const response = await axios.post(
          'http://localhost:3333/appointments',
          { service_id, vehicle_id },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        this.fetchAppointments()
        window.alert("appointment succesfull !! ")
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Unknown error'
      }
    }
  }
})
