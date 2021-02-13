<template>
    <div>
    <Header />
        <main>
            <div>
                <h2 class="profil__titre">Bonjour (nom) !</h2>
            </div>
            <div>
                <form class="profil__form" method="post" v-on:submit.prevent="modify()">
                <h3 class="profil__title">Modifer mes informations !</h3>
                    <div>
                        <label class="profil__label" for="username">Pseudonyme:</label>
                        <input class="profil__input" type="text" name="username" id="username" v-model="username"><br/>
                        <span class="error" v-if="(!$v.username.required && $v.username.$dirty) && submited">Veuillez saisir votre pseudonyme !</span>
                        <span class="error" v-if="!$v.username.alpha && $v.username.$dirty">Veuillez saisir un pseudonyme valide !</span>
                    </div>
                    <div>
                        <label class="profil__label" for="email">Email:</label>
                        <input class="profil__input" type="email" name="email" id="email" v-model="email" v-on:focus="deActivate"><br/>
                        <span class="error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez saisir un email valide !</span>
                        <span class="error" v-if="responseEmailError">L'inscription a échouée, merci de réessayer !</span>
                    </div>
                    <div>
                        <label class="profil__label" for="password">Mot de passe:</label>
                        <input class="profil__input" type="password" name="password" id="password" v-model="password"><br/>
                        <span class="error" v-if="(!$v.password.required && $v.password.$dirty) && submited">Veuillez saisir un mot de passe !</span>
                        <span class="error" v-if="(!$v.password.isPasswordStrong) && $v.password.$dirty">Votre mot de passe doit être contenir minimum 8 caractères avec au moins une minuscule, une majuscule, un chiffre et un caractère spécial.</span>
                    </div>
                    <div>
                        <button class="profil__submit" type="submit">MODIFIER</button>
                    </div>
                </form>
            </div>
            <div>
                <button class="profil__submit" type="submit">Supprimer mon compte</button>
            </div>
        </main>
    </div>
</template>
<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, alpha, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import Header from '../components/Header.vue'

export default {
    name: 'Profil',
    components:{
        Header,
    },
    data(){
        return{

            username: "",
            email:"",
            password:"",
            submited: false,
            responseEmailError: false
        }
    },
    validations: {
        username: {
            required,
            alpha
        },
        email: {
            required,
            email
        },
        password:{
            required,
            isPasswordStrong(password) {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_]){8,}/;
                return regex.test(password);
            }
        }
    },
       methods: {
        deActivate() {
            this.responseEmailError= false
        },
        modify() {
            this.$v.$touch();
            this.submited = true;
            if(!this.$v.$invalid) {
                axios.put('http://localhost:3000/api/auth/',{
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    console.log(res);
                    alert('Votre compte a bien été modifié !')
                })
                .catch(error => {
                    this.responseEmailError = true;
                    console.log({error})
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$color: #a92323;
.profil{
    padding-bottom: 10%;
    &__titre {
        font-size: 40px;
        text-align: center;
    }
    &__form{
    border: $color 2px solid;
    margin: 0 20%;
    padding: 0 2%
    }
    &__title{
    text-decoration: underline;
    font-size: 35px;
    text-align: center;
    }
    &__label{
    margin-left: 40%;
    font-size: 25px;
    color: $color;
    }
    &__input{
    margin: 2% 20%;
    width: 60%;
    height: 35px;
    border-color: $color;
    }
    &__submit{
    width: 50%;
    height: 50px;
    margin: 3% 0 3% 25%;
    font-size: 20px;
    border-color: $color;
    background-color: #FFF;
    }
}
.error{
    color: #000;
}
</style>