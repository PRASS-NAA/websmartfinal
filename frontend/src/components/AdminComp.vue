<script setup>
import { ref } from 'vue'
import { useServiceStore } from '../stores/services'

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
        <textarea v-model="description"></textarea>
      </div>

      <button type="submit">Add Service</button>
    </form>
  </div>
</template>


<style scoped>
div {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 12px;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

form div {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #444;
}

input,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}


</style>


