<script setup lang="ts">
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import logo from '@images/logo.svg?raw'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          sneat
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2 text-center">
        <h5 class="text-h5 mb-1">
          Système d'accès à la zone Franche
        </h5>
        
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="$router.push('/')">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                autofocus
                label="Nom"
                placeholder="Votre Nom"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="Votre Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Mot de passe"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  <span class="me-1">Je suis d'accord pour</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >politique de confidentialité et conditions</a>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
              S'inscrire
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Vous avez déjà un compte?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/login"
              >
              Connectez-vous plutôt
              </RouterLink>
            </VCol>

       <!--    <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>--> 

            <!-- auth providers 
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>-->
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
