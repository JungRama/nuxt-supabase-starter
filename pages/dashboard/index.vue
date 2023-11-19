<script setup lang="ts">
  import { charts , library, feature} from '~/static/static-dashboard'
</script>

<template>
  <div class="w-full mx-auto my-16 space-y-[30px] max-w-7xl">
    <!-- /* ------------------------------- Charts Data ------------------------------ */ -->
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
    
    <!-- /* ------------------------------- Welcome Message ------------------------------ */ -->
    <h1 class="text-2xl font-bold pt-5 max-w-[400px]">
      Welcome to Nuxt Supabase Starter
    </h1>
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <!-- /* ------------------------------- Library List ------------------------------ */ -->
      <div class="col-span-12 md:col-span-6 lg:col-span-6">
        <UCard class="h-full flex flex-col justify-start">
          <p class="mb-3 text-2xl">✨ Library List</p>
          <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
            <div class="col-span-12 md:col-span-6 lg:col-span-6" v-for="(item, index) in library" :key="index">
              <div class="pointer-events-none">
                <UCheckbox v-model="item.isDone" :name="item.title" :label="item.title" />
              </div>
              <p class="text-sm ml-7 opacity-50">{{ item.description }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- /* ------------------------------- Repository ------------------------------ */ -->
      <div class="col-span-12 md:col-span-3 lg:col-span-3">
        <UCard class="h-full flex flex-col justify-start">
          <p class="mb-3 text-2xl">🚀 Feature List</p>
          <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
            <div class="col-span-12 md:col-span-12 lg:col-span-12" v-for="(item, index) in feature" :key="index">
              <div class="pointer-events-none">
                <UCheckbox v-model="item.isDone" :name="item.title" :label="item.title" />
              </div>

              <div class="ml-7 mt-1">
                <div v-for="(sub) in item.children" :key="sub.title">
                  <div class="pointer-events-none">
                    <UCheckbox v-model="item.isDone" :name="sub.title" :label="sub.title" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- /* ------------------------------- Social Media ------------------------------ */ -->
      <div class="col-span-12 md:col-span-3 lg:col-span-3">
        <UCard class="h-full flex flex-col justify-center">
          <div class="flex mb-4">
            <a href="https://github.com/JungRama/nuxt-supabase-starter"
              target="_blank" rel="noopener noreferrer">
              <div class="rounded-xl p-4 flex items-center justify-center bg-gray-950">
                <UIcon name="i-lucide-github" class="text-white h-[50px] w-[50px]"></UIcon>
              </div>
            </a>
          </div>

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