<script setup lang="ts">
  import { signInValidation, type SchemaSignInValidation } from '~/utils/formValidation'
  import type { FormSubmitEvent } from '#ui/types'

  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()

  const toast = useToast()
  
  const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

  watchEffect(() => {
    if (user.value) {
      navigateTo('/dashboard')
    }
  })

  console.log(user.value)

  const form = reactive({
    email: undefined,
    password: undefined
  })

  const isLoading = ref(false)

  const signInWithCredential = async (event: FormSubmitEvent<SchemaSignInValidation>) => {
    try {
      isLoading.value = true

      const signIn = await auth.signInWithPassword({
        email: form.email ?? '',
        password: form.password ?? ''
      })

      if(signIn.error) {
        throw signIn.error.message
      }

      isLoading.value = false
    } catch (error) {

      isLoading.value = false
      toast.add({
        color: "red",
        icon: "i-lucide-alert-triangle",
        title: error as string,
      })
    }
  }

  const signInWithProvider = async (provider: 'GITHUB' | 'GOOGLE') =>  {
    try {
      isLoading.value = true
      
      let signIn = null

      if(provider === 'GITHUB') {
        signIn = await auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: '/confirm',
            // skipBrowserRedirect: true
          }
        })
      }

      if(signIn?.error) {
        throw signIn.error.message
      }

      isLoading.value = false
    } catch (error) {
      isLoading.value = false
      toast.add({
        color: "red",
        icon: "i-lucide-alert-triangle",
        title: error as string,
      })
    }
  }
</script>

<template>
  <div>
    <div class="container mx-auto">
      --{{ user }}
      <div class="flex h-[100vh] w-full justify-center items-center">
        <div class="w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12">
          <UCard>
            <UForm :schema="signInValidation" :state="form" class="space-y-2" @submit="signInWithCredential">
              <div class="space-y-4">
                <div class="flex justify-center">
                  <img src="/icon.svg" class="h-[80px]">
                </div>

                <UFormGroup label="Email" name="email">
                  <UInput v-model="form.email" />
                </UFormGroup>

                <UFormGroup label="Password" name="password">
                  <UInput v-model="form.password" type="password" />
                </UFormGroup>

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
                color="black" label="Login with GitHub" 
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