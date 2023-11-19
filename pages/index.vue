<script setup lang="ts">
  definePageMeta({
    middleware: 'guest'
  })

  const toast = useToast()

  const packageInstall = 'npx create-nuxt-supabase my-app'

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
    <CookieConsent></CookieConsent>

    <!-- ========== HEADER ========== -->
    <header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm fixed top-0">
      <nav class="mt-6 relative max-w-[85rem] w-full bg-white border border-gray-200 rounded-xl md:rounded-[36px] mx-2 py-3 px-4 flex items-center gap-2 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-gray-900 dark:border-gray-800" aria-label="Global">
        <div class="md:flex items-center justify-between">
          <NuxtLink class="flex-none gap-3 font-semibold flex items-center dark:text-white" to="/" aria-label="Brand">
            <img src="/icon.svg" class="h-[50px]">
            <p class="text-sm leading-tight hidden md:block">Nuxt Supabase <br> Starter</p>
          </NuxtLink>
        </div>
        <div id="navbar-collapse-with-animation" class="hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block">
          <div class="flex justify-end gap-y-4 gap-x-3 md:flex-row md:items-center md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
            <a class="font-medium text-primary md:py-6" href="#" aria-current="page">Landing</a>
            <NuxtLink class="font-medium text-gray-500 hover:text-gray-400 md:py-6 dark:text-gray-400 dark:hover:text-gray-500" to="/docs">Docs</NuxtLink>

            <NuxtLink class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-primary md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400" 
              href="/sign-in">
              <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Sign In
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    <!-- ========== END HEADER ========== -->
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
            Supercharged your project Supabase 🚀 Nuxt 
          </h1>
        </div>
        <!-- End Title -->

        <div class="mt-5 max-w-3xl text-center mx-auto">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Supercharge projects with easy integration, real-time updates, <br> and scalable performance. ✨
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
            Try Demo
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