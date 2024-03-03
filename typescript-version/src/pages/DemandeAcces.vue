<template>
  <VCard>
    <VCardText>
   <VForm @submit.prevent="() => {}">
      <VRow> 
        <VCol cols="12">
          <VTextField
            v-model="dateEntree"
            label="Date d'Entrée"
            type="date"
            :rules="dateRules"
          />
          <span class="error-message">{{ dateError }}</span>
        </VCol>

        <VCol cols="12">
          <VTextField
            v-model="raisonVisite"
            label="Raison de la Visite"
            placeholder="Motif de la visite"
            :rules="raisonRules"
          />
          <span class="error-message">{{ raisonError }}</span>
        </VCol>
  
        <VCol cols="12">
          <VBtn type="submit" @click="submitForm">
            Envoyer demande 
          </VBtn>
        </VCol>

      </VRow>
    </VForm>
  </VCardText>
  </VCard>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; 
  import { userLogin } from "../utils/global.ts"


  const router = useRouter(); 
  const dateEntree = ref('');
  const raisonVisite = ref('');

    
  const dateRules = [
    value => !!value || 'Veuillez sélectionner une date',
  ];
  
  const raisonRules = [
    value => !!value || 'Veuillez remplir ce champ',
  ];


  function submitForm() {
    fetch("https://localhost:7012/api/Visiteur/bylogin/"+userLogin.value.id)
  .then(response => response.json())
  .then(data => {
    if(!(raisonVisite.value =='' || dateEntree.value=='')){
      fetch("https://localhost:7012/api/Demande", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dateEntree: dateEntree.value,
            raisonViste: raisonVisite.value,
            etat : "en cours de traitement",
            idVisiteur: data,
            visiteur: {
            "id": 0,
            "nom": "string",
            "prenom": "string",
            "numTel": "string",
            "cin": "string",
            "loginId": 2,
            "login": {
                  "id": 2,
                  "email": "string",
                  "motDePasse": "string",
                  "type" : "visiteur"
                }
    }
          }),
        })
        .then(() => {
    router.push({ path: '/MesDemandes', forceReload: true });
  });}
})
} 
  </script>
  
  <style>
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  