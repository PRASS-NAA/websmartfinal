<script setup>
const props = defineProps(['appointment'])
</script>

<template>
  <div>
    <h3>Appointment ID: {{ appointment.id }}</h3>
  </div>
  <div>
    <h6>Service ID: {{ appointment.service_id }}</h6>
    <h6>Vehicle ID: {{ appointment.vehicle_id }}</h6>
    <h6>Technician ID: {{ appointment.technician_id }}</h6>
    <h6>Status: {{ appointment.status }}</h6>
  </div>
</template>

<style scoped>
</style>
