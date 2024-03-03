<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const nouvNom = ref('');
const nouvPrenom = ref('');
const nouvNumTel = ref('');
const nouvNumCIN = ref('');
const nouvEmail = ref('');
const erreurNom = ref('');
const erreurPrenom = ref('');
const erreurNumeroTelephone = ref('');
const erreurNumeroCIN = ref('');
const erreurEmail = ref('');


function ajouterVisiteur() {
  if (nouvNom.value === '') erreurNom.value = 'Veuillez remplir ce champ !';
  if (nouvPrenom.value === '') erreurPrenom.value = 'Veuillez remplir ce champ !';
  if (nouvNumTel.value === '') erreurNumeroTelephone.value = 'Veuillez remplir ce champ !';
  if (nouvNumCIN.value === '') erreurNumeroCIN.value = 'Veuillez remplir ce champ !';
  if (nouvEmail.value === '') erreurEmail.value = 'Veuillez remplir ce champ !';
  if (!(erreurNom.value || erreurPrenom.value || erreurNumeroTelephone.value || erreurNumeroCIN.value || erreurEmail.value)) {
    fetch("https://localhost:7012/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        email: nouvEmail.value,
        motDePasse: "null",
        type: "visiteur"
      }),
    })
      .then(
        fetch("https://localhost:7012/api/Login/maxId")
          .then(response => response.json())
          .then(data => {
            fetch("https://localhost:7012/api/Visiteur", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },

              body: JSON.stringify({
                nom: nouvNom.value,
                prenom: nouvPrenom.value,
                numTel: nouvNumTel.value,
                cin: nouvNumCIN.value,
                loginId: data + 1,
                login: {
                  "id": data + 1,
                  "email": "string",
                  "motDePasse": "string",
                  "type": "visiteur"

                }
              }),
            }).then(() => {
        router.push({ path: '/AffichageTableVisiteur', forceReload: true });
      });

          })
      )
  }
}


function resetForm() {
  // Réinitialisez vos variables ref ici
  nouvNom.value = '';
  nouvPrenom.value = '';
  nouvNumTel.value = '';
  nouvNumCIN.value = '';
  nouvEmail.value = '';

  // Réinitialisez vos messages d'erreur ici
  erreurNom.value = '';
  erreurPrenom.value = '';
  erreurNumeroTelephone.value = '';
  erreurNumeroCIN.value = '';
  erreurEmail.value = '';

  // Revenez à la page contenant le tableau
  router.back();
}
</script>

<template>
  <VForm @submit.prevent="() => { }">

    <VRow>
      <!-- 👉  -->
      <VCol cols="12" md="6">
        <VTextField v-model="nouvNom" label=" Le Nom" placeholder="Nom" />
        <span class="error-message">{{ erreurNom }}</span>
      </VCol>

      <!-- 👉  -->
      <VCol cols="12" md="6">
        <VTextField v-model="nouvPrenom" label="Le Prénom" placeholder="Prénom" />
        <span class="error-message">{{ erreurPrenom }}</span>
      </VCol>

      <!-- 👉 Country -->
      <VCol cols="12" md="6">
        <VTextField v-model="nouvNumTel" label="Numéro Téléphone" placeholder="Numéro Téléphone" />
        <span class="error-message">{{ erreurNumeroTelephone }}</span>
      </VCol>

      <!-- 👉 Company -->
      <VCol cols="12" md="6">
        <VTextField v-model="nouvNumCIN" label="Numero CIN" placeholder="Numero CIN" />
        <span class="error-message">{{ erreurNumeroCIN }}</span>
      </VCol>

      <!-- 👉 Company -->
      <VCol cols="12" md="6">
        <VTextField v-model="nouvEmail" label="Email" placeholder="Email" />
        <span class="error-message">{{ erreurEmail }}</span>
      </VCol>
      <VCol cols="12" class="d-flex gap-4">
        <VBtn type="submit" @click="ajouterVisiteur">
          Soumettre
        </VBtn>
        <VBtn type="reset" color="secondary" variant="tonal" @click="resetForm">
          Réinitialiser
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
<style>


</style>