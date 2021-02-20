<template>
    <main>
        <!--Affichage de l'article-->
        <div id="user" v-for="user in users" :key="user.userId" class="user">
            <p>Bonjour {{user.username}} !</p>
            <p>Voici les informations de votre compte : </p>
            <p> USERNAME : {{user.username}}</p>
            <p>EMAIL : {{user.email}}</p>
            <p>{{user.id}}</p>
            <p>Creation du compte: {{ user.createdAt | formatDate }}</p>

            <!--Bouton pour supprimer l'article-->
            <button v-on:click="deleteUser(user.id)" v-if="user.userId == userId || role == 'admin'">Supprimer</button>

            
        </div>
    </main>
</template>

<script>
import axios from 'axios' 

export default {
    name: 'Users',
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
            const token = localStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:8080/api/user/', header)
            .then(res => {
                const data = res.data;
                this.users = data;
                console.log(data)
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