<script setup lang="ts">
  import * as monaco from 'monaco-editor'
  import useCodeFetch from '~/composables/use-code-fetch'
  
  const { 
    loadingState,
    update
  } = useCodeFetch()

  const colorMode = useColorMode()

  const props = defineProps({
    id: String,
    code: String,
    language: String
  })

  const emit = defineEmits(['change'])

  definePageMeta({
    layout: 'dashboard'
  })

  const language = ref('html')
  const codeEditor = ref('')
  
  codeEditor.value = props?.code ?? ''
  
  onMounted(() => {
    const editorInit = monaco.editor.create(document.getElementById("monaco-editor") as HTMLElement, {
      value: codeEditor.value,
      automaticLayout: true,
      theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs-light',
      language: language.value,
    })

    editorInit.onDidChangeModelContent(() => {
      emit('change', editorInit.getValue())
    })
  })
</script>

<template>
  <div id="monaco-editor" class="h-[calc(100vh-110px)]"></div>
</template>