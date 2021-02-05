<template>
  <div>
    <div class="authentification">
      <div class="image">
        <img src="../assets/logo.png" class="image__logo" alt="logo groupomania">
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

<style lang="scss" scoped>
 .authentification{
   background-color: #09FB98;
   &__lien{
    font-size: 35px;
    color: #8F0000;
    padding-bottom: 2%;
    cursor: pointer;
    transform: scale(1);
    transition: transform 1000ms;
    text-decoration: none;
   }
   &__lien:hover{
    transform: scale(1.25);
    opacity: 0.7;
    color: #8F0000;
   }
   &__marge{
    display: flex;
    justify-content: space-evenly;
   }
   &__text{
    font-size: 35px;
    color: #8F0000;
    text-align: center;
    padding-bottom: 2%;
   }
 } 
 .image{
   display: flex;
   &__logo{
    width: 30%;
    margin: 3% auto 0;
   }
 }
</style>