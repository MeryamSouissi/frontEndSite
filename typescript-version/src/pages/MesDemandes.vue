<script setup>
import AffichageDemandeVisiteur from '@/views/pages/Affichages/AffichageDemandeVisiteur.vue'

import { useRouter } from 'vue-router';
import { computed } from 'vue';
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <!-- 👉 Multiple Column -->
        <VCard title="Les demandes d'accès des visiteurs">
          <VCardText>
            <AffichageDemandeVisiteur />
          </VCardText>
        </VCard>
      </VCol> 
    </VRow>
  </div>
  
</template>
