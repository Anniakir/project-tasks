<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  
  <main style="padding: 1rem;">
    <router-view />
  </main>
</template>