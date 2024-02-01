<script setup>
import DemoSimpleTableFixedHeader from '@/views/pages/tables/DemoSimpleTableFixedHeader.vue'

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
            <DemoSimpleTableFixedHeader />
          </VCardText>
        </VCard>
      </VCol> 
    </VRow>
  </div>
  
</template>
