import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    token: null,
    user: null,
    role: null,
    pendingSignup: null
  }),

  actions: {
    async login(payload) {
      const res = await axios.post('http://localhost:3333/users/login', payload)
      this.token = res.data.token

      // Decode token to get role
      const decoded = JSON.parse(atob(this.token.split('.')[1]))
      this.role = decoded.role

      this.user = { email: payload.email }
      localStorage.setItem('token', this.token)
    },

    setRole(role) {
      this.role = role
    },

    async signup(payload) {
      const res = await axios.post('http://localhost:3333/users/send-otp', payload)
      this.pendingSignup = {
        ...payload,
        generatedOtp: res.data.otp // remove in prod
      }
    },

    async verifyOtp(payload) {
      const res = await axios.post('http://localhost:3333/users/verify-otp', payload)

      if (!res.data.success) {
        throw new Error('OTP verification failed')
      }

      this.user = res.data.user
      this.token = null
      this.pendingSignup = null
      localStorage.removeItem('token')
    },

    async fetchAllUsers() {
      try {
        const res = await axios.get('http://localhost:3333/users', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.users = res.data.users
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }
  }
})
