<script setup lang="ts">
  import MonacoCodeEditor from '~/components/monaco-code-editor.client.vue';
  import { useCodeQuery } from '~/composables/query/code'

  import _ from 'underscore'
  const route = useRoute();

  const { 
    loadingState,
    actionGetById,
  } = useCodeAction()

  const {
    getRealtimeById
  } = useCodeQuery()

  const language = ref('typescript')
  const title = ref('')
  const code = ref('')

  const getCodeDetail = async () => {
    if(!route.params.id) return

    const fetched = await actionGetById(route.params.id as string)
    if(fetched) {
      title.value = fetched.title
      language.value = fetched.language
      code.value = fetched.code
    }
  }

  onMounted(async () => {
    await getCodeDetail()
    getRealtimeById(route.params.id as string, (payload) => {
      title.value = payload.new?.title ?? ''
      language.value = payload.new?.language ?? ''
      code.value = payload.new?.code ?? ''
      code.value = payload.new?.code ?? ''
    })
  })
</script>

<template>
  <div>
    <div class="overflow-hidden">
      <div v-if="loadingState.getById" class="h-[100vh] w-full flex items-center justify-center">
        <UIcon name="i-lucide-loader" class="animate-spin"></UIcon>
      </div>

      <div v-else>
        <div class="relative">
          <div class="header-file flex justify-between p-5 bg-white dark:bg-[#1e1e1e]">
            <div class="flex items-center gap-2">
              <p>{{title}}</p>
            </div>
            
            <div class="flex gap-2">
              Language: {{ language }}
            </div>
          </div>

          <ClientOnly>
            <MonacoCodeEditor 
            :id="(route.params.id as string)" 
            :editorClass="'h-[calc(100vh-65px)]'"
            :language="language" 
            :readOnly="true"
            :code="code"></MonacoCodeEditor>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>