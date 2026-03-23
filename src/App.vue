<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from './stores/productStore'
import ProductForm from './components/ProductForm.vue'
import Filters from './components/Filters.vue'
import ProductTable from './components/ProductTable.vue'

const store = useProductStore()

onMounted(async () => {
  store.loadFromLocalStorage()

  if (!store.products.length) {
    await store.loadProducts()
  }
})
</script>

<template>
  <h1>Product Inventory Dashboard</h1>

  <ProductForm />
  <Filters />
  <ProductTable />
</template>