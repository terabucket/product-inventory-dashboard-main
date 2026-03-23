<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '../stores/productStore'

const store = useProductStore()

const name = ref('')
const category = ref('')
const price = ref<number | null>(null)
const stock = ref<number | null>(null)
const error = ref('')

function submit() {
  if (!name.value.trim()) {
    error.value = 'Name is required'
    return
  }

  if (!price.value || price.value <= 0) {
    error.value = 'Price must be greater than 0'
    return
  }

  if (stock.value === null || stock.value < 0) {
    error.value = 'Stock must be 0 or greater'
    return
  }

  store.addProduct({
    name: name.value,
    category: category.value,
    price: price.value,
    stock: stock.value
  })

  name.value = ''
  category.value = ''
  price.value = null
  stock.value = null
  error.value = ''
}
</script>

<template>
  <div>
    <h3>Add Product</h3>

    <input v-model="name" placeholder="Name" />
    <input v-model="category" placeholder="Category" />
    <input type="number" v-model.number="price" placeholder="Price" />
    <input type="number" v-model.number="stock" placeholder="Stock" />

    <button @click="submit">Add Product</button>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>