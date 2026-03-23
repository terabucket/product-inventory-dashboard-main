<script setup lang="ts">
import { useProductStore } from '../stores/productStore'

const store = useProductStore()
</script>

<template>
  <div>
    <input
      v-model="store.search"
      placeholder="Search by name..."
    />

    <select v-model="store.selectedCategory">
      <option value="">All Categories</option>
      <option
        v-for="cat in store.categories"
        :key="cat"
        :value="cat"
      >
        {{ cat }}
      </option>
    </select>

    <label>
      <input type="checkbox" v-model="store.inStockOnly" />
      In Stock Only
    </label>

    <button
      @click="store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc'"
    >
      Sort: {{ store.sortOrder }}
    </button>
  </div>
</template>