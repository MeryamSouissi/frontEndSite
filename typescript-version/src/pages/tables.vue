<script setup lang="ts">
import DemoSimpleTableEntreprises from '@/views/pages/tables/DemoSimpleTableEntreprises.vue'
import DemoSimpleTableDensity from '@/views/pages/tables/DemoSimpleTableDensity.vue'
import DemoSimpleTableFixedHeader from '@/views/pages/tables/DemoSimpleTableFixedHeader.vue'
import DemoSimpleTableHeight from '@/views/pages/tables/DemoSimpleTableHeight.vue'
import DemoSimpleTableTheme from '@/views/pages/tables/DemoSimpleTableTheme.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Sociétés opérant dans la Zone Franche"> 
        <DemoSimpleTableEntreprises />
      </VCard>
    </VCol>
</VRow>

</template>
