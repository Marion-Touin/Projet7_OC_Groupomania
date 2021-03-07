<template>
    <main>
        <!--Affichage de l'article-->
        <div id="commentaire" v-for="commentaire in commentaires" :key="commentaire.articleId">
            <b-card :img-src = "commentaire.image"  img-alt = "Image de la carte"  img-bottom> 
                <b-card-text>le {{ commentaire.createdAt | formatDate }}</b-card-text> 
                <b-card-text>{{commentaire.message}}</b-card-text>
                <!-- <p>{{ commentaire.userId.username }}</p> -->

                <!--Bouton pour supprimer un commentaire-->
                <button v-on:click="deleteCommentaire(commentaire.id)" v-if="commentaire.userId == userId || role == 'admin'">Supprimer</button>
            </b-card> 
        </div>
    </main>
</template>

<script>
import axios from 'axios' 
export default {
    name: 'Commentaires',
    data(){
        return {
            commentaires: "",
            role: "",
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('usertoken'),
        }
    },
    methods:{
         deleteCommentaire(id){
            const commentaireId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/commentaires/' + commentaireId
            axios.delete(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('commentaire supprimé');
            })
            .catch(error => console.log(error));
        },
        printNewCommentaires(){
            const token = localStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:8080/api/commentaires/', header)
            .then(res => {
                const data = res.data;
                this.commentaires = data;
            })
            .catch(error => console.log({error}));
        }
    },
    beforeMount() {
        const role = localStorage.getItem('role');
        this.role = role;
        this.printNewCommentaires();
    },
}
</script>