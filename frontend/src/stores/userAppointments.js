import { defineStore } from 'pinia'

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

      try {
        
        const response = await fetch('/api/user/appointments')
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        this.appointments = data
      } catch (err) {
        this.error = err.message || 'Unknown error'
      } finally {
        this.loading = false
      }
    }
  }
})
