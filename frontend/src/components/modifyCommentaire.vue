<template>
    <main>
        <div>
            <!--Bouton pour poster un message-->
            <a @click="show=true">MODIFIER</a>
            <!--En-tête du modulable-->
            <b-modal v-model="show" title="Modifier votre message">
                <!--Contenu du modulable-->
                <b-container fluid>
                    <div>
                        <form method="POST" v-on:submit.prevent="modifyCommentaire()">
                        <div>
                            <input type="textarea" name="message" aria-label="Contenu du message" v-model="message" placeholder="Votre message ...">
                            <span v-if="(!$v.message.required && $v.message.$dirty) && submited">Veuillez ajouter un message</span><br>
                        </div>
                        <div>
                            <input type="file" name="image" aria-label="Fichier à sélectionner" @change="onFileSelected">
                            <span v-if="(!$v.selectedFile.required && $v.selectedFile.$dirty) && submited">Veuillez ajouter une image</span>
                            <span v-if="selectedFile">Image sélectionnée : {{ selectedFile.name }}</span><br>
                        </div>  
                            <button type="submit" id="btn-send-publication">MODIFIER</button>
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
    name: 'modifyCommentaire',
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
        modifyCommentaire(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                const commentaireId = parseInt(sessionStorage.getItem('commentaireId'));
                const userId = parseInt(localStorage.getItem('userId'));
                const token = localStorage.getItem('usertoken');
                const url = 'http://localhost:8080/api/commentaires/' + commentaireId
                let fd = new FormData();
                fd.append('userId', userId);
                fd.append('commentaireId', commentaireId);
                fd.append('message', this.message);
                fd.append('image', this.selectedFile, this.selectedFile.name);
                axios.put(url, fd, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    alert('Votre commentaire à bien été modifié !');
                    sessionStorage.clear();
                    document.location.reload();
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>