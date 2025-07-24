<script setup>
import { useUserAppointments } from '../stores/userAppointments'
import { onMounted } from 'vue'
import AppointmentCard from './AppointmentCard.vue'

const store = useUserAppointments()

onMounted(() => {
  store.fetchAppointments()
})
</script>

<template>
  <h1>Hello Pras</h1>
  <h3>Your services</h3>

  <div v-if="store.loading">Loading...</div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <div v-else>
    <div v-for="appointment in store.appointments" :key="appointment.id">
      <AppointmentCard :appointment="appointment" />
    </div>
  </div>
</template>

<style scoped>
</style>
