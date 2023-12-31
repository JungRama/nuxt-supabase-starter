<script setup lang="ts">
  import { formatDistanceToNow, parseISO } from 'date-fns';
  
  useSeoMeta({
    title: 'Code Editor - Nuxt Supabase Starter',
  })
  
  const router = useRouter();

  const {
    loadingState,
    actionGet,
    actionCreate,
    actionRemove
   } = useCodeAction()
  
  const data = ref<any[]>([])

  const getCode = async () => {
    const fetched = await actionGet()
    if(fetched) {
      data.value = fetched
    }
  }

  getCode()

  const newCode = async () => {
    const create = await actionCreate()
    if(!create) return
    router.push(`/dashboard/code-editor/${create.id}`)
  }

  const removeCode = async (id: string) => {
    await actionRemove(id)
    getCode()
  }

</script>
<template>
  <div class="w-full mx-auto my-16 space-y-[30px] max-w-7xl">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold pt-5 max-w-[400px]">
        Realtime Code Editor
      </h1>
      <UButton class="h-10" color="white" @click="newCode()" :disabled="loadingState.create" :loading="loadingState.create">
        + New Code
      </UButton>
    </div>
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <template v-if="loadingState.get">        
        <div class="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4" v-for="_ in 6" :key="'skeleton'+_">
          <UCard>
            <div class="flex justify-between items-center">
              <div>
                <USkeleton class="h-4 w-[150px]" />
                <USkeleton class="h-4 w-[50px] mt-1" />
              </div>
              <div class="flex gap-2">
                <UButton class="h-8 w-8 flex items-center justify-center">
                  <UIcon name="i-lucide-edit"/>
                </UButton>
                
                <UButton class="h-8 w-8 flex items-center justify-center" color="red">
                  <UIcon name="i-lucide-trash"/>
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <template v-else>
        <div class="col-span-12" v-if="data?.length === 0">
          <div class="relative flex justify-center items-center h-[300px]">
            <div class="flex flex-col justify-center items-center relative z-10 gap-2">
              <UIcon name="i-lucide-layout-template" class="h-12 w-12"></UIcon>
              <h2 class="text-2xl font-bold">Code is empty, <span class="underline cursor-pointer" @click="newCode()">create</span> a new one</h2>
            </div>
            <div class="absolute left-0 top-0 flex w-full h-full items-center justify-center" 
            v-if="$colorMode.value === 'dark'">
              <img src="/gradient-pattern-square.webp" class="h-[200px] " alt="">
            </div>
          </div>
        </div>
        
        <div class="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-4" v-for="(item) in data" :key="item.id">
          <UCard>
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg">{{item.title}}</h2>
                <p class="text-xs opacity-50">updated {{item.updated_at ? formatDistanceToNow(parseISO(item.updated_at)) : ''}} ago</p>
              </div>
              <div class="flex gap-2">
                <UButton class="h-8 w-8 flex items-center justify-center" :to="`/dashboard/code-editor/${item.id}`">
                  <UIcon name="i-lucide-edit"/>
                </UButton>

                <UButton class="h-8 w-8 flex items-center justify-center" color="red" @click="removeCode(item.id)" :disabled="loadingState.remove && loadingState.removeOnId == item.id" :loading="loadingState.remove && loadingState.removeOnId == item.id">
                  <UIcon name="i-lucide-trash"/>
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </template>
    </div>
  </div>
</template>


<style scoped>

</style>~/composables/use-code-action