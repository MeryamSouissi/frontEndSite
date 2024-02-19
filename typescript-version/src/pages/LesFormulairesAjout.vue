<script setup>
import FormAjouterEntreprise from '@/views/pages/Forms/FormAjouterEntreprise.vue'
import FormAjouterEmployee from '@/views/pages/Forms/FormAjouterEmployee.vue'
import FormAjouterVisiteur from '@/views/pages/Forms/FormAjouterVisiteur.vue'

import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { ref, onMounted } from 'vue';
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <!-- 👉 Multiple Column -->
        <VCard title="Ajouter Entreprise" v-if="$route.params.type=='entreprise'">
          <VCardText>
            <FormAjouterEntreprise />
          </VCardText>
        </VCard>

        <!-- 👉 Ajouter Employee -->
        <VCard title="Ajouter Employee" v-if="$route.params.type=='employee'">
          <VCardText>
            <FormAjouterEmployee :id =" $route.params.id"/>
          </VCardText>
        </VCard>
     
    <!-- 👉 Ajouter Visiteur -->
   <VCard title="Ajouter Visiteur" v-if="$route.params.type=='visiteur'">
          <VCardText>
            <FormAjouterVisiteur />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
  
</template>
