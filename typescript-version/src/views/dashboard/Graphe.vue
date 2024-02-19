<template>
    <div class="container">
      <div class="cell">
        <h1>{{ Math.round(counter1) }}</h1>
        <h2>Entreprises</h2>
      </div >
      <div class="cell">
        <h1>{{ Math.round(counter2) }}</h1>
        <h2>Employées</h2>
      </div>
      <div class="cell">
        <h1> {{ Math.round(counter3) }}</h1>
        <h2>Visiteurs</h2>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  


  
  const nbEmployees = ref();
  const nbEntreprises = ref();
  const nbVisiteurs = ref();
  const isPaused = ref (true);
  const counter1 = ref(0);
  const counter2 = ref(0);
  const counter3 = ref(0);

  const incrementCounter = (counter, targetValue) => {
    const incrementAmount = targetValue / 100; 
  
    const interval = setInterval(() => {
        if (!isPaused.value){
      counter.value += incrementAmount;
      if (counter.value >= targetValue) {
        counter.value = targetValue;
        clearInterval(interval);
      }}
    }, 50); 
  };
  



  async function chargerEntreprise() {
      try {
          const response = await fetch("https://localhost:7012/api/Entreprise");
          const data = await response.json();
          nbEntreprises.value= data.length;
          incrementCounter(counter1, nbEntreprises.value);

      } catch (error) {
          console.error('Error loading Entreprise data:', error);
      }
  }
  
  async function chargerEmployee() {
      try {
          const response = await fetch("https://localhost:7012/api/Employee");
          const data = await response.json();
          nbEmployees.value= data.length;    
          incrementCounter(counter2, nbEmployees.value);
   
      } catch (error) {
          console.error('Error loading Employee data:', error);
      }
  }
  
  async function chargerVisiteur() {
      try {
          const response = await fetch("https://localhost:7012/api/Visiteur");
          const data = await response.json();
          nbVisiteurs.value = data.length;
          incrementCounter(counter3, nbVisiteurs.value);
        
      } catch (error) {
          console.error('Error loading Visiteur data:', error);
      }
  }

  onMounted(() => {
    chargerEntreprise();
    chargerVisiteur();
    chargerEmployee();

   
  });


  const unPause = () => {
    // Your unPause logic goes here
      isPaused=false;
  };
  </script>
<style scoped>
  /* Style for the main container */
  .container {
    display: flex;
    justify-content: center;
   
  }

  /* Style for each section */
  .cell {
    text-align: center;
    padding: 60px 80px; /* Adjust padding for a bigger cell */
    border-radius: 20px; /* Adjust border-radius as needed */
    background-color: white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    margin: 0 30px;
    width: 20%;
  }
h1{
    font-size: 40px;
    color: #6467af;
}
  /* Style for the h2 elements */
  h2 {
    font-size: 28px;
    color: #9497FF; /* Blue color for titles */
    margin: 10px 0;
  }

  /* Style for the values */
  span {
    font-size: 24px;
    color: #3498db; /* Blue color for values */
  }
</style>
