<script setup lang="ts">
  const menuOpen = ref(true)

  onBeforeMount(() => {
    if(window) {
      window.addEventListener('resize', () =>{
        if(window.innerWidth < 768) menuOpen.value = false
      })
  
      if(window.innerWidth < 768) menuOpen.value = false
    }
  })

  const links = [
    {
      label: 'Getting Started',
      to: '/docs/getting-started'
    }, 
    {
      label: 'Install',
      to: '/docs/install'
    }, 
    {
      label: 'Library Installed',
      to: '/docs/library-installed'
    },
    {
      label: 'Feature',
      to: '/docs/feature'
    },
    {
      label: 'Folder Structure',
      to: '/docs/folder-structure'
    },
    {
      label: 'Demo',
      to: '/sign-in'
    }
  ]
</script>

<template>
  <div class="flex max-h-full">
    <div class="fixed z-10 p-2 bg-stone-900 left-2 top-2 rounded-lg w-10 h-10 flex md:hidden items-center justify-center"
      @click="menuOpen = !menuOpen">
      <UIcon name="i-lucide-menu"></UIcon>
    </div>

    <div class="menu-overlay fixed top-0 left-0 w-full h-full bg-black opacity-20 z-40 block md:hidden"
    v-if="menuOpen"
    @click="menuOpen = !menuOpen"
    ></div>

    <div class="h-full w-64 px-2 overflow-auto border-r border-gray-200 dark:border-stone-800 md:sticky top-0
    fixed z-50 bg-white dark:bg-stone-950 md:bg-transparent"
    id="menu-admin-top"
    v-if="menuOpen"
    >
      <div class="py-2 flex flex-col justify-between h-[100vh] bg-background">
        <div class="flex flex-col gap-3">
          <NuxtLink to="/">
            <div class="flex items-center justify-start gap-2">
              <img src="/icon.svg" class="h-[60px]">
              <p class="text-lg leading-tight -mt-1">
                Nuxt Supabase <br> 
                Starter <UKbd value="DOCS" />
              </p>
            </div>
          </NuxtLink>

          <UVerticalNavigation :links="links">
            <template #default="{ link }">
              <span class="group-hover:text-primary relative">{{ link.label }}</span>
            </template>
          </UVerticalNavigation>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col px-5">
      <div class="my-10">
        <ContentDoc />
      </div>
    </div>
  </div>
</template>