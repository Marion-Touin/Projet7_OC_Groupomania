<template>
    <main>
        <Header />
        <!--Affichage de l'article-->
        <div>
            <p>Bonjour {{users.username}} !</p>
            <p>Voici les informations de votre compte : </p>
            <p> USERNAME : {{users.username}}</p>
            <p>EMAIL : {{users.email}}</p>
            <p>Creation du compte: {{ users.createdAt | formatDate }}</p>

            <!--Bouton pour supprimer l'article-->
            <button v-on:click="deleteUser(users.id)" v-if="userId = users.id">Supprimer</button>

            
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