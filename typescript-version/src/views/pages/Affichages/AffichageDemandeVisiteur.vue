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
              <td>{{ demande.id }}</td>
                <td>{{ demande.visiteur.nom }}</td>
                <td>{{ demande.visiteur.cin}}</td>
                <td>{{ demande.visiteur.login.email }}</td>
                <td>{{ demande.dateEntree }}</td>
                <td>{{ demande.raisonViste }}</td>
                <td >
                  <div v-if="demande.etat==='Acceptée' || demande.etat === 'Refusée'">
                     <div  :class="{ 'badge-green': demande.etat === 'Acceptée', 'badge-red': demande.etat === 'Refusée' }">              
                        {{ demande.etat }}
                     </div>
                  </div>
                  <div v-else>
                      <div class="badge-yellow">En cours</div>
                  </div>
          </td>
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
<style>
/* Green Badge */
.badge-green {
  background-color: #1F9D57; /* Green background color */
  color: #fff; /* White text color */
  padding: 4px 8px; /* Adjust padding for a smaller size */
  border-radius: 10px; /* Increased border-radius for a more pill-like shape */
  font-size: 12px; /* Adjust font size */
  text-align: center;
}

/* Red Badge */
.badge-red {
  background-color: #E42728; /* Red background color */
  color: #fff; /* White text color */
  padding: 4px 8px; /* Adjust padding for a smaller size */
  border-radius: 10px; /* Increased border-radius for a more pill-like shape */
  font-size: 12px; /* Adjust font size */
  text-align: center;

}
/* Yellow Badge */
.badge-yellow {
  white-space: nowrap; /* Prevent line breaks */
  overflow: hidden; /* Hide any overflowing content */
  text-overflow: ellipsis; /* Display an ellipsis (...) for overflowing content */
  background-color: #FF8510;
  color: #fff;
  padding: 4px 20px;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
}


</style>