<script setup lang="ts">
  import MonacoCodeEditor from '~/components/monaco-code-editor.client.vue';

  import _ from 'underscore'
  const runtimeConfig = useRuntimeConfig();

  const toast = useToast()

  const { 
    dataDetail,
    setDetailId,
    loadingDataDetail,
    executeDataDetail,
    loadingState,
    update
  } = useCodeFetch()

  const route = useRoute();

  const client = useSupabaseClient()

  const language = ref('typescript')
  const title = ref('')
  const is_public = ref(false)
  const code = ref(null)

  // set current detail id
  if(route.params.id) {
    setDetailId(route.params.id as string)
    await executeDataDetail()

    const channels = client.channel('custom-filter-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'codes', filter: `id=eq.${route.params.id}` },
        (payload) => {
          console.log('Change received!', payload)
          
          title.value = payload.new?.title ?? ''
          language.value = payload.new?.language ?? ''
          code.value = payload.new?.code ?? ''
        }
      )
      .subscribe()

    
    title.value = dataDetail.value?.title ?? ''
    language.value = dataDetail.value?.language ?? ''
    code.value = dataDetail.value?.code ?? ''
    is_public.value = dataDetail.value?.is_public ?? false

  }
  
</script>

<template>
  <div>
    <div class="overflow-hidden">
      <div v-if="loadingDataDetail">
        Loading ...
      </div>

      <div v-else class="relative">
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
</template>

<style scoped>

</style>