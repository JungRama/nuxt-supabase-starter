<script>
  definePageMeta({
    colorMode: 'light',
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
      <NuxtPage />
      <UNotifications />
      
      <select v-model="$colorMode.preference" class="absolute right-0 bottom-0">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
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
