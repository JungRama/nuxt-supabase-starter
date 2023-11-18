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
    editorClass: String,
    language: String,
    readOnly: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['change'])

  definePageMeta({
    layout: 'dashboard'
  })

  const language = ref('html')
  const codeEditor = ref('')
  
  codeEditor.value = props?.code ?? ''

  let editorInit = null
  onMounted(() => {
    editorInit = monaco.editor.create(document.getElementById("monaco-editor") as HTMLElement, {
      value: props.code,
      automaticLayout: true,
      theme: colorMode.value === 'dark' ? 'vs-dark' : 'vs-light',
      language: language.value,
      readOnly: props.readOnly,
    })

    editorInit.onDidChangeModelContent(() => {
      emit('change', editorInit.getValue())
    })
  })

  watch(colorMode, (val) => {
    window.location.reload()
  })

  watch(() => props.code, (first, second) => {
      console.log(
        "Watch props.selected function called with args:",
        first,
        second
      );

      if(editorInit) {
        editorInit?.setValue(first)
      }
    });
</script>

<template>
  <div>
    <div id="monaco-editor" :class="editorClass"></div>
  </div>
</template>