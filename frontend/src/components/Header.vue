<template>
    <div class="header">
        <div class="header__image">
            <img  class="header__image--logo" src="../assets/logo.png" alt="logo groupomania">
        </div>
        <div class="header__liste">
                <router-link to="/accueil" class="header__liste--lien">Accueil</router-link>
                <router-link to="/profil" class="header__liste--lien">profil</router-link>
                <a to="/login" class="header__liste--lien" v-on:click="Logout()">Déconnexion</a>
        </div>
    </div>
</template>

<script>
export default {
    name:'NavBar',
    data(){
        return {
            userId: localStorage.getItem('userId')
        }
    },
    methods:{
        Logout(){
            console.log("localstorage Cleared");
            localStorage.clear();
            this.$router.push('/Login');
        }
    }
}
</script>

<style lang="scss" scoped>

.header{
    display: flex;
    width: 100%;
    background-color: #09FB98;
    padding: 2% 0;
    &__image{
        width: 30%;
        &--logo{
            width:70%;
            margin: 0 15%;
        }
    }
    &__liste{
        width: 70%;
        list-style-type: none;
        display: flex;
        justify-content: space-evenly;
        &--lien{
            text-decoration: none;
            color: #a92323;
            font-size: 30px;
            margin: auto 0;
        }
    }
}

</style>