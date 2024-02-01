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
            v-model="nomVisiteur"
            label="Nom du Visiteur"
            placeholder="Nom du visiteur"
            :rules="nomRules"
          />
          <span class="error-message">{{ nomError }}</span>
        </VCol>
  
        <VCol cols="12">
          <VTextField
            v-model="cinVisiteur"
            label="CIN du Visiteur"
            placeholder="Numéro CIN"
            :rules="cinRules"
          />
          <span class="error-message">{{ cinError }}</span>
        </VCol>
  
        <VCol cols="12">
          <VTextField
            v-model="emailVisiteur"
            label="Email du Visiteur"
            type="email"
            placeholder="email@example.com"
            :rules="emailRules"
          />
          <span class="error-message">{{ emailError }}</span>
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
  const nomVisiteur = ref('');
  const cinVisiteur = ref('');
  const emailVisiteur = ref('');
  const IdVisiteur = ref('');

    
  const dateRules = [
    value => !!value || 'Veuillez sélectionner une date',
  ];
  
  const nomRules = [
    value => !!value || 'Veuillez remplir ce champ',
  ];
  
  const cinRules = [
    value => !!value || 'Veuillez remplir ce champ',
  ];
  
  const emailRules = [
    value => !!value || 'Veuillez remplir ce champ',
    value => /.+@.+\..+/.test(value) || 'Veuillez entrer une adresse email valide',
  ];
  
  const raisonRules = [
    value => !!value || 'Veuillez remplir ce champ',
  ];
  function submitForm() {
    if(!(IdVisiteur.value =='' || emailVisiteur.value =='' || cinVisiteur.value =='' || nomVisiteur.value =='' || raisonVisite.value =='' )){
      alert(IdVisiteur.value); 
      fetch("https://localhost:7012/api/Demande", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({
            id: IdVisiteur.value,
            nom: nomVisiteur.value,
            cin: cinVisiteur.value,
            email: emailVisiteur.value,
            dateEntree: dateEntree.value,
            raisonViste: raisonVisite.value,
            etat : "en cours de traitement"
          }),
        })
        .then(() => {
    router.push({ path: '/typography', forceReload: true });
  });}
} 
  </script>
  
  <style>
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  