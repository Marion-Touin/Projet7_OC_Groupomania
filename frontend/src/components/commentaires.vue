<template>
    <main>
        <!--Affichage de l'article-->
        <div id="commentaire" v-for="commentaire in commentaires" :key="commentaire.id">
            <b-card no-body class="commentaire__card">
                <template #header>
                    <p class="commentaire__name">{{ commentaire.user.username }}</p>
                    <a v-on:click="deleteUser(commentaire.user.id)" v-if="role == 'admin'">supprimer</a>
                    <b-card-text class="commentaire__date">Le {{ commentaire.createdAt | formatDate }}</b-card-text> 
                        <b-dropdown text="...">
                            <!--Bouton pour supprimer un commentaire-->
                            <b-dropdown-item>
                                <a v-on:click="deleteCommentaire(commentaire.id)" v-if="commentaire.userId == userId || role == 'admin'" class="commentaire__delete">SUPPRIMER</a>
                            </b-dropdown-item>
                            <!--Bouton pour modifier un commentaire-->
                            <b-dropdown-item>        
                                <a v-on:click="modifyCommentaires(commentaire.id)" v-if="commentaire.userId == userId" class="commentaire__modify"><modifyCommentaire/></a>
                            </b-dropdown-item>
                        </b-dropdown>
                </template>

                <b-card-body>
                    <b-card-text class="commentaire__message">{{commentaire.message}}</b-card-text>
                    <b-card :img-src = "commentaire.image"  img-alt = "Image de la carte"  img-bottom class="commentaire__image"></b-card> 
                </b-card-body>
            </b-card>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import modifyCommentaire from '../components/modifyCommentaire.vue'
export default {
    name: 'Commentaires',
        components: {
        modifyCommentaire,
    },
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
                alert('utilisateur supprimé');
            })
            .catch(error => console.log(error));
        },
        modifyCommentaires(id){
            const commentaireId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/commentaires/' + commentaireId
            axios.get(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res);
                    sessionStorage.setItem('commentaireId', parseInt(res.data.id));
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
<style lang="scss" scoped>
$color: #a92323;
.commentaire{
    width: 40%;
    margin: 0 auto;
    border: $color 1px solid;
    margin-bottom: 5%; 
    &__date{
        font-size: 15px;
        margin: 2% 5% 2% 50%;
    }
    &__message{
        font-size: 20px;
        text-align: justify;
        margin: 2% 10%;
        width: 100%;       
    }
    &__delete{
        width: 15%;
        height: 45px;
        color: #0A2041;
    }
    &__modify{
        color: #0A2041;
    }
    &__card{
        max-width: 100%;
        border: $color 2px solid;
    }
    &__header{
        display: flex;
    }
    &__image{
        width: 20%;
        margin: 0 auto ;
    }
    &__name{
        font-size: 20px;
    }
}
.card-header{
    display: flex;
    background-color: #FFF;
}
.card-body{
    padding: 0;
}
.main{
    width: 100%;
}
</style>