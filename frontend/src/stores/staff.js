import { defineStore } from 'pinia'

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
        const res = await fetch('/api/staff/appointments') // Dummy URL
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        this.appointments = data
      } catch (err) {
        this.error = err.message || 'Error'
      } finally {
        this.loading = false
      }
    },

    async updateStatus(id, newStatus) {
      // Simulate status update — Replace with real PUT/PATCH call
      const appointment = this.appointments.find(a => a.id === id)
      if (appointment) {
        appointment.status = newStatus
      }

      // Optionally call backend to update status
      // await fetch(`/api/appointments/${id}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // })
    }
  }
})
