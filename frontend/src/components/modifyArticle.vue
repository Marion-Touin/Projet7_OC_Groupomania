<template>
    <main>
        <div>
            <!--Bouton pour poster un message-->
            <b-button v-on:click="show=true; modifyArticle(article.id)" class="modal__button">MODIFIER</b-button>
            <!--En-tête du modulable-->
            <b-modal v-model="show" title="Modifier un article" class="modal__title">
                <!--Contenu du modulable-->
                <b-container fluid>
                    <div class="article">
                        <form method="POST" v-on:submit.prevent="modifyArticle()">
                        <div>
                            <input class="article__input" type="textarea" name="message" aria-label="Contenu du message" v-model="message" placeholder="Votre message ...">
                            <span v-if="(!$v.message.required && $v.message.$dirty) && submited">Veuillez ajouter un message</span><br>
                        </div>
                        <div>
                            <input class="article__file" type="file" name="image" aria-label="Fichier à sélectionner" @change="onFileSelected">
                            <span v-if="(!$v.selectedFile.required && $v.selectedFile.$dirty) && submited">Veuillez ajouter une image</span>
                            <span v-if="selectedFile">Image sélectionnée : {{ selectedFile.name }}</span><br>
                        </div>  
                        
                            <button class="article__button" type="submit" id="btn-send-publication">PUBLIER</button>
                        </form>
                    </div>
                </b-container>
                <!--Footer du modulable-->
                <template #modal-footer visibilite="false">
                    <div></div>
                </template>
            </b-modal>
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
    name: 'ModifyArticle',
    data(){
        return{
            userId: localStorage.getItem("userId"),
            message: '',
            selectedFile: null,
            submited: false,
            show: false,
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
        modifyArticle(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                const userId = parseInt(localStorage.getItem('userId'));
                const token = localStorage.getItem('usertoken');
                let fd = new FormData();
                fd.append('userId', userId);
                fd.append('message', this.message);
                fd.append('image', this.selectedFile, this.selectedFile.name);
                axios.put('http://localhost:8080/api/articles',this.article.id, fd, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    alert('Votre article a bien été enregistré !')
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>