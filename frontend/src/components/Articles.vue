<template>
    <main>
        <!--Affichage du bouton pour créer un article-->
        <createArticle />
        <!--Affichage des articles-->
        <div id="article" v-for="article in articles" :key="article.articleId" class="article">
            <b-card no-body class="article__card">
                <template #header>
                    <div class="admin">
                        <p class="article__name">{{ article.user.username }}</p>
                        <a v-on:click="deleteUser(article.user.id)" v-if="role == 'admin'" class="article__deleteuser">supprimer</a>
                    </div>
                    <b-card-text class="article__date">Le {{ article.createdAt | formatDate }}</b-card-text>
                        <b-dropdown text="..." class="button">
                            <!--Bouton pour supprimer l'article-->
                            <b-dropdown-item>        
                                <a v-on:click="deleteArticle(article.id)" v-if="article.userId == userId || role == 'admin'" class="article__delete">SUPPRIMER</a>
                            </b-dropdown-item>
                            <!--Bouton pour modifier un article-->
                            <b-dropdown-item>        
                                <a v-on:click="modifyArticles(article.id)" v-if="article.userId == userId" class="article__modify"><modifyArticle/></a>
                            </b-dropdown-item>
                        </b-dropdown>
                </template>

                <b-card-body>
                    <b-card-text class="article__message">{{article.message}}</b-card-text>
                    <b-card :img-src = "article.image" img-alt = "Image de la carte"  img-bottom class="article__image"></b-card>
                </b-card-body>

                <b-card-footer>
                    <!-- <createCommentaire /> -->
                    <a v-on:click="createComment(article.id)" class="article__comment"><createCommentaire/></a>
                    <Commentaires/>
                </b-card-footer>
            </b-card>
        </div>
    </main>
</template>

<script>
import axios from 'axios' 
import createArticle from '../components/createArticle.vue'
import createCommentaire from '../components/createCommentaire.vue' 
import modifyArticle from '../components/modifyArticle.vue'
import Commentaires from '../components/commentaires.vue'
export default {
    name: 'Articles',
    components: {
        createArticle,
        createCommentaire,
        modifyArticle,
        Commentaires, 
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
        createComment(id){
            const articleId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/articles/' + articleId
            axios.get(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    sessionStorage.setItem('articleId', parseInt(res.data.id));
                })
            .catch(error => console.log(error));
        },
        modifyArticles(id){
            const articleId = id;
            const token = localStorage.getItem('usertoken');
            const url = 'http://localhost:8080/api/articles/' + articleId
            axios.get(url, {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res);
                    sessionStorage.setItem('articleId', parseInt(res.data.id));
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
        margin: 2% 5% 2% 30%;
    }
    &__message{
        font-size: 20px;
        text-align: justify;
        margin: 5% 10%;       
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
        border: #0A2041 2px solid;
    }
    &__header{
        display: flex;
    }
    &__image{
        width: 55%;
        margin: 0 auto ;
    }
    &__comment{
        margin: 2% 70%;
    }
    &__name{
        font-size: 20px;
    }
    &__deleteuser{
        font-size: 15px;
        color: #0A2041;
    }
}
.card-header{
    display: flex;
}
.card-body{
    padding: 0;
}
.card-footer{
    display: flex;
    flex-direction: column;
    margin: 2% 0;
    background-color: #FFF;
}
.admin{
    display: flex;
    flex-direction: column;
    width: 30%;
}

@media all and (max-width: 1024px){
    .article{
        width: 70%;
        &__date{
            margin: 2% 5% 2% 22%;
        }
        &__image{
            width: 35%;
        }
    }
}

@media all and (max-width: 727px){
    .article{
        width: 80%;
        &__date{
            font-size: 10px;
            margin: 1% 2%;
        }
        &__message{
            font-size: 15px;      
        }
        &__delete{
            font-size: 10px;
        }
        &__modify{
            font-size: 10px;
        }
        &__image{
            width: 30%;
        }
        &__comment{
            margin: 2% 55%;
        }
        &__name{
            font-size: 15px;
            margin: 0;
        }
        &__deleteuser{
            font-size: 10px;
            color: #0A2041;
        }
    }
    .button{
        height: 35px;
    }
}
</style>