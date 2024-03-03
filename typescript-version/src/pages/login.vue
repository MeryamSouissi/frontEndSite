<script setup >
import logo from '@images/logo.svg?raw'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { isLoggedIn,userLogin } from '../utils/global.ts'

isLoggedIn.value = false
const router = useRouter()
const email = ref('')
const password = ref('')
const user =ref({})
const isPasswordVisible = ref(false)
const errorLogin = ref('')
 

const erreurEmail = ref("");
const erreurPassword = ref("");
function reset()
{
  erreurPassword.value = ""
  erreurEmail.value = ""
  errorLogin.value = ""
}
function Authenticate()
{
  reset()
  if (password.value === "") erreurPassword.value = "Veuillez remplir ce champ !";
  if (email.value === "") erreurEmail.value = "Veuillez remplir ce champ !";
  if (!(erreurEmail.value || erreurPassword.value)) {

  fetch("https://localhost:7012/api/Login/"+email.value+"/"+password.value)
  .then((response) => response.json())
  .then((data) => (user.value = data))
  .then(() => {
        if(user != null){
          router.push('/') 
          isLoggedIn.value = true
          userLogin.value = user.value
        }
        else {errorLogin.value = "ce compte n'existe pas " }
    }
  )
    }
}
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
          ZoneFranche
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenue chez ZoneFranche ! 👋🏻
        </h5>
        <p class="mb-0">
          Veuillez vous connecter à votre compte et commencer l'aventure
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
              v-model="email"
                autofocus
                placeholder ="Votre Email"
                label="Email"
                type="email"
              />
              <span class="error-message">{{erreurEmail}}</span>

            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="password"
                label="Mot de passe"
                placeholder=""
                :type="isPasswordVisible ? 'password' : 'text'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <span class="error-message">{{erreurPassword}}</span>

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">

              </div>
              <!-- login button -->
              <span class="error-message">{{ errorLogin }}</span>

              <VBtn
                block
                type="submit"
                @click="Authenticate"
              >
              Se connecter
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Nouveau sur notre plateforme ?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
              Créer un compte
              </RouterLink>
            </VCol>
         <!--   <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

             auth providers 
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
.error-message {
  color: red;
  font-size: 12px;
}
</style>
