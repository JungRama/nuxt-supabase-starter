<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard'
  })

  const charts = [
    {
      title: 'Notes',
      icon: 'i-lucide-sticky-note',
      subTitle: 'This chart is dummy',
      total: 100000,
    },
    {
      title: 'Storage Used',
      icon: 'i-lucide-align-vertical-justify-end',
      subTitle: 'This chart is dummy',
      total: 20000,
    },
    {
      title: 'Used Quota',
      icon: 'i-lucide-battery-full',
      subTitle: 'This chart is dummy',
      total: 40000,
    },
    {
      title: 'Credibility',
      icon: 'i-lucide-bird',
      subTitle: 'This chart is dummy',
      total: 80000,
    }
  ]

  const feature = [
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
    {
      title: 'Nuxt UI',
      description : 'Ui library provided by Nuxt JS',
      isDone: true
    },
  ]
</script>
<template>
  <div class="w-full mx-auto my-16 space-y-[30px] max-w-7xl">
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <div class="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3" v-for="item in charts">
        <UCard class="h-full flex flex-col justify-center">
          <div class="flex gap-2">
            <div class="rounded-full bg-primary h-8 w-8 flex items-center justify-center text-black">
              <UIcon :name="item.icon" />
            </div>
            <p class="mb-0 text-lg opacity-60">{{item.title}}</p>
          </div>
          
          <div class="mt-3 mb-14">
            <p class="opacity-60 text-sm">{{ item.subTitle }}</p>
            <p class="text-foreground font-normal text-2xl -mt-1">{{Intl.NumberFormat().format(item.total)}}</p>
          </div>
          <Chart></Chart>
        </UCard>
      </div>
    </div>


    
    <h1 class="text-2xl font-bold pt-5 max-w-[400px]">
      Welcome to Nuxt Supabase Starter
    </h1>
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <div class="col-span-12 md:col-span-6 lg:col-span-6">
        <UCard class="h-full flex flex-col justify-start">
          <p class="mb-3 text-2xl">✨ Library List</p>
          <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
            <div class="col-span-12 md:col-span-6 lg:col-span-6" v-for="(item, index) in feature" :key="index">
              <div class="pointer-events-none">
                <UCheckbox v-model="item.isDone" :name="item.title" :label="item.title" />
              </div>
              <p class="text-sm ml-7 opacity-50">{{ item.description }}</p>
            </div>
          </div>
        </UCard>
      </div>
      <div class="col-span-12 md:col-span-3 lg:col-span-3">
        <a href="https://github.com/JungRama/nuxt-supabase-starter"
        target="_blank" rel="noopener noreferrer"
        class="h-full">
        <UCard class="h-full flex flex-col justify-center">
          <div class="flex flex-col items-center justify-center gap-3">
            <UIcon name="i-lucide-github" class="h-[100px] w-[100px]"></UIcon>
            <p class="text-sm text-center underline px-3">View Repository</p>
          </div>
        </UCard>
        </a>
      </div>
      <div class="col-span-12 md:col-span-3 lg:col-span-3">
        <UCard class="h-full flex flex-col justify-center">
          <div class="flex flex-col justify-center gap-3">
            <h2 class="text-2xl font-bold">
              Follow my social media
            </h2>
            <a href="https://x.com/jungrama_id" target="_blank" rel="noopener noreferrer" class="opacity-70 underline">X, @jungrama_id</a>
            <a href="https://github.com/JungRama" target="_blank" rel="noopener noreferrer" class="opacity-70 underline">Github, @JungRama</a>
            <a href="https://www.linkedin.com/in/jungrama/" target="_blank" rel="noopener noreferrer" class="opacity-70 underline">LinkedIn, in/jungrama</a>
          </div>
        </UCard>
      </div>

    </div>
  </div>
</template>


<style scoped>

</style>