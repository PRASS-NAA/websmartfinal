
import { defineStore } from 'pinia'
import axios from 'axios'

export const useServiceStore = defineStore('service', {
  state: () => ({
    services: []
  }),

  actions: {
    async fetchAllServices() {
      try {
        const res = await axios.get('http://localhost:3333/services')
        this.services = res.data.data
      } catch (err) {
        console.error('Failed to fetch services:', err)
      }
    },

    async addService(payload) {
      try {
        const res = await axios.post('http://localhost:3333/services', payload)
        this.services.push(res.data.data) 
        window.alert("succesfully added new service")
      } catch (err) {
        console.error('Failed to add service:', err)
      }
    }
  }
})
