<script setup>
import { onMounted } from 'vue'
import { useGarageAppointments } from '@/stores/garageAppointments'
import GarageAppCard from './GarageAppCard.vue'

const store = useGarageAppointments()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <h1>Garage Staff Dashboard</h1>

  <div v-if="store.loading">Loading...</div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <div v-else>
    <div v-for="appointment in store.appointments" :key="appointment.id">
      <GarageAppCard :appointment="appointment" />
    </div>
  </div>
</template>

<style scoped>
</style>
