<script setup>
import { onMounted, ref } from 'vue'
import { useServiceStore } from '@/stores/serviceStore'

const serviceStore = useServiceStore()
const selectedServiceId = ref('')
const vehicleId = ref('')

onMounted(() => {
  serviceStore.fetchAllServices()
})

const submitForm = () => {
  if (!selectedServiceId.value || !vehicleId.value.trim()) {
    alert('Please select a service and enter vehicle ID')
    return
  }


  console.log('Selected service ID:', selectedServiceId.value)
  console.log('Entered vehicle ID:', vehicleId.value)
}
</script>

<template>
  <div>
    <h2>Make Appointment</h2>

    <form @submit.prevent="submitForm">
      <!-- Service Dropdown -->
      <div>
        <label for="service">Select Service</label>
        <select v-model="selectedServiceId" id="service">
          <option value="" disabled>Select service</option>
          <option v-for="service in serviceStore.services" :key="service.id" :value="service.id">
            {{ service.name }} - {{ service.price }}
          </option>
        </select>
      </div>

      <!-- Vehicle ID Input -->
      <div>
        <label for="vehicleId">Enter Vehicle ID</label>
        <input type="text" id="vehicleId" v-model="vehicleId" />
      </div>

      <!-- Submit -->
      <button type="submit">Book Appointment</button>
    </form>
  </div>
</template>
