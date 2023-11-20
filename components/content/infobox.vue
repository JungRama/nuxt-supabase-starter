<!-- ./components/content/InfoBox.vue -->

<script setup>
// import icons from HeroIcons
import { InformationCircleIcon, ExclamationIcon, BanIcon } from "@heroicons/vue/solid";
// define props in <script>
const props = defineProps(["type"]);
</script>
<template>
  <!-- Access `type` prop in Dynamic class  -->
  <div class="info-box not-prose" :class="[type]">
    <!-- Conditionally render icons based on prop -->
    <ExclamationIcon v-if="type == 'warning'" class="icon solid" />
    <BanIcon v-else-if="type == 'error'" class="icon solid" />
    <InformationCircleIcon v-else class="icon solid" />
    <details>
      <summary>
        <!-- Unamed Slot to render component content -->
        <slot />
      </summary>
      <div class="details pt-2">
        <!-- Named markdown component to render rich-text -->
        <Markdown :use="$slots.details" unwrap="p"></Markdown>
      </div>
    </details>
  </div>
</template>
<style scoped> /* ... */ </style>