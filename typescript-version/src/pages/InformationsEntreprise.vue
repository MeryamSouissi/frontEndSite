<script lang="ts" setup>
import { useRoute } from 'vue-router'

import ProfileEntreprise from '@/views/pages/Entreprises/ProfileEntreprise.vue'
import HistoriqueVisiteur from '@/views/pages/Entreprises/HistoriqueVisiteur.vue'
import AffichageEmployeeParEntreprise from '@/views/pages/Entreprises/AffichageEmployeeParEntreprise.vue'

const route = useRoute()

const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  { title: 'Informations Entreprise', icon: 'bx-user', tab: 'Informations Entreprise' },
  { title: 'Les employees de l entreprise', icon: 'bx-lock-open', tab: 'Employees de l entreprise' },
  { title: 'Historiques des demandes d accès', icon: 'bx-bell', tab: 'Historiques des demandes d accès' },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Account -->
      <VWindowItem value="Informations Entreprise">
        <ProfileEntreprise :id="$route.params.id"/>
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="Employees de l entreprise">
        <AffichageEmployeeParEntreprise :id="$route.params.id" />
      </VWindowItem>

      <!-- Notification -->
      <VWindowItem value="Historiques des demandes d accès">
        <HistoriqueVisiteur />
      </VWindowItem>
    </VWindow>
  </div>
</template>
