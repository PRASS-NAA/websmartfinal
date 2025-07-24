import { defineStore } from 'pinia'
import axios from 'axios'

export const useGarageAppointments = defineStore('garageAppointments', {
  state: () => ({
    appointments: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null

      try {
        console.log("hi")
        const res = await axios.get('/appointments')
        this.appointments = res.data
        console.log("hhhhh", this.appointments)
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Error'
      } finally {
        this.loading = false
      }
    },

    async updateStatus(id, newStatus) {
      try {
        const res = await axios.patch(`/appointments/status/${id}`, {
          status: newStatus
        })

       
        const appointment = this.appointments.find(a => a.id === id)
        if (appointment) {
          appointment.status = res.data.status  
        }
      } catch (err) {
        console.error('Failed to update status:', err)
        this.error = err.response?.data?.message || err.message || 'Update failed'
      }
    }
  }
})
