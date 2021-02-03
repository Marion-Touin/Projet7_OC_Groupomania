<template>
  <div>
    <div class="authentification">
      <div class="image">
        <img src="../assets/logo.png" class="image__logo">
      </div>
      <div>
        <p class="authentification__text">Le réseau social pour les employés !</p>
      </div>
      <div class="authentification__marge">
        <router-link to="/register" class="authentification__lien">Inscription</router-link>
        <router-link to="/login" class="authentification__lien">Connexion</router-link>
      </div>
    </div>
  </div>
</template>

<style>
 .authentification{
   background-color: #09FB98;
 } 
 .image{
   display: flex;
 }
 .image__logo{
   width: 30%;
   margin: 3% auto 0;
 }
 .authentification__lien{
   font-size: 35px;
   color: #8F0000;
  padding-bottom: 2%;
  cursor: pointer;
   transform: scale(1);
   transition: transform 1000ms;
   text-decoration: none;
 }
 .authentification__marge{
   display: flex;
   justify-content: space-evenly;
 }
 .authentification__text{
   font-size: 35px;
   color: #8F0000;
   text-align: center;
   padding-bottom: 2%;
 }
 .authentification__lien:hover{
    transform: scale(1.25);
    opacity: 0.7;
    color: #8F0000;
 }
</style>