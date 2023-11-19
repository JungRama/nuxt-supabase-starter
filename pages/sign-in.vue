<script setup lang="ts">
  import { signInValidation, type SchemaSignInValidation } from '~/utils/formValidation'
  import { BaseError, useErrorHandler } from '~/composables/use-error-handler'
  import type { FormSubmitEvent } from '#ui/types'

  definePageMeta({
    middleware: 'guest'
  })

  const { auth } = useSupabaseClient()
  const { errorHandler } = useErrorHandler()
  
  const form = reactive({
    email: undefined,
    password: undefined
  })
  const isLoading = ref(false)

  /**
   * Sign in with credential.
   *
   * @param {FormSubmitEvent<SchemaSignInValidation>} event - The form submit event.
   * @return {Promise<void>} A promise that resolves when the sign-in process is complete.
   */
  const signInWithCredential = async (event: FormSubmitEvent<SchemaSignInValidation>) => {
    try {
      isLoading.value = true
      
      const signIn = await auth.signInWithPassword({
        email: form.email ?? '',
        password: form.password ?? ''
      })

      if(signIn.error) {
        throw new BaseError(signIn.error.status, signIn.error.message)
      }

      navigateTo('/dashboard')
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      errorHandler(error as BaseError)
    }
  }

  /**
   * Sign in with a provider.
   *
   * @param {string} provider - The provider to sign in with. Can be 'GITHUB' or 'GOOGLE'.
   */
  const signInWithProvider = async (provider: 'GITHUB' | 'GOOGLE') =>  {
    try {
      isLoading.value = true
      
      let signIn = null

      if(provider === 'GITHUB') {
        signIn = await auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: '/confirm',
          }
        })
      }

      if(signIn?.error) {
        throw new BaseError(signIn.error.status, signIn.error.message)
      }

      navigateTo('/dashboard')
      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      errorHandler(error as BaseError)
    }
  }
</script>

<template>
  <div>
    <div class="container mx-auto">
      <div class="flex h-[100vh] w-full justify-center items-center">
        <div class="w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12">
          <UCard>
            <UForm :schema="signInValidation" :state="form" class="space-y-2" @submit="signInWithCredential">
              <div class="space-y-4">
                <div class="flex justify-center">
                  <img src="/icon.svg" class="h-[80px]">
                </div>

                <p class="text-lg font-bold text-center">Welcome Back, enter your credential below.</p>

                <UFormGroup label="Email" name="email">
                  <UInput v-model="form.email" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                  <UInput v-model="form.password" type="password" />
                </UFormGroup>
                <div class="flex items-center gap-1 justify-start mt-3 text-xs">
                  <p class="opacity-50">Forgot your password?</p>
                  <NuxtLink to="/forgot-password" class="underline">click here</NuxtLink>
                </div>

                <UButton 
                :loading="isLoading"
                :disabled="isLoading"
                type="submit" label="Login" color="gray" block />
              </div>
              <UDivider label="or" color="gray" orientation="vertical" />

              <div class="space-y-4 flex flex-col justify-center">
                <UButton 
                @click="signInWithProvider('GITHUB')"
                :disabled="isLoading"
                color="black" label="Continue with GitHub" 
                icon="i-lucide-github" block />
              </div>
            </UForm>
          </UCard>

          <div class="flex items-center gap-2 justify-center mt-3">
            <p class="opacity-50">Don't have an account?</p>
            <NuxtLink to="/sign-up" class="underline">Sign up</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>