<script setup lang="ts">
import type { VerticalNavigationLink } from '@nuxt/ui/dist/runtime/types';

  const isSearchOpen = ref(false)

  const route = useRoute()
  const router = useRouter()

  const auth = useSupabaseUser()
  const { auth: authAction } = useSupabaseClient()

  const routeName = ref(route.name)

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
</script>

<template>
  <div class="flex max-h-full">
    <div class="h-full bg-background w-64 px-2 overflow-auto border-r border-gray-200 dark:border-stone-800 sticky top-0">
      <div class="py-2 flex flex-col justify-between h-[100vh]">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-start gap-2">
            <img src="/icon.svg" class="h-[60px]">
            <p class="text-lg leading-tight -mt-1">
              Nuxt Supabase <br> 
              Starter
            </p>
          </div>

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
      <SearchGlobal></SearchGlobal>
    </UModal>
  </div>
</template>