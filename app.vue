<script>
  definePageMeta({
    colorMode: 'dark',
  })

  const isOffline = ref(false)

  onMounted(() => {
    window.addEventListener('offline', () => isOffline.value = true)
    window.addEventListener('online', () => isOffline.value = false)
  })
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <NuxtPage />
      <UNotifications />
      
      <select v-model="$colorMode.preference" class="border-l border-t absolute right-0 bottom-0 z-50 px-2 py-1 rounded-tl-lg">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

* {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>
