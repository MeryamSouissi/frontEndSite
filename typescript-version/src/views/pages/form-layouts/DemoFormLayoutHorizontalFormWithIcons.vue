<script setup>
 import { ref } from 'vue';
  import {useRouter} from 'vue-router';
  const router=useRouter();
  const nouvId = ref('');
  const nouvNom = ref('');
  const nouvPrenom = ref('');
  const nouvNumTel = ref('');
  const nouvNumCIN = ref('');
  const nouvEmail = ref('');
  const erreurID = ref('');
  const erreurNom = ref('');
  const erreurPrenom = ref('');
  const erreurNumeroTelephone = ref('');
  const erreurNumeroCIN = ref('');
  const erreurEmail = ref('');

  function ajouterEmployee() {
  if (nouvId.value === '') erreurID.value = 'Veuillez remplir ce champ !';
  if (nouvNom.value === '') erreurNom.value = 'Veuillez remplir ce champ !';
  if (nouvPrenom.value === '') erreurPrenom.value = 'Veuillez remplir ce champ !';
  if (nouvNumTel.value === '') erreurNumeroTelephone.value = 'Veuillez remplir ce champ !';
  if (nouvNumCIN.value === '') erreurNumeroCIN.value = 'Veuillez remplir ce champ !';
  if (nouvEmail.value === '') erreurEmail.value = 'Veuillez remplir ce champ !';

  if (!(erreurID.value || erreurNom.value || erreurPrenom.value || erreurNumeroTelephone.value || erreurNumeroCIN.value|| erreurEmail.value)) {
        fetch("https://localhost:7012/api/Employee", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            id: nouvId.value,
            nom: nouvNom.value,
            prenom: nouvPrenom.value,
            numTel: nouvNumTel.value,
            cin: nouvNumCIN.value,
            email: nouvEmail.value,
          }),
        })
        .then(() => {
    router.push({ path: '/account-settings', forceReload: true });
  });
}}
</script>

<template>
  <VForm @submit.prevent="() => {}">
 
    <VRow>
      <!-- 👉 First Name -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvId"
          label="ID"
          placeholder="ID"        
        />
        <span class="error-message">{{ erreurID }}</span>
      </VCol>

      <!-- 👉  -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvNom"
          label=" Le Nom"
          placeholder="Nom"       
        />
        <span class="error-message">{{ erreurNom }}</span>
      </VCol>

      <!-- 👉  -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvPrenom"
          label="Le Prénom"
          placeholder="Prénom"
          
        />
        <span class="error-message">{{ erreurPrenom }}</span>
      </VCol>

      <!-- 👉 Country -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvNumTel"
          label="Numéro Téléphone"
          placeholder="Numéro Téléphone"
          
        />
        <span class="error-message">{{ erreurNumeroTelephone }}</span>
      </VCol>

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvNumCIN"
          label="Numero CIN"
          placeholder="Numero CIN"
          
        />
        <span class="error-message">{{ erreurNumeroCIN }}</span>
      </VCol>
      
      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvEmail"
          label="Email"
          placeholder="Email"  
        />
        <span class="error-message">{{ erreurEmail }}</span>
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit" @click="ajouterEmployee">
          Soumettre
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
        Réinitialiser
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
<style>
.error-message {
  color: red;
  font-size: 12px;
}
</style>