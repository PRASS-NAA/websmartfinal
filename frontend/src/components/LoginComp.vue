<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '../stores/user'  // your Pinia store
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const passtype = ref('password')

const errors = reactive({
  email: [],
  password: [],
  api: ''
})

const togglePassType = () => {
  passtype.value = passtype.value === 'password' ? 'text' : 'password'
}

const resetErrors = () => {
  errors.email = []
  errors.password = []
  errors.api = ''
}

const validateInput = () => {
  if (!email.value.trim()) {
    errors.email.push('Email is required')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errors.email.push('Invalid email format')
  }

  if (!password.value.trim()) {
    errors.password.push('Password must not be empty')
  } else {
    if (password.value.length < 5) {
      errors.password.push('Password must be at least 5 characters')
    }

    const hasDigit = /\d/.test(password.value)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)

    if (!hasDigit || !hasSpecial) {
      errors.password.push('Password must include at least 1 digit and 1 special character')
    }
  }
}

const checkError = () => {
  return errors.email.length === 0 && errors.password.length === 0
}

const userLogin = async () => {
  resetErrors()
  validateInput()

  if (!checkError()) return

  try {
    await userStore.login({
      email: email.value,
      password: password.value
    })

     const token = localStorage.getItem('token')
    if (!token) {
      errors.api = 'Token not found'
      return
    }

    let decoded
    try {
      decoded = jwtDecode(token)
    } catch (err) {
      errors.api = 'Invalid token'
      return
    }

    // Optional: set role globally
    userStore.setRole(decoded.role)

    // Navigate based on role
    if (decoded.role === 'staff') {
      router.push('/staff')
    } else if(decoded.role === 'customer'){
      router.push('/dashboard')
    }else{
      router.push('/admin')
    }
  } catch (err) {
    errors.api = err?.response?.data?.message || 'Login failed!'
  }
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="userLogin">
    <div>
      <label>Email</label>
      <input type="email" v-model="email" required />
      <p v-for="error in errors.email" :key="error" style="color:red">{{ error }}</p>
    </div>

    <div>
      <label>Password</label>
      <input :type="passtype" v-model="password" required />
      <button type="button" @click="togglePassType">See Password</button>
      <p v-for="error in errors.password" :key="error" style="color:red">{{ error }}</p>
    </div>

    <p v-if="errors.api" style="color: red">{{ errors.api }}</p>

    <div>
      <button type="submit">Login Now</button>
    </div>
  </form>
</template>

<style scoped>
input {
  margin-bottom: 5px;
  display: block;
}
</style>
