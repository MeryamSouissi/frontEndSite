<script setup>
 import { ref } from 'vue';
  import {useRouter} from 'vue-router';
  const router=useRouter();
  const nouvId = ref('');
    const nouvNom = ref('');
    const nouvHeure = ref('');
    const nouvEmail = ref('');
    const nouvNumeroDirecteur = ref('');

function ajouterEntreprise() {
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
          }),
        })
        .then(() => {
    router.push({ path: '/tables', forceReload: true });
  });
      }
</script>

<template>
  <VForm @submit.prevent="() => {}">
 
    <VRow>
      <!-- 👉 First Name -->
      <!--rahou y3aned-->
      <VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="nouvId"
          label="ID"
          placeholder="ID"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <!--<VCol
        cols="12"
        md="6"
      >
        <VTextField
          v-model="lastName"
          label="Last Name"
          placeholder="Doe"
        />
      </VCol>-->

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
      </VCol>

      <!-- 👉 Remember me -->
    <!--  <VCol cols="12">
        <VCheckbox
          v-model="checkbox"
          label="Remember me"
        />
      </VCol>-->

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
        >
        Réinitialiser
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
