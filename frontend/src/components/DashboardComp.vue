<script setup>
import { useUserAppointments } from '../stores/userAppointments'
import { onMounted, ref } from 'vue'
import AppointmentCard from './AppointmentCard.vue'
import MakeAppointmentComp from './MakeAppointmentComp.vue';

const store = useUserAppointments()

const showModal = ref(false);

onMounted(() => {
  store.fetchAppointments()
  console.log("plsss : ", store.appointments)
})


const appClick = () =>
{
  console.log("bfr ",showModal.value)
  if(showModal.value)
  {
    showModal.value = false;
  }else{
    showModal.value = true
  }

  console.log("after ", showModal.value)
}

</script>

<template>
  <h1>Hello !! </h1>
  <h3>Your services</h3>

  <div v-if="store.loading">Loading...</div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <div v-else>
    <div v-for="appointment in store.appointments" :key="appointment.id">
      <AppointmentCard :appointment="appointment" />
    </div>
  </div>

  <button @click="appClick()">
    make appointment
  </button>

  <MakeAppointmentComp v-if="showModal"></MakeAppointmentComp>
</template>

<style scoped>
</style>
