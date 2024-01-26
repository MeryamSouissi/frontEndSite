<template>
  <VTable>
    <thead>
      <div>       
        <RouterLink to="../AjouterEntreprise" class="btn btn-primary"> <i class="fa-solid fa-plus"></i>  Ajouter Entreprise</RouterLink>
        <br><br></div>
      <tr><th class="text-uppercase">ID</th>
        <th>Nom</th>
        <th>Heure de travail</th>
        <th>Email</th>
        <th>Numero Directeur</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
            <tr v-for="entreprise in tableEntreprises" :key="entreprise.id">
              <td>{{ entreprise.id }}</td>
              <td>{{ entreprise.nom }}</td>
              <td>{{ entreprise.heureDeTravail}}</td>
              <td>{{ entreprise.email }}</td>
              <td>{{ entreprise.numeroDirecteur }}</td>
              <td> 
              <VBtn color="primary" variant="tonal" @click="openModifierPrompt(entreprise)" >  <i class="fa-sharp fa-solid fa-pen-to-square"></i>   </VBtn>
              <VBtn color="primary" variant="tonal"  @click="supprimer(entreprise.id)" > <i class="fa-solid fa-trash"></i>  </VBtn>
              <VBtn color="primary" variant="tonal"  @click="supprimer(entreprise.id)" > <i class="fa-solid fa-table-list"></i> </VBtn>
              
            </td>
          </tr>
     
        </tbody>
  </VTable>
    <!-- Prompt for modifying entreprise -->
    <div v-if="isModifierPromptOpen">
    <div>
      <label>ID:</label>
      <input type="text" v-model="entrepriseToModify.id" disabled />
    </div>
    <div>
      <label>Nom:</label>
      <input type="text" v-model="entrepriseToModify.nom" />
    </div>
    <div>
      <label>Heures De TRAVAIL:</label>
      <input type="text" v-model="entrepriseToModify.heureDeTravail" />
    </div>
    <div>
      <label>Email:</label>
      <input type="text" v-model="entrepriseToModify.email" />
    </div>
    <div>
      <label>Numero DIRECTEUR:</label>
      <input type="text" v-model="entrepriseToModify.numeroDirecteur" />
    </div>
    <div>
      <VBtn color="primary" variant="tonal" @click="modifierEntreprise()"> Modifier </VBtn>
      <VBtn color="primary" variant="tonal" @click="closeModifierPrompt()" > Annuler </VBtn>
      
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const tableEntreprises = ref([]);
  const router = useRouter();
  const nouvId = ref('');
  const nouvNom = ref('');
  const nouvHeure = ref('');
  const nouvEmail = ref('');
  const nouvNumeroDirecteur = ref('');
  const isModifierPromptOpen = ref(false);
  const entrepriseToModify = ref({});
  
  function loadData() {
    fetch("https://localhost:7012/api/Entreprise")
      .then(response => response.json())
      .then(data => tableEntreprises.value = data)
      .catch(error => console.error('Error loading data:', error));
  }
  

  function ajouterNouvelleEntreprise() {
    // Utilisez la route pour naviguer vers la nouvelle page
    router.push('/ajouter-entreprise');
  }

  function openModifierPrompt(entreprise) {
  entrepriseToModify.value = { ...entreprise };
  isModifierPromptOpen.value = true;
 }

 function closeModifierPrompt() {
  isModifierPromptOpen.value = false;
 }

function modifierEntreprise() {
  // Update the entreprise details using entrepriseToModify
  fetch("https://localhost:7012/api/Entreprise/" + entrepriseToModify.value.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: entrepriseToModify.value.id,
      nom: entrepriseToModify.value.nom,
      heureDeTravail: entrepriseToModify.value.heureDeTravail,
      email: entrepriseToModify.value.email,
      numeroDirecteur: entrepriseToModify.value.numeroDirecteur,
    }),
  }).then(() => {
    closeModifierPrompt();
    loadData(); // Reload data after modification
  });
}
async function supprimer(entrepriseId) {
    // Show a confirmation prompt
    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cette entreprise ?");

    if (isConfirmed) {
      // If the user confirms, proceed with deletion
      const response = await fetch("https://localhost:7012/api/Entreprise/" + entrepriseId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reload data after successful deletion
        loadData();
      } else {
        // Handle error if deletion fails
        console.error('Error deleting entreprise:', response.status);
      }
    }
  }
  
  onMounted(loadData);
</script>
