<script setup lang="ts">
  import MonacoCodeEditor from '~/components/monaco-code-editor.client.vue';
  import useCodeFetch from '~/composables/use-code-fetch'

  import _ from 'underscore'

  const { 
    dataDetail,
    setDetailId,
    loadingDataDetail,
    executeDataDetail,
    loadingState,
    update
  } = useCodeFetch()

  const route = useRoute();

  // set current detail id
  if(route.params.id) {
    setDetailId(route.params.id as string)
    await executeDataDetail()
  }

  definePageMeta({
    layout: 'dashboard'
  })

  const language = ref('typescript')
  const title = ref('')
  title.value = dataDetail.value?.title ?? ''
  language.value = dataDetail.value?.language ?? ''

  const saveName = _.debounce(function () {
    update(
    route.params.id as string,
    {
      name: title.value
    })
  }, 1500)

  const saveCode = _.debounce(function (code: string) {
    update(
    route.params.id as string,
    {
      code
    })
  }, 2500)
  
</script>

<template>
  <div>
    <div class="mt-5 rounded-md overflow-hidden">
      <div v-if="loadingDataDetail">
        Loading ...
      </div>

      <div v-else class="relative">
        <div class="header-file flex justify-between p-5 bg-[#1e1e1e]">
          <div class="flex items-center gap-2">
            <NuxtLink to="/dashboard/code-editor">
              <UIcon name="i-lucide-arrow-left mt-1"></UIcon>
            </NuxtLink>

            <p>Filename : </p>
            <input type="text" class="focus:outline-none px-2 py-1 rounded-md" v-model="title" @input="saveName">
            <div class="text-xs opacity-40 flex items-center gap-1" v-if="loadingState.update">
              <UIcon name="i-lucide-loader" class="animate-spin"></UIcon>
              Saving ...
            </div>
          </div>
          
          <div class="flex gap-2">
            <USelect v-model="language" 
            @change="update(
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
                  <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${route.params.id}`" alt="">
                  <p>Share this code</p>
                
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
          :code="dataDetail?.code"></MonacoCodeEditor>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>