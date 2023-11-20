<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/dashboard')
  }
}, { immediate: true })
</script>

<template>
  <div>
    <p class="u-text-black flex h-[100vh] w-full justify-center items-center">
      Redirecting...
    </p>
  </div>
</template>