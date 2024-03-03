<script setup>
import { useTheme } from 'vuetify'
import { userLogin } from "../../utils/global"
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// Banner

const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>
        <!-- 👉 Search -->

        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        >
          <!-- 👉 Search Trigger button 
          <IconBtn>
            <VIcon icon="bx-search" />
          </IconBtn>

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Recherche</span>
            <span class="meta-key">&#8984;K</span>
          </span>-->
        </div>

        <VSpacer />

        <!-- <IconBtn
          class="me-2"
          href="https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free"
          target="_blank"
          rel="noopener noreferrer"
        >
        <VIcon icon="bxl-github" />
        </IconBtn> 

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>
-->

<div class="news-container">
<ul>
<li>
  Bienvenue dans la Zone Franche !
</li>

<li>
  Parc d'Activités Économiques de ZARZIS ! 
</li>

<li>
  Conçu pour renforcer la sécurité d'accès à la zone franche !
</li>
</ul>
</div>

<NavbarThemeSwitcher class="me-2" />
        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      
      <VerticalNavLink 
        :item="{
          title: ' Accueil',
          icon: 'bx-home',
          to: '/Accueil',
        }"
      />

      <!-- 👉 Pages -->
      <VerticalNavSectionTitle
        :item="{
          heading: 'Pages',
        }"
      />

   <VerticalNavLink
   v-if="userLogin.type == 'admin'"

        :item="{
          title: 'Gérer Demandes',
          icon: 'bx-info-circle',
          to: '/GererDemandes',
        }"
      />

      <!-- 👉 User Interface 
      <VerticalNavSectionTitle
        :item="{
          heading: 'User Interface',
        }"
      />-->
      <VerticalNavLink
      v-if="userLogin.type == 'visiteur' || userLogin.type == 'admin'"

        :item="{
          title: 'Mes Demandes',
          icon: 'mdi-alpha-t-box-outline',
          to: '/MesDemandes',
        }"
      />
      <VerticalNavLink
      v-if="userLogin.type == 'admin' || userLogin.type =='employee' || userLogin.type == 'admin' || userLogin.type == 'gerant'"
        :item="{
          title: 'Table Visiteurs',
          icon: 'bx-show',
          to: '/AffichageTableVisiteur',
        }"
      />
      <VerticalNavLink
      v-if="userLogin.type == 'visiteur' || userLogin.type == 'admin'"

        :item="{
          title: 'Demande Accès',
          icon: 'bx-credit-card',
          to: '/DemandeAcces',
        }"
      />
      <VerticalNavLink
      v-if="userLogin.type == 'admin' || userLogin.type == 'gerant' || userLogin.type == 'visiteur' "

        :item="{
          title: 'Table Entreprises',
          icon: 'bx-table',
          to: '/AffichageTableEntreprise',
        }"
      />
   <!--   <VerticalNavLink
        :item="{
          title: 'Ajouter Entreprise ',
          icon: 'mdi-form-select',
          to: '/AjouterEntreprise',
        }"
      />-->
    </template>
    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>

.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;

}
.news-container {
  position: fixed;
  top: 20%;
  left: 0;
  right: 0;
  margin-right: 700px;
  font-family: "Roboto", sans-serif;
  width: 90%; /* Adjusted width */
  overflow-x: hidden; /* Added overflow property for horizontal scrolling */
  justify-content: center;
}

.news-container ul {
display: flex;
list-style: none;
margin: 0;
animation: scroll 25s infinite linear;

}

.news-container ul li {
white-space: nowrap;
padding: 10px 24px;
color: #494949;
position: relative;
}

.news-container ul li::after {
content:"";
width: 1px;
height: 100%;
background: #b8b8b8;
position: absolute;
top: 0;
right: 0;

}

.news-container ul li:last-child::after {
display: none;
}

@keyframes scroll {
from {
transform: translateX(100%);
}

to {
transform: translateX(-100%);

}
}
</style>
