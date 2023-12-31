<script setup lang="ts">
  import MonacoCodeEditor from '~/components/monaco-code-editor.client.vue';

  const runtimeConfig = useRuntimeConfig();

  const toast = useToast()

  const { 
    loadingState,
    actionGetById,
    actionUpdate
  } = useCodeAction()

  const route = useRoute();

  const data = ref<any>(null)

  const getCodeDetail = async () => {
    if(!route.params.id) return

    const fetched = await actionGetById(route.params.id as string)
    if(fetched) {
      data.value = fetched
    }
  }

  await getCodeDetail()

  const language = ref('typescript')
  const title = ref('')
  const is_public = ref(false)

  title.value = data.value?.title ?? ''
  language.value = data.value?.language ?? ''
  is_public.value = data.value?.is_public ?? false

  useSeoMeta({
    title: (title.value ?? 'Untitled') + ' - Nuxt Supabase Starter',
  })

  const saveName = useDebounceFn(() => {
    actionUpdate(
    route.params.id as string,
    {
      name: title.value
    })
  }, 1500)
  

  const saveCode = useDebounceFn((code: string) => {
    actionUpdate(
    route.params.id as string,
    {
      code
    })
  }, 2500)

  const copyURL = () => {
    const copyText: HTMLInputElement = document.getElementById("input-copy-url-public") as HTMLInputElement;

    if(copyText) {
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);

      toast.add({
        color: "green",
        title: 'Copied to clipboard!',
        icon: "i-lucide-check-circle"
      })
    }
  }

  watch(is_public, (value) => {
    actionUpdate(
    route.params.id as string,
    {
      is_public: value
    })
  })
  
</script>

<template>
  <div>
    <div class="mt-5 rounded-md overflow-hidden">
      <div class="h-[100vh] w-full flex items-center justify-center" v-if="loadingState.getById">
        <UIcon name="i-lucide-loader" class="animate-spin"></UIcon>
      </div>

      <div v-else class="relative">
        <div class="header-file flex justify-between p-5 bg-white dark:bg-[#1e1e1e]">
          <div class="flex items-center gap-2">
            <NuxtLink to="/dashboard/code-editor">
              <UIcon name="i-lucide-arrow-left mt-1"></UIcon>
            </NuxtLink>

            <p>Filename : </p>
            <input type="text" class="focus:outline-none px-2 py-1 rounded-md bg-gray-200 dark:bg-black" v-model="title" @input="saveName">
            <div class="text-xs opacity-40 flex items-center gap-1" v-if="loadingState.update">
              <UIcon name="i-lucide-loader" class="animate-spin"></UIcon>
              Saving ...
            </div>
          </div>
          
          <div class="flex gap-2">
            <USelect v-model="language" 
            @change="actionUpdate(
            route.params.id as string,
            {
              language: language
            })"
            :options="['javascript', 'typescript', 'html', 'php', 'css', 'phyton', 'rust']" />

            <UPopover>
              <UButton color="white" variant="ghost">
                <UIcon name="i-lucide-share h-5 w-5"></UIcon>
              </UButton>

              <template #panel>
                <div class="p-4">
                  <div class="flex items-center gap-2">
                    <UToggle color="primary" v-model="is_public"/>
                    <div>
                      <p>Share to public</p>
                      <p class="text-xs max-w-[300px] opacity-50">By sharing to public, anyone can access your code in read-mode only</p>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 mt-3" v-if="is_public">
                    <input type="text" id="input-copy-url-public" class="focus:outline-none px-2 py-1 rounded-md w-[300px]" 
                    readonly :value="`${runtimeConfig.public.APP_URL}code/${route.params.id}`">
                    <UButton class="h-8" color="white" @click="copyURL">
                      <UIcon name="i-lucide-copy"></UIcon>
                    </UButton>
                  </div>
                </div>
              </template>
            </UPopover>
          </div>
        </div>
        <ClientOnly>
          <MonacoCodeEditor 
          :id="(route.params.id as string)" 
          :language="language" 
          @change="saveCode"
          :editorClass="'h-[calc(100vh-110px)]'"
          :code="data?.code"></MonacoCodeEditor>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>~/composables/use-code-action