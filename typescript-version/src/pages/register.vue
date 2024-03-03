<script setup>
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import logo from "@images/logo.svg?raw";

import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const nouvNom = ref("");
const nouvPrenom = ref("");
const nouvNumTel = ref("");
const nouvNumCIN = ref("");
const nouvEmail = ref("");
const nouvPassword = ref("");

const erreurNom = ref("");
const erreurPrenom = ref("");
const erreurNumeroTelephone = ref("");
const erreurNumeroCIN = ref("");
const erreurEmail = ref("");
const erreurPassword = ref("");

const nbEmail = ref(0);
function resetErrors()
  {
      erreurNom.value = ""
      erreurPrenom.value = ""
      erreurNumeroTelephone.value = ""
      erreurNumeroCIN.value = ""
      erreurEmail.value = ""
      erreurPassword.value = ""
  }
function ajoutBase() {
  fetch("https://localhost:7012/api/Login/"+nouvEmail.value)
      .then((response) => response.json())
      .then((data) => (nbEmail.value = data))
      .then(() => {
      resetErrors()
      if (nouvNom.value === "") erreurNom.value = "Veuillez remplir ce champ !";
      if (nouvPrenom.value === "")
        erreurPrenom.value = "Veuillez remplir ce champ !";
      if (nouvNumTel.value === "")
        erreurNumeroTelephone.value = "Veuillez remplir ce champ !";
      if (nouvNumCIN.value === "")
        erreurNumeroCIN.value = "Veuillez remplir ce champ !";
      if (nouvPassword.value === "")
        erreurPassword.value = "Veuillez remplir ce champ !";
      if (nouvEmail.value === "")
        erreurEmail.value = "Veuillez remplir ce champ !";
      if (nbEmail.value > 0) erreurEmail.value = "Email Deja existe";
     
    }).then( ()=> {
  if (
    !(
      erreurNom.value ||
      erreurPrenom.value ||
      erreurNumeroTelephone.value ||
      erreurNumeroCIN.value ||
      erreurEmail.value ||
      erreurPassword.value
    )
  ) {
    fetch("https://localhost:7012/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: nouvEmail.value,
        motDePasse: nouvPassword.value,
        type: "visiteur"
      }),
    }).then(
       fetch("https://localhost:7012/api/Login/maxId")
        .then((response) => response.json())
        .then((data) => {
          fetch("https://localhost:7012/api/Visiteur", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nom: nouvNom.value,
              prenom: nouvPrenom.value,
              numTel: nouvNumTel.value,
              cin: nouvNumCIN.value,
              loginId: data + 1,
              login: {
                id: data + 1,
                email: "string",
                motDePasse: "string",
                type: "visiteur"
              },
            }),
          }).then(() => {
            router.push({ path: "/login", forceReload: true });
          });
        })
    );
  }})



}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary" v-html="logo" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold"> ZoneFranche </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2 text-center">
        <h5 class="text-h5 mb-1">Système d'accès à la zone Franche</h5>
      </VCardText>

      <VForm @submit.prevent="() => {}">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField v-model="nouvNom" label=" Le Nom" placeholder="Nom" />
            <span class="error-message">{{ erreurNom }}</span>
          </VCol>

          <!-- 👉  -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="nouvPrenom"
              label="Le Prénom"
              placeholder="Prénom"
            />
            <span class="error-message">{{ erreurPrenom }}</span>
          </VCol>

          <!-- 👉 Country -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="nouvNumTel"
              label="Numéro Téléphone"
              placeholder="Numéro Téléphone"
            />
            <span class="error-message">{{ erreurNumeroTelephone }}</span>
          </VCol>

          <!-- 👉 Company -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="nouvNumCIN"
              label="Numero CIN"
              placeholder="Numero CIN"
            />
            <span class="error-message">{{ erreurNumeroCIN }}</span>
          </VCol>

          <!-- 👉 Company -->
          <VCol cols="12">
            <VTextField v-model="nouvEmail" label="Email" placeholder="Email" />
            <span class="error-message">{{ erreurEmail }}</span>
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="nouvPassword"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <span class="error-message">{{ erreurPassword }}</span>
          </VCol>
          <VCol cols="12">
            <VBtn type="submit" @click="ajoutBase"> Soumettre </VBtn>
          </VCol>

          <!-- login instead -->
          <VCol cols="12" class="text-center text-base">
            <span>Vous avez déjà un compte?</span>
            <RouterLink class="text-primary ms-2" to="/login">
              Connectez-vous plutôt
            </RouterLink>
          </VCol>
        </VRow>
      </VForm>
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
