<template>
    <main>
        <div>
            <!--Bouton pour poster un message-->
            <b-button @click="show=true" v-model="articles" class="modal__button">COMMENTER !</b-button>
            <!--En-tête du modulable-->
            <b-modal v-model="show" title="Création d'un commentaire" class="modal__title">
                <!--Contenu du modulable-->
                <b-container fluid>
                    <div class="article">
                        <form method="POST" v-on:submit.prevent="createCommentaire()">
                        <div>
                            <input class="article__input" type="textarea" name="message" aria-label="Contenu du message" v-model="message" placeholder="Votre message ...">
                            <span v-if="(!$v.message.required && $v.message.$dirty) && submited">Veuillez ajouter un message</span><br>
                        </div> 
                            <button class="article__button" type="submit" id="btn-send-publication">COMMENTER</button>
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
    name: 'CreateComment',
    data(){
        return{
            articles:'',
            message: '',
            submited: false,
            show: false,
        }
    },
    validations: {
        message: {
            required
        }
    },
    methods:{
        createCommentaire(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                const articleId = parseInt(sessionStorage.getItem('articleId'));
                const userId = parseInt(localStorage.getItem('userId'));
                const token = localStorage.getItem('usertoken');
                console.log (articleId)
                console.log(userId)
                console.log(token)
                console.log(this.message)
                let fd = new FormData();
                fd.append('userId', userId);
                fd.append('articleId', articleId);
                fd.append('message', this.message);
                console.log(fd)
                axios.post('http://localhost:8080/api/com', fd, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    console.log(fd)
                    alert('Votre commentaire a bien été enregistré !');
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>