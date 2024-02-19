<template>
  <VTable>
    <thead>
      <tr><th class="text-uppercase">ID</th>
        <th>Nom du Visiteur</th>
        <th>CIN du Visiteur</th>
        <th>Email du Visiteur</th>
        <th>Date d'Entrée</th>
        <th>Raison de la Visite</th>
        <th>Etat</th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="demande in tableInformationVisiteurs" :key="demande.id">
             
                <td   v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'">{{ demande.id }}</td>
                <td   v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'">{{ demande.visiteur.nom }}</td>
                <td  v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'">{{ demande.visiteur.cin}}</td>
                <td  v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'">{{ demande.visiteur.email }}</td>
                <td  v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'">{{ demande.dateEntree }}</td>
                <td  v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'">{{ demande.raisonViste }}</td>
                <td  v-if="demande.etat == 'Acceptée' || demande.etat == 'Refusée'"><VBtn color="primary" variant="tonal">{{demande.etat}}</VBtn></td>
            </tr>
          
        </tbody>
  </VTable>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

  const tableInformationVisiteurs = ref([]);
  const router = useRouter();


  function loadData() {
    fetch("https://localhost:7012/api/Demande")
      .then(response => response.json())
      .then(data => tableInformationVisiteurs.value = data)
      .catch(error => console.error('Error loading data:', error));
  }
  onMounted(() => {
  loadData();
});
</script>
