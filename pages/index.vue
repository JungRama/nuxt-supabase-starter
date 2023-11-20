<script setup lang="ts">
  definePageMeta({
    middleware: 'guest'
  })

  const toast = useToast()

  const packageInstall = 'npx nuxt-nuxt-supabase-starter my-app'

  const copyText = () => {
    navigator.clipboard.writeText(packageInstall);
    toast.add({
      color: "green",
      title: 'Copied to clipboard!',
      icon: "i-lucide-check-circle"
    })
  }
</script>
<template>
  <div>
    <!-- Hero -->
    <div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/landing-pattern-square.svg')] before:bg-no-repeat before:w-full before:h-full before:-z-[1] before:transform before:bg-bottom before:-translate-x-1/2 dark:before:bg-[url('/landing-pattern-square-dark.svg')]">
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <!-- Announcement Banner -->
        <div class="flex justify-center">
          <a class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400" href="#">
            {{ packageInstall }}
            <span class="flex items-center gap-x-1" @click="copyText()">
              <span class="border-s border-stone-400 text-primary ps-2">Copy</span>
              <UIcon name="i-lucide-copy" class="text-primary" ></UIcon>
            </span>
          </a>
        </div>
        <!-- End Announcement Banner -->

        <!-- Title -->
        <div class="mt-5 max-w-xl text-center mx-auto">
          <h1 class="block font-bold text-gray-800 text-2xl md:text-3xl lg:text-4xl dark:text-gray-200">
            Supercharged your project <br class="hidden md:block"> Nuxt 🚀 Supabase 
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-5 max-w-3xl text-center mx-auto">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Starer kit to help you kickstart your next project with nuxt and supabase.
          </p>
        </div>

        <!-- Buttons -->
        <div class="mt-8 gap-3 flex justify-center">
          <NuxtLink class="inline-flex justify-center items-center gap-1 text-center bg-gradient-to-tl from-primary to-primary-600 hover:from-primary-300 hover:to-primary-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800" 
          to="/docs">
            <UIcon name="i-lucide-square-dashed-bottom-code h-5 w-5"></UIcon>
            Open Documentation
          </NuxtLink>

          <NuxtLink class="inline-flex justify-center items-center gap-1 text-center py-3 px-4" to="/sign-in">
            <UIcon name="i-lucide-square-dashed-bottom-code h-5 w-5"></UIcon>
            Try Example
          </NuxtLink>
        </div>
        <!-- End Buttons -->
      </div>
    </div>
    <!-- End Hero -->

    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
      <ProductInformation></ProductInformation>
    </div>
  </div>
</template>


<style scoped>

</style>