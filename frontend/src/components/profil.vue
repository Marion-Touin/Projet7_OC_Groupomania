<template>
    <main>
        <Header />
        <!--Affichage de l'article-->
        <div class="profil">
            <div class="profil__info">
                <p class="profil__hello">Bonjour {{users.username}} !</p>
                <p class="profil__para">Voici les informations de votre compte : </p>
                <p class="profil__name"> Pseudonyme : {{users.username}}</p>
                <p class="profil__mail">Email : {{users.email}}</p>
                <p class="profil__compte">Creation du compte: {{ users.createdAt | formatDate }}</p>
            </div>
            <div class="profil__delete">
                <!--Bouton pour supprimer l'article-->
                <button v-on:click="deleteUser(users.id)" class="profil__button">Supprimer votre compte !</button>
            </div>
        </div>
    </main>
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios' 
export default {
    name: 'Users',
        components:{
        Header,
    },
    data(){
        return {
            users: "",
            role: "",
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('usertoken'),
        }
    },
    methods:{
        deleteUser(id){
            const userId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/user/' + userId
            axios.delete(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('user supprimé');
            })
            .catch(error => console.log(error));
        },
        printNewusers(){
            const id = localStorage.getItem('userId');
            const token = localStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:8080/api/user/'+ id, header)
            .then(res => {
                const data = res.data;
                this.users = data;
                console.log(data.username)
            })
            .catch(error => console.log({error}));
        }
    },
    
    beforeMount() {
        const role = localStorage.getItem('role');
        this.role = role;
        this.printNewusers();
    },
}
</script>

<style lang="scss" scoped>
.profil{
    background-color: #CF515D;
    height: 800px;
    padding-top: 3%;
    &__info{
        background-color: #0A2041;
        border: #0A2041 1px solid;
        border-radius: 20px;
        width: 50%;
        opacity: 0.8;
        margin: 2% auto;
        color: #FFF;    
    }
    &__hello{
        font-size: 25px;
        text-align: center;
        padding: 2% 0;
    }
    &__para{
        font-size: 20px;
        text-decoration: underline;
        margin: 2% 5%;
    }
    &__name{
        font-size: 20px;
        margin: 2% 5%;
    }
    &__mail{
        font-size: 20px;
        margin: 2% 5%;
    }
    &__compte{
        font-size: 20px;
        margin: 2% 5% 5%;
    }
    &__button{
        background-color: #0A2041;
        font-size: 20px;
        padding: 1% 3%;
        color: #FFF;
    }
    &__delete{
        display: flex;
        justify-content: center;
    }
}

@media all and (max-width: 1024px){
    .profil{
        height: 1000px;
        &__info{
            width: 80%;
        }
    }
}

@media all and (max-width: 727px){
    .profil{
        height: 550px;
        padding: 15% 0;
        &__info{
            margin-bottom: 10%;
        }
        &__hello{
            font-size: 20px;
        }
        &__para{
            font-size: 15px;
        }
        &__name{
            font-size: 15px;
        }
        &__mail{
            font-size: 15px;
        }
        &__compte{
            font-size: 15px;
        }
        &__button{
            font-size: 15px;
        }
    }
}
</style>