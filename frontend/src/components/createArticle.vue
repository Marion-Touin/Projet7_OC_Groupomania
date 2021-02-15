<template>
    <main>
        <div class="article">
            <form class="article__form" method="POST" v-on:submit.prevent="create()">
                <div>
                    <input class="article__input" type="textarea" name="message" aria-label="Contenu du message" v-model="message" placeholder="Votre message ...">
                    <span v-if="(!$v.message.required && $v.message.$dirty) && submited">Veuillez ajouter un message</span><br>
                </div>
                <div>
                    <input class="article__file" type="file" name="image" aria-label="Fichier à sélectionner" @change="onFileSelected">
                    <span v-if="(!$v.selectedFile.required && $v.selectedFile.$dirty) && submited">Veuillez ajouter une image</span>
                    <span v-if="selectedFile">Image sélectionnée : {{ selectedFile.name }}</span><br>
                </div>  
                <button class="article__button" type="submit" id="btn-send-publication">Publier</button>
            </form>
        </div>
    </main>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'CreateArticle',
    data(){
        return{
            message: '',
            selectedFile: null,
            submited: false
        }
    },
    validations: {
        message: {
            required
        },
        selectedFile: {
            required
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile);
        },
        create(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                const userId = parseInt(localStorage.getItem('userId'));
                const token = localStorage.getItem('usertoken');
                let fd = new FormData();
                fd.append('userId', userId);
                fd.append('message', this.message);
                fd.append('image', this.selectedFile, this.selectedFile.name);
                axios.post('http://localhost:8080/api/articles', fd, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    alert('Votre post à bien été enregistré !')
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$color: #a92323;
.article{
    border: $color 2px solid;
    margin: 3% 25%;
    &__input{
        width: 80%;
        height: 50px;
        margin: 2% 10%;
        border: #09FB98 1px solid;
    }
    &__file{
        font-size: 20px;
        margin: 0px 25%
    }
    &__button{
        border: #09FB98 1px solid;
        border-radius: 0%;
        font-size: 20px;
        margin: 2% 40%;
        padding: 1% 5%;
    }
}

</style>