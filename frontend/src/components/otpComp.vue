<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const otp = ref('')
const error = ref('')
const userStore = useUserStore()
const router = useRouter()

const verifyNow = async () => {
  error.value = ''

  if (!otp.value.trim()) {
    error.value = 'OTP is required'
    return
  }

  try {
    await userStore.verifyOtp({
      ...userStore.pendingSignup,
      otp: otp.value
    })

    alert('Signup successful!')
    router.push('/')
  } catch (err) {
    router.push('/signup')
    window.alert('OTP VERIFICATION FAILED')
  }
}
</script>

<template>
  <h1>Verify OTP</h1>
  <div>
    <label>Enter OTP</label>
    <input v-model="otp" type="text" />
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>

  <button @click="verifyNow">Verify Now</button>
</template>

<style scoped>
input {
  margin-bottom: 10px;
  display: block;
}
</style>
