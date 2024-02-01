<script setup>
import DemoFormLayoutMultipleColumn from '@/views/pages/form-layouts/DemoFormLayoutMultipleColumn.vue'
import DemoFormLayoutHorizontalFormWithIcons from '@/views/pages/form-layouts/DemoFormLayoutHorizontalFormWithIcons.vue'
import DemoFormLayoutHorizontalForm from '@/views/pages/form-layouts/DemoFormLayoutHorizontalForm.vue'

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
            <DemoFormLayoutMultipleColumn />
          </VCardText>
        </VCard>

        <!-- 👉 Ajouter Employee -->
        <VCard title="Ajouter Employee" v-if="$route.params.type=='employee'">
          <VCardText>
            <DemoFormLayoutHorizontalFormWithIcons />
          </VCardText>
        </VCard>
     
    <!-- 👉 Ajouter Visiteur -->
   <VCard title="Ajouter Visiteur" v-if="$route.params.type=='visiteur'">
          <VCardText>
            <DemoFormLayoutHorizontalForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
  
</template>
