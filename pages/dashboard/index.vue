<script setup lang="ts">
  import { charts } from '~/static/static-dashboard'
  
  useSeoMeta({
    title: 'Dashboard - Nuxt Supabase Starter',
  })
</script>

<template>
  <div class="w-full mx-auto my-16 space-y-[30px] max-w-7xl">
    <!-- /* ------------------------------- Charts Data ------------------------------ */ -->
    <div class="grid grid-cols-12 gap-[15px] lg:gap-[15px]">
      <div class="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3" v-for="item in charts">
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
    <ProductInformation></ProductInformation>

  </div>
</template>


<style scoped>

</style>