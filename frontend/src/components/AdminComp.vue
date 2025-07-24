<script setup>
import { ref } from 'vue'
import { useServiceStore } from '@/stores/serviceStore'

const serviceStore = useServiceStore()

const name = ref('')
const price = ref('')
const description = ref('')

const submitForm = async () => {
  if (!name.value || !price.value || !description.value) {
    alert('All fields are required')
    return
  }

  await serviceStore.addService({
    name: name.value,
    price: parseInt(price.value),
    description: description.value,
  })

  // Clear form after successful submission
  name.value = ''
  price.value = ''
  description.value = ''
}
</script>

<template>
  <div>
    <h2>Create New Service</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label>Name</label>
        <input v-model="name" type="text" />
      </div>

      <div>
        <label>Price</label>
        <input v-model="price" type="number" />
      </div>

      <div>
        <label>Description</label>
        <textarea v-model="description" rows="3"></textarea>
      </div>

      <button type="submit">Add Service</button>
    </form>
  </div>
</template>
