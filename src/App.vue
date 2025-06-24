<script lang="ts">
  import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-gray-100 font-sans">
   <aside
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-full': !isSidebarOpen,
        'md:relative': true,
        'md:translate-x-0': true
      }"
      class="fixed inset-y-0 left-0 transition-transform duration-300 ease-in-out
             w-64 bg-white shadow-xl flex flex-col p-4 z-40"
    >
      <div class="text-2xl font-bold text-blue-800 mb-6">Minha Aplicação</div>
      <nav class="flex-grow">
        <ul>
          <li class="mb-2">
            <a href="/" class="block p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200">
              Home
            </a>
          </li>
          <li class="mb-2">
            <a href="/products" class="block p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200">
              Products
            </a>
          </li>
          <li class="mb-2">
            <a href="/history" class="block p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200">
              History
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1 p-8 overflow-y-auto">
      <router-view></router-view>
    </main>
  </div>
</template>