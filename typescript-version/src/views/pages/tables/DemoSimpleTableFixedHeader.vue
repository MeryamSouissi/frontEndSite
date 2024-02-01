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
            <tr v-for="informationVisiteur in tableInformationVisiteurs" :key="informationVisiteur.id">
                <td>{{ informationVisiteur.id }}</td>
                <td>{{ informationVisiteur.nom }}</td>
                <td>{{ informationVisiteur.cin}}</td>
                <td>{{ informationVisiteur.email }}</td>
                <td>{{ informationVisiteur.dateEntree }}</td>
                <td>{{ informationVisiteur.raisonViste }}</td>
                <td><VBtn color="primary" variant="tonal" @click="acceptVisitor(informationVisiteur.id)"><i class="fa-solid fa-check-double"></i> Accepter</VBtn></td>
                <td><VBtn color="primary" variant="tonal" @click="refuseVisitor(informationVisiteur.id)"><i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i> Refuser</VBtn></td>
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
    function acceptVisitor(visitorId) {
  router.push({ name: 'demande', params: { status: 'accepter', visitorId } });
}

function refuseVisitor(visitorId) {
  router.push({ name: 'demande', params: { status: 'refuser', visitorId } });
}
    onMounted(() => {
    loadData();
  });
  </script>
  