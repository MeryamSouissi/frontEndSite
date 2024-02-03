<script setup >
import { useTheme } from 'vuetify'
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'

const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)
import { ref } from 'vue';
import {useRouter} from 'vue-router';
const router = useRouter();
const nouvId = ref('');
const nouvNom = ref('');
const nouvHeure = ref('');
const nouvEmail = ref('');
const nouvNumeroDirecteur = ref('');
const nouvDescription = ref('');
const erreurId = ref('');
const erreurNom = ref('');
const erreurHeure = ref('');
const erreurEmail = ref('');
const erreurNumeroDirecteur = ref('');
const erreurDescription = ref('');
const erreurFile = ref('');


function loadData() {
    fetch("https://localhost:7012/api/Entreprise")
      .then(response => response.json())
      .then(data => tableEntreprises.value = data)
      .catch(error => console.error('Error loading data:', error));
}  

function DescriptionEntreprise() {
  if (nouvId.value === '') erreurId.value = 'Veuillez remplir ce champ !';
  if (nouvNom.value === '') erreurNom.value = 'Veuillez remplir ce champ !';
  if (nouvHeure.value === '') erreurHeure.value = 'Veuillez remplir ce champ !';
  if (nouvEmail.value === '') erreurEmail.value = 'Veuillez remplir ce champ !';
  if (nouvNumeroDirecteur.value === '') erreurNumeroDirecteur.value = 'Veuillez remplir ce champ !';
  if (nouvDescription.value === '') erreurDescription.value = 'Veuillez remplir ce champ !';
  if (nouvFile.value === '') erreurFile.value = 'Veuillez remplir ce champ !';

  if (!(erreurId.value || erreurNom.value || erreurHeure.value || erreurEmail.value || erreurNumeroDirecteur.value || description.value || nouvFile.value)) {
        fetch("https://localhost:7012/api/Entreprise", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: nouvId.value,
            nom: nouvNom.value,
            heureDeTravail: nouvHeure.value,
            email: nouvEmail.value,
            numeroDirecteur: nouvNumeroDirecteur.value,
            description: nouvDescription.value,
            file: nouvFile.value,
          }),
        })
        .then(() => { router.push({ path: '/account-settings', forceReload: true }); 
      });
      }}

function resetForm() {
  // Réinitialisez vos variables ref ici
  nouvId.value = '';
  nouvNom.value = '';
  nouvHeure.value = '';
  nouvEmail.value = '';
  nouvNumeroDirecteur.value = '';
  nouvDescription.value = '';
  file.value = '';
  
  // Réinitialisez vos messages d'erreur ici
  erreurId.value = '';
  erreurNom.value = '';
  erreurHeure.value = '';
  erreurEmail.value = '';
  erreurNumeroDirecteur.value = '';
  erreurDescription.value = '';
  erreurFile.value = '';


  // Revenez à la page contenant le tableau
  router.push({ path: '/account-settings', forceReload: true });
} 
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
           {{}}
          </VCardTitle>
        </VCardItem> 

        <VCardText>
          <span>
            {{}}
            <br>
           {{}}
          </span>
          <br>
        <!--  <VBtn
            variant="tonal"
            class="mt-4"
            size="small"
          >
            View Badges
          </VBtn>-->
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center"
      >
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '175'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}
</style>
