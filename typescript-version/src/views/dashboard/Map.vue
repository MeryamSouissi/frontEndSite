<template>
  <div id="main-container">
    <div class="welcome-container">
      <h1>Bienvenue dans la Zone Franche : Parc d'Activités Économiques de ZARZIS</h1>
  
      <div class="image-container">
        <VImg :src="logo" alt="Logo du parc" class="park-image" />
      </div>
  
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1371.3330300322777!2d11.114156854267078!3d33.485897747271586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13aaef258378efc3%3A0x1a2e46f5b9da9ade!2sSi%C3%A8ge%20social%20du%20Parc%20d&#39;Activit%C3%A9s%20Economiques%20de%20Zarzis!5e1!3m2!1sen!2stn!4v1706819721586!5m2!1sen!2stn"
          width="100%"
          height="450"
          style="border: 0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="map-frame"
        ></iframe>
      </div>
  
      <div class="info-container">
        <div class="info-item">
          <h2><i class="fa-solid fa-clipboard-check"></i> Date de création</h2>
          <p>1993</p>
  
          <h2><i class="fa-solid fa-clipboard-check"></i> Activités</h2>
          <p>Développement économique et gestion du parc d'activités économiques de Zarzis</p>
        </div>
      </div>
  
      <div class="description-container">
        <h2><i class="fa-solid fa-clipboard-check"></i> Parc d'Activités Économiques de ZARZIS</h2>
        <p>
          Zarzis Business Park, idéalement situé dans le bassin méditerranéen, hautement équipé avec des bureaux meublés,
          des espaces industriels adaptés aux besoins des investisseurs et soutenus par des procédures d'installation simplifiées.
        </p>
      </div>
    </div>
    <div>
    <a href="https://www.investinzarzis.tn/">Visiter le site&nbsp;
    <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </div>
  </div>
  </template>
  <script setup></script>
  <style scoped>
    .welcome-container {
      text-align: center;
      padding: 20px;
      background-color: #f4f4f4;
      margin: 20px auto;
    }
  
    h1 {
      color: #333;
      font-size: 2em;
      margin-bottom: 20px;
      text-align: center;
    }
  
    .image-container {
      margin-bottom: 20px;
    }
  
    .park-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
  
    .map-container {
      margin-bottom: 20px;
    }
  
    .map-frame {
      border-radius: 8px;
    }
  
    .info-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
    }
  
    .info-item {
      flex: 1;
      text-align: left;
      padding: 10px;
      background-color: #fff;
      border-radius: 8px;
      margin: 0 10px;
    }
  
    h2 {
      color: #333;
      font-size: 1.5em;
      margin-bottom: 10px;
    }
  
    p {
      color: #666;
      font-size: 1em;
      line-height: 1.5;
    }
  
    .description-container {
      text-align: left;
    }
  
    .description-container h2 {
      color: #333;
      font-size: 1.8em;
      margin-bottom: 15px;
    }
  
    .description-container p {
      color: #555;
      font-size: 1.1em;
      line-height: 1.6;
    }
    div a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
  
    div a:hover {
      background-color: #2980b9;
    }
    #main-container {
  width: 65vw; /* Adjust the width as needed */
  margin: 0 17.5%; /* Center the container horizontally */
}

  </style>
  