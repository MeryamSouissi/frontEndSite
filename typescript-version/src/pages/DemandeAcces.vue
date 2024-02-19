<template>
   <VForm @submit.prevent="() => {}">
      <VRow> 

        <VCol cols="12">
          <VTextField
            v-model="IdVisiteur"
            label="ID du Visiteur"
            placeholder="Id du visiteur"
            :rules="idRules"
          />
          <span class="error-message">{{ nomError }}</span>
        </VCol>

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
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; 

  const router = useRouter(); 
  const dateEntree = ref('');
  const raisonVisite = ref('');
  const IdVisiteur = ref('');

    
  const dateRules = [
    value => !!value || 'Veuillez sélectionner une date',
  ];
  
  const raisonRules = [
    value => !!value || 'Veuillez remplir ce champ',
  ];

  function submitForm() {
    if(!(IdVisiteur.value == '' || raisonVisite.value =='' || dateEntree.value=='')){
      fetch("https://localhost:7012/api/Demande", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            dateEntree: dateEntree.value,
            raisonViste: raisonVisite.value,
            etat : "en cours de traitement",
            idVisiteur: IdVisiteur.value,
            visiteur: {
            "id": 0,
            "nom": "string",
            "prenom": "string",
            "numTel": "string",
            "cin": "string",
            "loginId": 0,
            "login": {
                  "id": 0,
                  "email": "string",
                  "motDePasse": "string",
                  "type" : "string"
                }
    }
          }),
        })
        .then(() => {
    router.push({ path: '/MesDemandes', forceReload: true });
  });}
} 
  </script>
  
  <style>
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  