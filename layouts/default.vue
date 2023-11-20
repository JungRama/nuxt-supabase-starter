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
            <NuxtLink class="font-medium md:py-6" :class="{ 'text-primary': $route.path === '/' }" to="/">Landing</NuxtLink>
            <NuxtLink class="font-medium md:py-6" :class="{ 'text-primary': $route.path === '/docs' }" to="/docs">Docs</NuxtLink>

            <NuxtLink class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-primary md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400" 
              href="/sign-in">
              <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Try Example
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    <!-- ========== END HEADER ========== -->

    <slot></slot>
  </div>
</template>