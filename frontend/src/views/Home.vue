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

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
$color: #a92323;
 .authentification{
   &__lien{
    font-size: 55px;
    color: $color;
    padding-bottom: 2%;
    cursor: pointer;
    transform: scale(1);
    transition: transform 1000ms;
    text-decoration: none;
   }
   &__lien:hover{
    transform: scale(1.25);
    opacity: 0.7;
    color: $color;
   }
   &__marge{
    display: flex;
    justify-content: space-around;
   }
   &__text{
    font-size: 60px;
    color: $color;
    text-align: center;
    padding-bottom: 7%;
   }
 } 
 .image{
   display: flex;
   &__logo{
    width: 40%;
    margin: 2% auto 1%;
   }
 }

 @media all and (max-width: 1024px){
   .image{
     &__logo{
       width: 60%;
       padding: 10% 0;
     }
   }
   .authentification{
     &__text{
       font-size: 40px;
       padding-bottom: 15%;
     }
     &__lien{
       font-size: 35px;
     }
   }
 }

 @media all and (max-width: 767px){
   .authentification{
     &__text{
       font-size: 25px;
       padding-bottom: 15%;
     }
     &__lien{
       font-size: 20px;
     }
   }
 }
</style>