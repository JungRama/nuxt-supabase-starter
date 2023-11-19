<script setup lang="ts">
  const isSearchOpen = ref(false)

  const router = useRouter()

  const auth = useSupabaseUser()
  const { auth: authAction } = useSupabaseClient()

  const menuOpen = ref(true)

  onBeforeMount(() => {
    if(window) {
      window.addEventListener('resize', () =>{
        if(window.innerWidth < 768) menuOpen.value = false
      })
  
      if(window.innerWidth < 768) menuOpen.value = false
    }
  })

  onMounted(() => {

    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === '/') {
        isSearchOpen.value = !isSearchOpen.value
      }
    });
  })

  const linksTopNav = reactive([{
    label: 'Dashboard',
    icon: 'i-lucide-home',
    exact: true,
    exactQuery: true,
    exactMatch: true,
    to: '/dashboard'
  },{
    label: 'Code Editor',
    icon: 'i-lucide-terminal-square',
    exact: true,
    exactQuery: true,
    exactMatch: true,
    to: '/dashboard/code-editor'
  }, {
    label: 'Storage',
    icon: 'i-lucide-archive-restore',
    exact: true,
    exactQuery: true,
    exactMatch: true,
    to: '/dashboard/storage'
  }])

  const linksBottomNav = [{
    label: 'Search',
    icon: 'i-lucide-search',
    click: () => {
      isSearchOpen.value = true
    }
  }]

  const signOut = async() => {
    await authAction.signOut();
    router.push('/sign-in')
  }

  onMounted(() => {
    onClickOutside(document.getElementById('#menu-admin-top'), (event) => console.log(event))
  })
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
          <NuxtLink to="/dashboard">
            <div class="flex items-center justify-start gap-2">
              <img src="/icon.svg" class="h-[60px]">
              <p class="text-lg leading-tight -mt-1">
                Nuxt Supabase <br> 
                Starter
              </p>
            </div>
          </NuxtLink>

          <UVerticalNavigation 
          :links="linksTopNav">
          <template #default="{ link, isActive }">
            <span class="group-hover:text-primary relative py-2">{{ link.label }}</span>
          </template>
          </UVerticalNavigation>
        </div>

        <div class="flex flex-col">
          <UVerticalNavigation 
          :links="linksBottomNav">
          <template #default="{ link }">
            <span class="group-hover:text-primary relative py-2">
              {{ link.label }}
              <UKbd value="ctrl + /" v-if="link.label == 'Search'" class="ml-2" />
            </span>
          </template>
          </UVerticalNavigation>
          
          <div class="flex items-center justify-between p-3">
            <div class="flex items-center gap-2">
              <UAvatar
              size="sm"
              :alt="auth?.email"
              :src="auth?.user_metadata.avatar_url ?? null"
              />
              <p class="text-gray-400 font-bold text-sm" v-if="auth?.email">{{auth.email.length > 12 ? auth.email.slice(0, 12) + '...' : auth.email}}</p>
            </div>
            <UButton color="red" variant="ghost" icon="i-lucide-log-out"
            @click="signOut">
            </UButton>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col px-5">
      <slot />
    </div>

    <UModal v-model="isSearchOpen">
      <SearchGlobal @close="isSearchOpen = false"></SearchGlobal>
    </UModal>
  </div>
</template>