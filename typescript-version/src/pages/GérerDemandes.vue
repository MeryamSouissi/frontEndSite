<script setup>
import AffichageDemandePourTraitement from '@/views/pages/Affichages/AffichageDemandePourTraitement.vue'

import { useRouter } from 'vue-router';
import { computed } from 'vue';
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <!-- 👉 Multiple Column -->
        <VCard title="Gérer Les Demandes Des Visiteurs ">
          <VCardText>
            <AffichageDemandePourTraitement/>
          </VCardText>
        </VCard>
      </VCol> 
    </VRow>
  </div>
  
</template>
