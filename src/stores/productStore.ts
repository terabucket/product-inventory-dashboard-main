import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types/product'

export const useProductStore = defineStore('products', () => {
  // ✅ STATE
  const products = ref<Product[]>([])
  const loading = ref(false)

  const search = ref('')
  const selectedCategory = ref('')
  const inStockOnly = ref(false)
  const sortOrder = ref<'asc' | 'desc'>('asc')

  // ✅ GETTERS
  const filteredProducts = computed(() => {
    let result = [...products.value]

    // Search
    if (search.value) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.value.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory.value) {
      result = result.filter(p => p.category === selectedCategory.value)
    }

    // In stock filter
    if (inStockOnly.value) {
      result = result.filter(p => p.stock > 0)
    }

    // Sort
    result.sort((a, b) =>
      sortOrder.value === 'asc'
        ? a.price - b.price
        : b.price - a.price
    )

    return result
  })

  const categories = computed(() =>
    [...new Set(products.value.map(p => p.category))]
  )

  // ✅ ACTIONS

  async function loadProducts() {
    loading.value = true

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        products.value = [
          { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5 },
          { id: 2, name: 'Shoes', category: 'Fashion', price: 120, stock: 0 },
          { id: 3, name: 'Phone', category: 'Electronics', price: 800, stock: 10 }
        ]
        resolve()
      }, 1000)
    })

    loading.value = false
    saveToLocalStorage()
  }

  function addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...product,
      id: Date.now()
    }

    products.value.push(newProduct)
    saveToLocalStorage()
  }

  function updateStock(id: number, stock: number) {
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.stock = stock
      saveToLocalStorage()
    }
  }

  function removeProduct(id: number) {
    products.value = products.value.filter(p => p.id !== id)
    saveToLocalStorage()
  }

  function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  function loadFromLocalStorage() {
    const data = localStorage.getItem('products')
    if (data) {
      products.value = JSON.parse(data)
    }
  }

  return {
    // state
    products,
    loading,
    search,
    selectedCategory,
    inStockOnly,
    sortOrder,

    // getters
    filteredProducts,
    categories,

    // actions
    loadProducts,
    addProduct,
    updateStock,
    removeProduct,
    loadFromLocalStorage
  }
})