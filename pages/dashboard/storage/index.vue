<script setup lang="ts">
  const client = useSupabaseClient()
  const toast = useToast()
  const auth = useSupabaseUser()

  import type { FileObject } from '@supabase/storage-js/src/lib/types'

  const {
		data: fileList,
		refresh,
		pending: isLoadingData,
		execute,
	} = useAsyncData(
		'codes',
		async () => {
      const { data, error } = await client
      .storage
      .from('bucket-name')
      .list(auth.value?.id, {
        limit: 5,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

      return data
		},
		{
			immediate: false,
		}
	)

  execute()

  const upload = async (event: any) => {
    try {
      if((fileList.value?.length ?? 0) >= 5) {
        toast.add({
          color: "red",
          icon: "i-lucide-upload",
          title: 'For demo purpose, we limit the upload to only 5 files',
        })

        return
      }

      const file = event.target.files[0]

      if (!file.type.startsWith('image/')) {
        toast.add({
          color: "red",
          icon: "i-lucide-upload",
          title: 'Please select an image file.',
        })
        return;
      }

      if (file.size > 1024 * 1024) { 
        toast.add({
          color: "red",
          icon: "i-lucide-upload",
          title: 'File size must be 1MB or less.',
        })
        return;
      }

      loadingState.upload = true

      const { data, error } = await client.storage.from('bucket-name').upload(`${auth.value?.id}/${file.name}`, file, {
        upsert: true
      })
      
      if(error) throw error
      
      if(data) {
        toast.add({
          color: "green",
          icon: "i-lucide-upload",
          title: 'Success uploading file!',
        })
      }

      refresh()

      loadingState.upload = false
    } catch (error) {
      loadingState.upload = false

      toast.add({
				color: 'red',
				icon: 'i-lucide-alert-triangle',
				title: error as string,
			})
    }
  }

  const dataDetail = reactive<{
    id: string | null
    name: string | null
    size: number,
    updated_at: string | null,
    image: string | null,
    mimetype: string | null
  }>({
    id: null,
    name: null,
    size: 0,
    updated_at: null,
    image: null,
    mimetype: null,
  })

  const selectFile = () => {
    document.getElementById('input-file-upload')?.click()
  }

  const seeDetail = async (item: FileObject) => {
    dataDetail.id = item.id
    dataDetail.name = item.name
    dataDetail.mimetype = item.metadata.mimetype
    dataDetail.size = item.metadata.size
    dataDetail.updated_at = item.updated_at

    const { data, error } = await client
    .storage
    .from('bucket-name')
    .createSignedUrl(`${auth.value?.id}/${item.name}`, 60)

    dataDetail.image = data?.signedUrl ?? null
  }
  
  const loadingState = reactive({
    upload: false
  })

  const deleteFile = async () => {
    const { data, error } = await client
    .storage
    .from('bucket-name')
    .remove([`${auth.value?.id}/${dataDetail.name}`])

    dataDetail.id = null
    dataDetail.name = null
    dataDetail.size = 0
    dataDetail.updated_at = null
    dataDetail.image = null
    dataDetail.mimetype = null

    refresh()
  }

  const convertFileSize = (fileSize: number) =>  {
      if (fileSize < 1024) {
      return fileSize + ' bytes';
    } else if (fileSize < 1024 * 1024) {
      // Convert to kilobytes (KB)
      const fileSizeInKB = fileSize / 1024;
      return fileSizeInKB.toFixed(2) + ' KB';
    } else if (fileSize < 1024 * 1024 * 1024) {
      // Convert to megabytes (MB)
      const fileSizeInMB = fileSize / (1024 * 1024);
      return fileSizeInMB.toFixed(2) + ' MB';
    } else {
      // Convert to gigabytes (GB)
      const fileSizeInGB = fileSize / (1024 * 1024 * 1024);
      return fileSizeInGB.toFixed(2) + ' GB';
    }
  }
</script>
<template>
  <div class="w-full mx-auto my-16 space-y-[30px] max-w-7xl">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold pt-5 max-w-[400px]">
        Storage
      </h1>
      <UButton class="h-10" color="white" :disabled="loadingState.upload" :loading="loadingState.upload"
      @click="selectFile">
        + Upload new file
      </UButton>
      <input type="file" accept="image/*" class="hidden" id="input-file-upload" @change="upload">
    </div>

    

    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]" v-if="!isLoadingData && fileList?.length > 0">
      <div class="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3">
        <div class="border-r border-gray-200 dark:border-stone-800 h-[75vh] pr-3 flex flex-col gap-3">
          <template v-if="isLoadingData" v-for="_ in 5" :key="'skeleton'+_">
            <USkeleton class="h-14 w-[full]" />
          </template>
          
          <template v-else>
            <UCard :ui="{
              body: {
                base: 'flex items-center gap-2 cursor-pointer',
                padding: 'px-1 py-1 sm:p-3'
              }
            }"
            v-for="(item, index) in fileList" :key="index"
            @click="seeDetail(item)"
            >
              <div class="flex items-start gap-2">
                <UIcon name="i-lucide-image" class="mt-1"></UIcon>
                <div>
                  <p class="text-sm">{{ item.name }}</p>
                  <p class="text-xs opacity-50">{{convertFileSize(item.metadata.size)}}</p>
                </div>
              </div>
            </UCard>
          </template>
        </div>
      </div>

      <div class="col-span-12 md:col-span-6 lg:col-span-9 xl:col-span-9">
        <div v-if="dataDetail.id">
          <div class="flex h-56 w-full items-center 2xl:h-72 border border-gray-200 dark:border-stone-800">
            <div v-if="dataDetail.image"
            :style="{'background-image': `url(${dataDetail.image})`}"
            class="flex h-full w-full items-center justify-center bg-contain bg-center bg-no-repeat" alt="">
            </div>
          </div>

          <div class="flex justify-between mt-3">
            <div>
              <p>{{ dataDetail.name }}</p>
              <div class="flex gap-2">
                <p class="text-xs opacity-50">{{ dataDetail.mimetype }}</p>
                <p class="text-xs opacity-50">{{ convertFileSize(dataDetail.size) }}</p>
              </div>

              <div class="mt-3">
                <p class="text-xs opacity-50">Last updated</p>
                <p class="text-sm">{{ dataDetail.updated_at }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex gap-2">
                <UButton color="red" @click="deleteFile()">
                  <UIcon name="i-lucide-trash"></UIcon>
                  Delete
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <div class="relative flex justify-center items-center h-[300px]" v-else>
          <div class="flex flex-col justify-center items-center relative z-10 gap-2">
            <UIcon name="i-lucide-eye" class="h-12 w-12"></UIcon>
            <h2 class="text-2xl font-bold">Select file to see the detail</h2>
          </div>
          <div class="absolute left-0 top-0 flex w-full h-full items-center justify-center" 
          v-if="$colorMode.value === 'dark'">
            <img src="/gradient-pattern-square.webp" class="h-[200px] " alt="">
          </div>
        </div>

      </div>
    </div>

    <div class="relative flex justify-center items-center h-[300px]" v-if="!isLoadingData && fileList?.length <= 0 ">
      <div class="flex flex-col justify-center items-center relative z-10 gap-2">
        <UIcon name="i-lucide-layout-template" class="h-12 w-12"></UIcon>
        <h2 class="text-2xl font-bold">Storage is empty, <span class="underline cursor-pointer" @click="selectFile">add</span> new file</h2>
      </div>
      <div class="absolute left-0 top-0 flex w-full h-full items-center justify-center" 
      v-if="$colorMode.value === 'dark'">
        <img src="/gradient-pattern-square.webp" class="h-[200px] " alt="">
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>