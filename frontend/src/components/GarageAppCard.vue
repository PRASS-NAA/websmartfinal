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
    <p>Service Name: {{ appointment.service_name }}</p>
    <p>Technician ID: {{ appointment.technician_id }}</p>
    <p>Status: <strong>{{ appointment.status }}</strong></p>

    <button @click="toggleStatus">
      Change Status
    </button>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px auto;
  width: 300px;
  border-radius: 5px;
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
}

h3 {
  margin-bottom: 10px;
  color: #333;
}

p {
  margin: 5px 0;
  color: #555;
  font-size: larger;
}

strong {
  color: #000;
}

button {
  margin-top: 10px;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>
