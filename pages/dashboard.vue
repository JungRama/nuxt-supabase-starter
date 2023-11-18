<script setup lang="ts">
  // Define dashboard layout and auth for all /dashboard/** pages
  definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
  })
</script>

<template>
  <NuxtPage/>
</template>