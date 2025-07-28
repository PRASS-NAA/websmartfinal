<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGarageAppointments } from '../stores/staff'
import GarageAppCard from './GarageAppCard.vue'

const store = useGarageAppointments()
const statusFilter = ref('') 


onMounted(() => {
  store.fetchAll()
})


watch(statusFilter, (newStatus) => {
  store.fetchAll(newStatus)
})
</script>

<template>
  <h1>Garage Staff Dashboard</h1>
  <select id="status-select" v-model="statusFilter">
    <option value="">All</option>
    <option value="pending">Pending</option>
    <option value="finished">Finished</option>
  </select>
  <div v-if="store.loading">Loading...</div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <div v-else>
    <div v-for="appointment in store.appointments" :key="appointment.id">
      <GarageAppCard :appointment="appointment" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
  color: whitesmoke;
}

#status-select {
  display: block;
  margin: 10px auto;
  padding: 5px;
  width: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

div {
  text-align: center;
  font-family: Arial, sans-serif;
  margin-top: 10px;
}

.GarageAppCard {
  margin: 10px auto;
  max-width: 500px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
}

</style>
