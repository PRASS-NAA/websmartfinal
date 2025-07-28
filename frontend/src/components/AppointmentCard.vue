<script setup>
const props = defineProps(['appointment'])
console.log('Props received in child:', props.appointment)
</script>

<template>
  <div>
    <h3>Appointment ID: {{ appointment.id }}</h3>
  </div>
  <div>
    <h6>Service Name: {{ appointment.service_name }}</h6>
    <h6>Vehicle ID: {{ appointment.vehicle_id }}</h6>
    <h6>Technician ID: {{ appointment.technician_id }}</h6>
    <h6>Status: {{ appointment.status }}</h6>
  </div>
</template>

<style scoped>
div {
  border: 1px solid #ccc;
  padding: 12px;
  margin: 10px auto;
  width: 300px;
  border-radius: 6px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

h3 {
  color: #333;
  margin-bottom: 10px;
}

h6 {
  color: #555;
  margin: 4px 0;
  font-size: 16px;
}
</style>
