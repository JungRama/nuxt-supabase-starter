<script setup>
  import {library, feature} from '~/static/static-dashboard'
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <!-- /* ------------------------------- Library List ------------------------------ */ -->
      <div class="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-6">
        <UCard class="h-full flex flex-col justify-start">
          <p class="mb-3 text-2xl">✨ Library List</p>
          <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
            <div class="col-span-12 md:col-span-6 lg:col-span-6" v-for="(item, index) in library" :key="index">
              <div class="pointer-events-none">
                <UCheckbox v-model="item.isDone" :name="item.title" :label="item.title" />
              </div>
              <p class="text-sm ml-7 text-gray-400">{{ item.description }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- /* ------------------------------- Repository ------------------------------ */ -->
      <div class="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-3">
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
      <div class="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-3">
        <UCard class="h-full flex flex-col justify-start">
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
