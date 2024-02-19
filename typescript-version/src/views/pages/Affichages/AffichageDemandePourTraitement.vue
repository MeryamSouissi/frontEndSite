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
                <td  v-if="demande.etat == 'en cours de traitement'">{{ demande.visiteur.login.email }}</td>
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
    const emailVisiteur = ref('');

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


}

function chargerDemande(id) {
    fetch("https://localhost:7012/api/Demande/" + id)
    .then(response => {
        console.log("Response from fetch:", response);
        return response.json();
    })
    .then(data => {
        console.log("Data received:", data);
        demandeChoisi.value = data;
        emailVisiteur.value = demandeChoisi.value.visiteur.login.email;

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
                    id: 0,
                    nom: "",
                    prenom: "",
                    numTel: "",
                    cin: "",
                    loginId: 0,
                    login: {
                        id: 0,
                        email: "",
                        motDePasse: "",
                        type: ""
                    }
                }
            }),
        });
    })
    .then(response => {
        loadData()
        if (!response.ok) {
            throw new Error('Failed to update demande');
        }
        return fetch("https://localhost:7012/api/Email/"+ emailVisiteur.value + '/' + message.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        return response.json();
    })
}


    onMounted(() => {
    loadData();
  });
  </script>
  