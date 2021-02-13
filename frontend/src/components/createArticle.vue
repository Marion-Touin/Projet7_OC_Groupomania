<template>
    <main>
        <div class="article">
            <form class="article__form" method="post" v-on:submit.prevent="createArticle()">
                <div class="article__message">
                    <input class="article__input" type="text" name="message" id="message" placeholder="Votre message" v-model="message">
                </div>
                <div class="article__image" v-if="!image">
                    <input class="article__image--button" type="file" @change="onFileChange">
                </div>
                <div v-else>
                    <img :src="image" />
                    <button @click="removeImage">Remove image</button>
                </div>
                <div class="article__button">
                    <button class="article__submit" type="submit">POSTER</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'createArticle',
    data(){
        return{
            form: {
                message: '',
                image: '',
            }
        }
    },
    methods:{
        createArticle(){
            axios.post('http://localhost:8080/api/articles', this.form)
                 .then((res) => {
                     console.log(res)
                 })
                 .catch((error) => {
                     console.log(error)
                 });
        }
    }
}
</script>

<style lang="scss" scoped>
$color: #a92323;
.article{
    border: $color 2px solid;
    margin: 2% 20%;
    &__form{
        display: flex;
    }
    &__message{
        width: 50%;
    }
    &__button{
        width: 25%;
    }
    &__image{
        width: 25%;
    }
    &__input{
        height: 100px;
        width: 90%;
        margin: 5% 5%;
    }
    &__submit{
        padding: 5% 35%;
        margin: 20% 0;
    }
    &__image{
        margin: auto;
    }

}

</style>