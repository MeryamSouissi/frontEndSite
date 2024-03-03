<template>
  <VTable>
    <thead>
      <div v-if="userLogin.type == 'admin' || userLogin.type == 'gerant'">       
        <RouterLink :to="{ name: 'addForm', params: { type: 'entreprise' }}" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Ajouter Entreprise</RouterLink>
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
              <VBtn v-if="userLogin.type == 'admin' || userLogin.type == 'gerant'" color="primary" variant="tonal" @click="openModifierPrompt(entreprise)" >  <i class="fa-sharp fa-solid fa-pen-to-square"></i>   </VBtn>
              <VBtn v-if="userLogin.type == 'admin' || userLogin.type == 'gerant'" color="primary" variant="tonal" @click="openDeletePrompt(entreprise.id)"> <i class="fa-solid fa-trash"></i> </VBtn>
              <VBtn color="primary" variant="tonal" @click="goToDetails(entreprise.id)"><i class="fa-solid fa-table-list"></i></VBtn>
            </td>
          </tr>
     
        </tbody>
  </VTable>
    <!-- Prompt for modifying entreprise -->
    <div v-if="isModifierPromptOpen" class="modifier-prompt">
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
      <label>Description:</label>
      <input type="text" v-model="entrepriseToModify.description" />
    </div>
    <div>
      <label>Path image :</label>
      <input type="text" v-model="entrepriseToModify.path" />
    </div>
    <div>
      <VBtn color="primary" variant="tonal" @click="modifierEntreprise()"> Modifier </VBtn>
      <VBtn color="primary" variant="tonal" @click="closeModifierPrompt()" > Annuler </VBtn>
      
    </div>
  </div>
<!-- Prompt for confirming delete -->
<div v-if="isDeletePromptOpen" class="modifier-prompt">
  <div>
    <p>Êtes-vous sûr de vouloir supprimer cette entreprise ?</p>
    <VBtn color="primary" variant="tonal" @click="supprimerConfirmed()"> Confirmer </VBtn>
    <VBtn color="primary" variant="tonal" @click="closeDeletePrompt()"> Annuler </VBtn>
  </div>
</div>

</template>



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { userLogin } from "../../../utils/global";

  const tableEntreprises = ref([]);
  const isModifierPromptOpen = ref(false);
  const entrepriseToModify = ref({});
  const isDeletePromptOpen = ref(false);
  const router = useRouter();


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
      description: entrepriseToModify.value.description,
      path: entrepriseToModify.value.path
    }),
  }).then(() => {
    closeModifierPrompt();
    loadData(); // Reload data after modification
  });
}
function openDeletePrompt(entrepriseId) {
  // Stockez l'ID de l'entreprise à supprimer dans une variable
  entrepriseToModify.value.idToDelete = entrepriseId;
  isDeletePromptOpen.value = true;
}

function closeDeletePrompt() {
  isDeletePromptOpen.value = false;
}

function goToDetails(entrepriseId){
  router.push({ name: 'acc', params: { id: entrepriseId }});
}

async function supprimerConfirmed() {
  // Obtenez l'ID de l'entreprise à supprimer
  const entrepriseIdToDelete = entrepriseToModify.value.idToDelete;

  // Supprimer l'entreprise
  const response = await fetch("https://localhost:7012/api/Entreprise/" + entrepriseIdToDelete, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    // Fermez le popup après une suppression réussie
    closeDeletePrompt();
    // Rechargez les données après la suppression
    loadData();
  } else {
    // Gérez l'erreur si la suppression échoue
    console.error('Error deleting entreprise:', response.status);
  }
}
function supprimer(entrepriseId) {
  // Ouvrez le popup de confirmation de suppression
  openDeletePrompt(entrepriseId);
}
  
  onMounted(loadData);
</script>
<style scoped>
/* Style du conteneur du formulaire de modification */
.modifier-prompt {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 30px;
  border: 1px solid #3498db;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 400px;
  width: 100%;
  border-radius: 10px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Style des étiquettes du formulaire */
.modifier-prompt label {
  display: block;
  margin-bottom: 10px;
  color: #3498db;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

/* Style des champs de saisie du formulaire */
.modifier-prompt input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 2px solid #3498db;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease-in-out;
}

/* Style des boutons du formulaire */
.modifier-prompt button {
  padding: 12px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

/* Style du bouton principal */
.modifier-prompt .btn-primary {
  background-color: #3498db;
  color: #fff;
}

/* Style du bouton d'annulation */
.modifier-prompt .btn-danger {
  background-color: #e74c3c;
  color: #fff;
}

/* Style survolé des boutons */
.modifier-prompt button:hover {
  background-color: #2c3e50;
  color: #fff;
  transform: scale(1.05);
}

</style>
