<template>
    <main>
        <!--Affichage du bouton pour créer un article-->
        <createArticle />
        <!--Affichage de l'article-->
        <div id="article" v-for="article in articles" :key="article.articleId" class="article"> 
            <b-card :img-src = "article.image"  img-alt = "Image de la carte"  img-bottom> 
                <b-card-text class="article__date">le {{ article.createdAt | formatDate }}</b-card-text> 
                <b-card-text class="article__message">{{article.message}}</b-card-text>
                <b-card-text class="article__message">{{ article.userId}}</b-card-text>

                <!--Bouton pour supprimer l'article-->
                <button v-on:click="deleteArticle(article.id)" v-if="article.userId == userId || role == 'admin'">Supprimer</button>

                <!-- <createCommentaire /> -->
            </b-card> 
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import createArticle from '../components/createArticle.vue'
/* import createCommentaire from '../components/createCommentaire.vue' */

export default {
    name: 'Articles',
    components: {
        createArticle,
        /* createCommentaire, */
    },
    data(){
        return {
            articles: "",
            role: "",
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('usertoken'),
        }
    },
    methods:{
        deleteArticle(id){
            const articleId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/articles/' + articleId
            axios.delete(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('article supprimé');
            })
            .catch(error => console.log(error));
        },
        printNewarticles(){
            const token = localStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:8080/api/articles/', header)
            .then(res => {
                const data = res.data;
                this.articles = data;
                console.log(data)
            })
            .catch(error => console.log({error}));
        }
    },
    
    beforeMount() {
        const role = localStorage.getItem('role');
        this.role = role;
        this.printNewarticles();
    },
}
</script>

<style lang="scss" scoped>
$color: #a92323;
.article{
    width: 40%;
    margin: 0 auto;
    border: $color 1px solid;
    margin-bottom: 5%; 
    &__date{
        font-size: 15px;
        text-align: right;
    }
    &__message{
        font-size: 20px;
        text-align: justify;
        margin: 0 10%;       
    }
}
</style>