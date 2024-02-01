<template>
    <VTable>
     <thead>
       <div>
         <RouterLink :to="{ name: 'addForm', params: { type: 'visiteur' }}"  class="btn btn-primary"><i class="fa-solid fa-plus"></i> Ajouter Visiteur </RouterLink>        <br><br>
       </div>
       <tr>
         <th class="text-uppercase">ID</th>
         <th>Nom</th>
         <th>Prenom</th>
         <th>Numero Telephone</th>
         <th>Numero CIN</th>
         <th>Email</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="visiteur in tableVisiteur" :key="visiteur.id">
         <td>{{ visiteur.id }}</td>
         <td>{{ visiteur.nom }}</td>
         <td>{{ visiteur.prenom }}</td>
         <td>{{ visiteur.numTel }}</td>
         <td>{{ visiteur.cin }}</td>
         <td>{{ visiteur.email }}</td>
         <td>
           <VBtn color="primary" variant="tonal" @click="openModifierPrompt(visiteur)">
             <i class="fa-sharp fa-solid fa-pen-to-square"></i>
           </VBtn>
           <VBtn color="primary" variant="tonal" @click="openDeletePrompt(visiteur.id)">
             <i class="fa-solid fa-trash"></i>
           </VBtn>
         </td>
       </tr>
     </tbody>
   </VTable>
   <!-- Prompt for modifying visiteur -->
   <div v-if="isModifierPromptOpen" class="modifier-prompt">
     <div>
       <label>ID:</label>
       <input type="text" v-model="visiteurToModify.id" disabled />
     </div>
     <div>
       <label>Nom:</label>
       <input type="text" v-model="visiteurToModify.nom" />
     </div>
     <div>
       <label>Prenom:</label>
       <input type="text" v-model="visiteurToModify.prenom" />
     </div>
     <div>
       <label>Numero Telephone:</label>
       <input type="text" v-model="visiteurToModify.numTel" />
     </div>
     <div>
       <label>Numero CIN:</label>
       <input type="text" v-model="visiteurToModify.cin" />
     </div>
     <div>
       <label>Email:</label>
       <input type="text" v-model="visiteurToModify.email" />
     </div>
     <div>
       <VBtn color="primary" variant="tonal" @click="modifierVisiteur()"> Modifier </VBtn>
       <VBtn color="primary" variant="tonal" @click="closeModifierPrompt()" > Annuler </VBtn>
     </div>
   </div>
   <!-- Prompt for confirming delete -->
   <div v-if="isDeletePromptOpen" class="modifier-prompt">
     <div>
       <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
       <VBtn color="primary" variant="tonal" @click="supprimerConfirmed()"> Confirmer </VBtn>
       <VBtn color="primary" variant="tonal" @click="closeDeletePrompt()"> Annuler </VBtn>
     </div>
   </div>
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useRouter } from 'vue-router';
 
 const tableVisiteur = ref([]);
 const router = useRouter();
 const isModifierPromptOpen = ref(false);
 const isDeletePromptOpen = ref(false);
 const visiteurToModify = ref({});
 
 function loadData() {
   // Fetch visiteurs data
   fetch("https://localhost:7012/api/Visiteur")
     .then(response => response.json())
     .then(data => (tableVisiteur.value = data))
     .catch(error => console.error('Error loading visiteurs data:', error));
 }
 
 function openModifierPrompt(visiteur) {
  visiteurToModify.value = { ...visiteur };
  isModifierPromptOpen.value = true;
 }

 function closeModifierPrompt() {
  isModifierPromptOpen.value = false;
 }

function modifierVisiteur() {
  // Update the visiteur details using visiteurToModify
  fetch("https://localhost:7012/api/Visiteur/" + visiteurToModify.value.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: visiteurToModify.value.id,
      nom: visiteurToModify.value.nom,
      prenom: visiteurToModify.value.prenom,
      numTel: visiteurToModify.value.numTel,
      cin: visiteurToModify.value.cin,
      email: visiteurToModify.value.email,
    }),
  }).then(() => {
    closeModifierPrompt();
    loadData(); // Reload data after modification
  });
}
 
 function openDeletePrompt(visiteurId) {
   // Store the ID of the visiteur to delete in a variable
   visiteurToModify.value.idToDelete = visiteurId;
   isDeletePromptOpen.value = true;
 }
 
 function closeDeletePrompt() {
   isDeletePromptOpen.value = false;
 }
 
 async function supprimerConfirmed() {
   // Get the ID of the visiteur to delete
   const visiteurIdToDelete = visiteurToModify.value.idToDelete;
 
   // Delete the visiteur
   const response = await fetch("https://localhost:7012/api/Visiteur/" + visiteurIdToDelete, {
     method: 'DELETE',
     headers: {
       'Content-Type': 'application/json',
     },
   });
 
   if (response.ok) {
     // Close the popup after successful deletion
     closeDeletePrompt();
     // Reload data after deletion
     loadData();
   } else {
     // Handle error if deletion fails
     console.error('Error deleting visiteur:', response.status);
   }
 }
 
 onMounted(loadData);
 </script>
 
 <style scoped>
 /* Styles for the modification prompt container and its elements */
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
 
 /* Styles for the labels of the modification form */
 .modifier-prompt label {
   display: block;
   margin-bottom: 10px;
   color: #3498db;
   font-weight: bold;
   transition: color 0.3s ease-in-out;
 }
 
 /* Styles for the input fields of the modification form */
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
 
 /* Styles for the buttons of the modification form */
 .modifier-prompt button {
   padding: 12px 20px;
   margin-right: 10px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   font-size: 14px;
   transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.2s ease-in-out;
 }
 
 /* Styles for the primary button */
 .modifier-prompt .btn-primary {
   background-color: #3498db;
   color: #fff;
 }
 
 /* Styles for the cancel button */
 .modifier-prompt .btn-danger {
   background-color: #e74c3c;
   color: #fff;
 }
 
 /* Hover styles for the buttons */
 .modifier-prompt button:hover {
   background-color: #2c3e50;
   color: #fff;
   transform: scale(1.05);
 }
 </style>
 