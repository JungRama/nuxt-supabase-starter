<script setup>
  const form = reactive({ 
    email: 'mail@example.com', 
    password: 'password' 
    })
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="flex h-[100vh] w-full justify-center items-center">
        <div class="w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12">
          <UCard>
            <div class="space-y-4">
              <div class="flex justify-center">
                <img src="/icon.svg" class="h-[80px]">
              </div>

              <UFormGroup label="Email" name="email">
                <UInput v-model="form.email" />
              </UFormGroup>

              <UFormGroup label="Password" name="password">
                <UInput v-model="form.password" type="password" />
              </UFormGroup>

              <UButton label="Login" color="gray" block />
            </div>

            <UDivider label="or" color="gray" orientation="vertical" />

            <div class="space-y-4 flex flex-col justify-center">
              <UButton color="black" label="Login with GitHub" icon="i-lucide-github" block />
            </div>
          </UCard>

          <div class="flex items-center gap-2 justify-center mt-3">
            <p class="opacity-50">Don't have an account?</p>
            <NuxtLink to="/sign-up" class="underline">Sign up</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>