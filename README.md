# Product Inventory Dashboard

A single-page inventory management application built with Vue 3, TypeScript, and Pinia.

The app allows users to manage products, update stock levels inline, apply filters, search products, and sort by price. Data is persisted using localStorage.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia (State Management)
- Vite
- LocalStorage (Persistence)

## Project Setup

Clone the repository:

```bash
git clone https://github.com/terabucket/product-inventory-dashboard-main.git
cd product-inventory
npm install
npm run dev
npm run build
```

✅ This must work without confusion.

---

# Features Implemented

Directly map to the assignment requirements.

## Features

### Product Management
- Add new product with validation
- Remove product
- Inline stock editing
- Asynchronous initial data loading (mock API using setTimeout)

### Filtering & Search
- Filter by category
- "In Stock Only" toggle
- Case-insensitive search by name
- Sort by price (ascending/descending)

### UX Enhancements
- Loading state while fetching data
- Empty state when no products match filters
- Low stock highlighting (stock < 5)

### Persistence
- Products are persisted in localStorage
## Architecture & Design Decisions

- Pinia is used as the single source of truth for product data and filter state.
- All filtering, searching, and sorting logic is implemented inside a Pinia getter to keep components thin.
- The store is written using the setup syntax for better TypeScript support and type inference.
- A dedicated Product interface ensures strong type safety.
- Components are separated by responsibility:
  - ProductForm handles creation and validation
  - Filters handles filtering UI
  - ProductTable renders data and handles inline editing
- LocalStorage is used for persistence. If no stored data exists, mock data is loaded asynchronously.

## Folder Structure

```
src/
  components/
    ProductForm.vue
    ProductTable.vue
    Filters.vue
  stores/
    productStore.ts
  types/
    product.ts
  App.vue
  main.ts
```

  ## Possible Improvements

- Replace mock API with real backend integration
- Add pagination for large datasets
- Add unit tests for store actions and getters
- Improve UI styling using a component library
