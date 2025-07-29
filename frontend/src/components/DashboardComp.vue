<script setup>
import { useUserAppointments } from '../stores/userAppointments'
import { onMounted, ref } from 'vue'
import AppointmentCard from './AppointmentCard.vue'
import MakeAppointmentComp from './MakeAppointmentComp.vue';

const store = useUserAppointments()
const showModal = ref(false)

onMounted(() => {
  store.fetchAppointments()
})

const appClick = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="container">
    <h1 class="main-heading">Hello !!</h1>
    <h3 class="sub-heading">Your services</h3>

    <div v-if="store.loading" class="info-text">Loading...</div>
    <div v-else-if="store.error" class="error-text">{{ store.error }}</div>
    <div v-else class="appointments-list">
      <div v-for="appointment in store.appointments" :key="appointment.id" class="appointment-wrapper">
        <AppointmentCard :appointment="appointment" />
      </div>
    </div>

    <button class="make-appointment-btn" @click="appClick">
      {{ showModal ? 'Close' : 'Make Appointment' }}
    </button>

    <div v-if="showModal" class="modal-wrapper">
      <MakeAppointmentComp />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  font-family: sans-serif;
  background-color: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.main-heading {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
}

.sub-heading {
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-bottom: 16px;
}

.info-text,
.error-text {
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.error-text {
  color: red;
}

.appointments-list {
  margin-top: 10px;
}

.appointment-wrapper {
  margin-bottom: 12px;
}

.make-appointment-btn {
  display: block;
  margin: 20px auto 0;
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.make-appointment-btn:hover {
  background-color: #0056b3;
}

.modal-wrapper {
  margin-top: 20px;
}
</style>
