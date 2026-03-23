<script setup lang="ts">
import { useProductStore } from '../stores/productStore'

const store = useProductStore()

function onStockChange(id: number, event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  if (value >= 0) {
    store.updateStock(id, value)
  }
}
</script>

<template>
  <div>
    <div v-if="store.loading">Loading products...</div>

    <div v-else-if="!store.filteredProducts.length">
      No products found.
    </div>

    <table v-else border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="product in store.filteredProducts"
          :key="product.id"
          :style="{ backgroundColor: product.stock < 5 ? '#ffe5e5' : '' }"
        >
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price }}</td>

          <td>
            <input
              type="number"
              :value="product.stock"
              @change="onStockChange(product.id, $event)"
            />
          </td>

          <td>
            <button @click="store.removeProduct(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>