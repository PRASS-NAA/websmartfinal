import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    email: null,
    role: null,
    pendingSignup: null
  }),

  actions: {
    async login(payload) {
      const res = await axios.post('http://localhost:3333/users/login', payload)
      this.token = res.data.token
      localStorage.setItem('token', this.token)

      
      const decoded = JSON.parse(atob(this.token.split('.')[1]))
      this.email = decoded.email
      this.role = decoded.role
    },

    logout() {
      this.token = null
      this.email = null
      this.role = null
      localStorage.removeItem('token')
    },

    setRole(role) {
      this.role = role
    },

    async signup(payload) {
      const res = await axios.post('http://localhost:3333/users/send-otp', payload)
      this.pendingSignup = {
        ...payload,
        generatedOtp: res.data.otp 
      }
    },

    async verifyOtp(payload) {
      const res = await axios.post('http://localhost:3333/users/verify-otp', payload)

      if (!res.data.success) {
        throw new Error('OTP verification failed')
      }

      this.token = null
      this.pendingSignup = null
      localStorage.removeItem('token')
    }
  }
})
