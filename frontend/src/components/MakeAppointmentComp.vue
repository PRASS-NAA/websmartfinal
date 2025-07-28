<script setup>
import { onMounted, ref } from 'vue'
import { useServiceStore } from '../stores/services'
import { useVehicleStore } from '@/stores/vehicles'
import { useUserAppointments } from '@/stores/userAppointments'

const serviceStore = useServiceStore()
const vehicleStore = useVehicleStore()
const selectedServiceId = ref('')
const vehicleId = ref(0);

onMounted(() => {
  serviceStore.fetchAllServices()
  vehicleStore.fetchOwnedVehicles()
})

const submitForm = () => {

  try{
    const userAppointmentStore = new useUserAppointments();

    userAppointmentStore.bookAppointment(selectedServiceId.value, vehicleId.value);
  }catch(err)
  {
    window.alert("error")
  }
}
</script>

<template>
  <div>
    <h2>Make Appointment</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="service">Select Service</label>
        <select v-model="selectedServiceId" id="service">
          <option value="" disabled>Select service</option>
          <option v-for="service in serviceStore.services" :key="service.id" :value="service.id">
            {{ service.name }} - {{ service.price }}
          </option>
        </select>
      </div>

      
      <div>
        <label for="vehicleId">Enter Vehicle ID</label>
        <select v-model="vehicleId" id="vehicleId">
          <option value="" disabled>Select service</option>
          <option v-for="vehicle in vehicleStore.vehicles" :key="vehicle.id" :value="vehicle.id">
            {{ vehicle.company }} {{ vehicle.model_name }}
          </option>
        </select>
      </div>
      <button type="submit">Book Appointment</button>
    </form>
  </div>
</template>


<style scoped>
div {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fdfdfd;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #444;
}

select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4285f4;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #357ae8;
}
</style>
