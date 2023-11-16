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

<script>
  // const colorMode = useColorMode()
  definePageMeta({
    colorMode: 'light',
  })

</script>
