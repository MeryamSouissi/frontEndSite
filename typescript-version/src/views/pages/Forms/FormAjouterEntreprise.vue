<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();
const nouvId = ref('');
const nouvNom = ref('');
const nouvHeure = ref('');
const nouvEmail = ref('');
const nouvNumeroDirecteur = ref('');
const nouvDescription = ref('');
const erreurNom = ref('');
const erreurHeure = ref('');
const erreurEmail = ref('');
const erreurNumeroDirecteur = ref('');
const erreurDescription = ref('');
const nouvFile = ref(null)

function onFileSelected(event) {

      nouvFile.value = event.target.files[0];
}
function ajouterEntreprise() {
  if (nouvNom.value === '') erreurNom.value = 'Veuillez remplir ce champ !';
  if (nouvHeure.value === '') erreurHeure.value = 'Veuillez remplir ce champ !';
  if (nouvEmail.value === '') erreurEmail.value = 'Veuillez remplir ce champ !';
  if (nouvNumeroDirecteur.value === '') erreurNumeroDirecteur.value = 'Veuillez remplir ce champ !';
  if (nouvDescription.value === '') erreurDescription.value = 'Veuillez remplir ce champ !';

  if (!(erreurNom.value || erreurHeure.value || erreurEmail.value || erreurNumeroDirecteur.value || erreurDescription.value)) {
        

    fetch("https://localhost:7012/api/Entreprise", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: nouvNom.value,
            heureDeTravail: nouvHeure.value,
            email: nouvEmail.value,
            numeroDirecteur: nouvNumeroDirecteur.value,
            description: nouvDescription.value,
            path : nouvNom.value+'.jpg'
          }),
        })
        .then(() => { 
          let formData = new FormData();
          formData.append('file', nouvFile.value);
          fetch("https://localhost:7012/api/Image/upload/"+nouvNom.value+".jpg", {
          method: 'POST',
          body: formData,
         }).then(() => { router.push({ path: '/AffichageTableEntreprise', forceReload: true })})
      });
      }}

  function resetForm() {
  // Réinitialisez vos variables ref ici
  nouvNom.value = '';
  nouvHeure.value = '';
  nouvEmail.value = '';
  nouvNumeroDirecteur.value = '';
  nouvDescription.value = '';
  
  // Réinitialisez vos messages d'erreur ici
  erreurNom.value = '';
  erreurHeure.value = '';
  erreurEmail.value = '';
  erreurNumeroDirecteur.value = '';
  erreurDescription.value = '';

  // Revenez à la page contenant le tableau
  router.push({ path: '/AffichageTableEntreprise', forceReload: true });
} 
</script>

<template>
  <VForm @submit.prevent="() => {}">
 
    <VRow>

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
          v-model="nouvHeure"
          label="Heures de Travail"
          placeholder="Heures de Travail"
          
        />
        <span class="error-message">{{ erreurHeure }}</span>
      </VCol>

      <!-- 👉 Country -->
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

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvNumeroDirecteur"
          label="Numero Directeur"
          placeholder="Numero Directeur"
          
        />
        <span class="error-message">{{ erreurNumeroDirecteur }}</span>
      </VCol>

      <!-- 👉 Company -->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvDescription"
          label="Description"
          placeholder="Description"
          
        />
        <span class="error-message">{{ erreurDescription }}</span>
      </VCol>
 <!-- 👉 file -->
      <VCol
        cols="12"
        md="6"
      >
      <VTextField
    inputmode="file"
    type="file"
    @change="onFileSelected"
/>
      </VCol>
      <VCol
        cols="12"
        class="d-flex gap-4"
      >
  
        <VBtn type="submit" @click="ajouterEntreprise">
          Soumettre
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
          @click="resetForm"

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
