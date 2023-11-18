<script setup lang="ts">
  const user = useSupabaseUser()

  definePageMeta({
    middleware: 'guest'
  })
</script>
<template>
  <div>
    WELCOME
  </div>
</template>


<style scoped>

</style>