<template>
  <VTable>
    <thead>
      <tr>
        <th>Date d'Entrée</th>
        <th>Raison de la Visite</th>
        <th>Etat</th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="demande in tableInformationVisiteurs" :key="demande.id">

                <td class="smaller">{{ demande.dateEntree }}</td>
                <td class="middle">{{ demande.raisonViste }}</td>
                <td  class="smaller">
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
import {userLogin} from "../../../utils/global.ts"

  const tableInformationVisiteurs = ref([]);
  const router = useRouter();


function loadData() {
  fetch("https://localhost:7012/api/Demande")
    .then(response => response.json())
    .then(data => {
      console.log(userLogin.value.id)
      tableInformationVisiteurs.value = data.filter(item => item.visiteur.login.id == userLogin.value.id)
      console.log(tableInformationVisiteurs.value)
    })
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
  padding: 4px; /* Adjust padding for a smaller size */
  border-radius: 10px; /* Increased border-radius for a more pill-like shape */
  font-size: 12px; /* Adjust font size */
  text-align: center;
  width: 200px;
}

/* Red Badge */
.badge-red {
  background-color: #E42728; /* Red background color */
  color: #fff; /* White text color */
  padding: 4px; /* Adjust padding for a smaller size */
  border-radius: 10px; /* Increased border-radius for a more pill-like shape */
  font-size: 12px; /* Adjust font size */
  text-align: center;
  width: 200px;

}
/* Yellow Badge */
.badge-yellow {
  background-color: #FF8510;
  color: #fff;
  padding: 4px;
  border-radius: 10px;
  font-size: 12px;
  text-align: center;
  width: 200px;
  position: right;
}

.smaller{
  width: 200px;
}
.middle{
  text-align: center;
}

</style>