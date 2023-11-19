<script setup lang="ts">
  import { resetPasswordValidation, type SchemaResetPasswordValidation } from '~/utils/formValidation'
  import type { FormSubmitEvent } from '#ui/types'
  import { BaseError, useErrorHandler } from '~/composables/use-error-handler'

  const { auth } = useSupabaseClient()
  const toast = useToast()
  const { errorHandler } = useErrorHandler()
  
  const form = reactive({
    password: undefined
  })
  const isLoading = ref(false)

  /**
   * Reset password.
   *
   * @param {FormSubmitEvent<SchemaResetPasswordValidation>} event - The form submit event.
   * @return {Promise<void>} A promise that resolves when the sign-in process is complete.
   */
  const signInWithCredential = async (event: FormSubmitEvent<SchemaResetPasswordValidation>) => {
    try {
      isLoading.value = true

      const resetPassword = await auth.updateUser({
        password: form.password ?? ''
      })

      if(resetPassword.error) {
        throw new BaseError(resetPassword.error.status, resetPassword.error.message)
      }

      navigateTo('/sign-in')

      toast.add({
        color: "green",
        icon: "i-lucide-lock-keyhole",
        title: 'Success resetting password!',
      })

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
            <UForm :schema="resetPasswordValidation" :state="form" class="space-y-2" @submit="signInWithCredential">
              <div class="space-y-4">
                <div class="flex justify-center">
                  <img src="/icon.svg" class="h-[80px]">
                </div>

                <p class="text-lg font-bold text-center">Enter new password below!</p>

                <UFormGroup label="New Password" name="password">
                  <UInput v-model="form.password" type="password" />
                </UFormGroup>

                <UButton 
                :loading="isLoading"
                :disabled="isLoading"
                type="submit" label="Reset Password" color="gray" block />
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