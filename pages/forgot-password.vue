<script setup lang="ts">
  import { forgotPasswordValidation, type SchemaForgotPasswordValidation } from '~/utils/formValidation'
  import type { FormSubmitEvent } from '#ui/types'

  definePageMeta({
    middleware: 'guest'
  })

  const { auth } = useSupabaseClient()
  const toast = useToast()
  const runtimeConfig = useRuntimeConfig();
  
  const form = reactive({
    email: undefined,
  })
  const isLoading = ref(false)

  /**
   * Sign in with credential.
   *
   * @param {FormSubmitEvent<SchemaForgotPasswordValidation>} event - The form submit event.
   * @return {Promise<void>} A promise that resolves when the forgot password process is complete.
   */
  const sendForgotPassworEmail = async (event: FormSubmitEvent<SchemaForgotPasswordValidation>) => {
    try {
      isLoading.value = true

      if(!form.email) return

      const forgotPassword = await auth.resetPasswordForEmail(form.email, {
        redirectTo: `http://localhost:3000/reset-password`
      })

      if(forgotPassword.error) {
        throw forgotPassword.error.message
      }

      navigateTo('/sign-in')

      toast.add({
        color: "green",
        icon: "i-lucide-mail-check",
        title: 'Success sending reset password link to your email!',
      })

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
      <div class="flex h-[100vh] w-full justify-center items-center">
        <div class="w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12">
          <UCard>
            <UForm :schema="forgotPasswordValidation" :state="form" class="space-y-2" @submit="sendForgotPassworEmail">
              <div class="space-y-4">
                <div class="flex justify-center">
                  <img src="/icon.svg" class="h-[80px]">
                </div>

                <p class="text-lg font-bold text-center">Enter email that are registered on the platform</p>

                <UFormGroup label="Email" name="email">
                  <UInput v-model="form.email" />
                </UFormGroup>

                <UButton 
                :loading="isLoading"
                :disabled="isLoading"
                type="submit" label="Send Reset Password Link" color="gray" block />
              </div>
            </UForm>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>