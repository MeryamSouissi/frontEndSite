<template>
  <div class="profile-container">
    <div class="company-logoName">
    <img :src="path" alt="Logo de l'entreprise" class="company-logo" />
    <div class="company-name">{{ entreprise.nom }}</div>
  </div>
    <div class="company-description">{{ entreprise.description }}</div>
  </div>
</template>

<script setup>

import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter();
const props = defineProps(['id']);
const entreprise = ref({});
const path = ref(null);

function loadData() {
    fetch("https://localhost:7012/api/Entreprise/"+props.id)
      .then(response => response.json())
      .then(data => {
        entreprise.value = data
        fetch('https://localhost:7012/api/Image/download/'+entreprise.value.path)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                path.value = URL.createObjectURL(blob);
                console.log(path.value)
            })
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
  display: flex;
  flex-direction: column; /* Align items in a column */
  width: 100%;
  align-items: flex-start;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}


/* Style for the square image of the company logo */
.company-logo {
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  margin-bottom: 20px; /* Add margin at the bottom for spacing */
  box-shadow: 2px 2px 5px 1px;
  border-radius: 5%;
}

/* Style for company info */
.company-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; /* Center-align text */
}

/* Style for the company name */
.company-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 90px;
}

/* Style for the company description */
.company-description {
  font-size: 16px;
  margin-top: 10px;
  column-count: 3;
  column-gap: 20px;
  column-rule: 0.2px solid rgb(151, 150, 150);
}

.company-logoName{
  display: flex;
  align-items: center;
justify-content: center;
}
</style>

