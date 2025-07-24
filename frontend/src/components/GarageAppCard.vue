<script setup>
import { useGarageAppointments } from '../stores/staff'

const props = defineProps(['appointment'])
const store = useGarageAppointments()

const toggleStatus = () => {
  const newStatus = props.appointment.status === 'pending' ? 'finished' : 'pending'
  store.updateStatus(props.appointment.id, newStatus)
}
</script>

<template>
  <div class="card">
    <h3>Appointment ID: {{ appointment.id }}</h3>
    <p>Vehicle ID: {{ appointment.vehicle_id }}</p>
    <p>Service ID: {{ appointment.service_id }}</p>
    <p>Technician ID: {{ appointment.technician_id }}</p>
    <p>Status: <strong>{{ appointment.status }}</strong></p>

    <button @click="toggleStatus">
      Change Status
    </button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}
button {
  padding: 0.4rem 0.8rem;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
