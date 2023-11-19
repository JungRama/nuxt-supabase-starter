<script setup lang="ts">
  const cookieOpen = ref(false)

  onMounted(() => {
    const cookie = localStorage.getItem("cookie");
    if(cookie === 'already-choosed') {
      cookieOpen.value = false
    }else {
      cookieOpen.value = true
    }
  })

  const changeCookie = () => {
    cookieOpen.value = false
    localStorage.setItem('cookie', 'already-choosed')
  }
</script>

<template>
  <div v-if="cookieOpen">
    <div id="cookies-with-stacked-buttons" class="fixed bottom-0 start-0 z-[60] sm:max-w-sm w-full mx-auto p-6">
      <!-- Card -->
      <div class="p-4 bg-white/[.6] backdrop-blur-lg rounded-xl shadow-2xl dark:bg-slate-900/[.6] dark:shadow-black/[.7]">
        <div class="flex justify-between items-center gap-x-5 sm:gap-x-10">
          <h2 class="font-semibold text-gray-800 dark:text-white">
            Cookie Settings (Sample)
          </h2>
          <button type="button" 
            @click="changeCookie()"
            class="inline-flex rounded-full p-2 text-gray-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600 dark:hover:bg-gray-800 dark:text-gray-300" data-hs-remove-element="#cookies-with-stacked-buttons">
            <span class="sr-only">Dismiss</span>
            <svg class="flex-shrink-0 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-800 dark:text-gray-200">
          By continuing to use this site you consent to the use of cookies in accordance with our Cookies Policy.
        </p>
        <div class="mt-5 mb-2 w-full flex gap-x-2">
          <div class="grid w-full">
            <button type="button" 
              @click="changeCookie()"
              class="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              Allow all
            </button>
          </div>
          <div class="grid w-full">
            <button type="button" 
              @click="changeCookie()"
              class="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent hover:opacity-70 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              Reject all
            </button>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
  </div>
</template>