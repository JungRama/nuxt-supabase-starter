<script setup lang="ts">
  const user = useSupabaseUser()

  watchEffect(() => {
    if (user.value) {
      navigateTo('/dashboard')
    }
  })
</script>
<template>
  <div class="w-full mx-auto my-16 space-y-16 max-w-7xl">
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[30px]">
      <div class="col-span-12 md:col-span-4 lg:col-span-4">
        <template>
          <UCard :ui="{
            background: 'g-white dark:bg-red',
          }">
            <template #header>
              <Placeholder class="h-8" />
            </template>

            <Placeholder class="h-32" />

            <template #footer>
              <Placeholder class="h-8" />
            </template>
          </UCard>
        </template>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>