<template>
  <div class="profile-container">
    <img :src="path" alt="Logo de l'entreprise" class="company-logo" />
    <div class="company-name">{{ entreprise.nom }}</div>
    <div class="company-description">{{ entreprise.description }}</div>
  </div>
</template>


<script setup>

import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter();
const props = defineProps(['id']);
const entreprise = ref({});
const path = ref("");




function loadData() {
    fetch("https://localhost:7012/api/Entreprise/"+props.id)
      .then(response => response.json())
      .then(data => {entreprise.value = data,
        path.value = "http://localhost:5173/src/assets/logoEntreprise/" + entreprise.value.path;
      })
      .catch(error => console.error('Error loading data:', error));
  }

  onMounted(()=>
  loadData()
  );
</script>
<style scoped>
  /* Style for the container of the profile */
  .profile-container {
    width: 100%;
  
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  /* Style for the square image of the company logo */
  .company-logo {
    transform: scale(0.5);
  }

  /* Style for the name of the company */
  .company-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  /* Style for the description of the company */
  .company-description {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
  }
</style>
