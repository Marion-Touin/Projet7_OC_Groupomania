<template>
    <div id="create-message">
        <form method="POST" v-on:submit.prevent='submit()'>
            <div>
                <input id="message" type="text" aria-label="Commentaire" v-model="message" placeholder="Ecrivez un commentaire...">
                <span v-if="(!$v.message.required && $v.message.$dirty) && submited" class="error-message">Veuillez écrire un commentaire avant de valider</span>
            </div>
            <button type="submit" id="btn-send-publication">COMMENTER</button>
        </form>
    </div>
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
            message: "",
            submited: false
        }
    },
    validations:{
        message:{
            required
        }
    },
    methods:{
        submit(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                const userId = parseInt(localStorage.getItem('userId'));
                const token = localStorage.getItem('usertoken');
                let fd = new FormData();
                fd.append('userId', userId);
                fd.append('message', this.message);
                axios.post('http://localhost:8080/api/commentaires', fd, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(() => {
                    alert('Votre commentaire à bien été enregistré !')
                })
                .catch(error => console.log(error));
            }
        }
    }
}
</script>