import { defineStore } from 'pinia'
import axios from 'axios'

export const useGarageAppointments = defineStore('garageAppointments', {
  state: () => ({
    appointments: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAll(status='') {
      this.loading = true
      this.error = null
      this.appointments = []

      try {
        console.log("status = ", status)
        let url;
        if(status == '')
        {
          url = 'http://localhost:3333/appointments'
        }else{
          url = `http://localhost:3333/appointments/?status=${status}`
        }
        console.log("url", url)
        const token = localStorage.getItem('token');
        const res = await axios.get(url,{
          headers : {Authorization : `Bearer ${token}`}
        })
        console.log("response : ", res.data)
        this.appointments = res.data.data || []
    
        
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Error'
      } finally {
        this.loading = false
      }
    },

    async updateStatus(id, newStatus) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.patch(`http://localhost:3333/appointments/status/${id}`, {
          status: newStatus
        },{
          headers : {Authorization : `Bearer ${token}`}
        })

       window.alert("status updated and email sent to customer !! ")
        this.fetchAll();
      } catch (err) {
        console.error('Failed to update status:', err)
        this.error = err.response?.data?.message || err.message || 'Update failed'
      }
    }
  }
})
