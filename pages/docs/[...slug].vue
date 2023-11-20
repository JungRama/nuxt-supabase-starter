<template>
  <main>
    <div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div class="fixed top-0 left-0 w-full h-full before:absolute before:top-0 before:start-1/2 before:bg-[url('/landing-pattern-square.svg')] before:bg-no-repeat before:w-full before:h-full before:-z-[1] before:transform before:bg-bottom before:-translate-x-1/2 dark:before:bg-[url('/landing-pattern-square-dark.svg')]"></div>
      <div class="max-w-[600px] mx-auto px-3 mt-32 z-10">
        <article class="prose prose-primary dark:prose-invert">
          <ContentDoc />
        </article>
      </div>
    </div>
  </main>
</template>