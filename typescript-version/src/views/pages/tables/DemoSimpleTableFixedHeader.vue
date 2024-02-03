<template>
    <VTable>
      <thead>
        <tr><th class="text-uppercase">ID</th>
          <th>Nom du Visiteur</th>
          <th>CIN du Visiteur</th>
          <th>Email du Visiteur</th>
          <th>Date d'Entrée</th>
          <th>Raison de la Visite</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
            <tr v-for="demande in tableInformationVisiteurs" :key="demande.id">               
                <td   v-if="demande.etat == 'en cours de traitement'">{{ demande.id }}</td>
                <td  v-if="demande.etat == 'en cours de traitement'">{{ demande.visiteur.nom }}</td>
                <td  v-if="demande.etat == 'en cours de traitement'">{{ demande.visiteur.cin}}</td>
                <td  v-if="demande.etat == 'en cours de traitement'">{{ demande.visiteur.email }}</td>
                <td  v-if="demande.etat == 'en cours de traitement'">{{ demande.dateEntree }}</td>
                <td  v-if="demande.etat == 'en cours de traitement'">{{ demande.raisonViste }}</td>
                <td  v-if="demande.etat == 'en cours de traitement'"><VBtn color="primary" variant="tonal" @click="traiterDemande(demande.id,true)"><i class="fa-solid fa-check-double"></i> Accepter</VBtn></td>
                <td  v-if="demande.etat == 'en cours de traitement'"><VBtn color="primary" variant="tonal" @click="traiterDemande(demande.id, false)"><i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Refuser</VBtn></td>
            </tr>
          </tbody>
    </VTable>  
  </template>
  
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
    const tableInformationVisiteurs = ref([]);
    const router = useRouter();
    const demandeChoisi = ref({});
    const message = ref('');
  
    function loadData() {
      fetch("https://localhost:7012/api/Demande")
        .then(response => response.json())
        .then(data => tableInformationVisiteurs.value = data)
        .catch(error => console.error('Error loading data:', error));
    }

    function traiterDemande(id, estAcceptee) {
    if (estAcceptee == true) {
        message.value = "Acceptée";
    } else {
        message.value = "Refusée";
    }

    chargerDemande(id)
        .then(() => {
            return fetch("https://localhost:7012/api/Demande/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: demandeChoisi.value.id,
                    dateEntree: demandeChoisi.value.dateEntree,
                    raisonViste: demandeChoisi.value.raisonViste,
                    etat: message.value,
                    idVisiteur: demandeChoisi.value.idVisiteur,
                    visiteur: {
                    "id": "string",
                    "nom": "string",
                    "prenom": "string",
                    "numTel": "string",
                    "cin": "string",
                    "email": "string"}
                }),
            });
        })
        .then(() => {
            loadData();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function chargerDemande(id) {
    return fetch("https://localhost:7012/api/Demande/" + id)
        .then(response => response.json())
        .then(data => {
            demandeChoisi.value = data;
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

    onMounted(() => {
    loadData();
  });
  </script>
  