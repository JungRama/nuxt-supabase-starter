<script setup lang="ts">
  import * as monaco from 'monaco-editor'

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

  let editorInit: any = null

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

  watch(() => props.code, (newData) => {
    if(editorInit) {
      editorInit?.setValue(newData)
    }
  });
</script>

<template>
  <div>
    <div id="monaco-editor" :class="editorClass"></div>
  </div>
</template>