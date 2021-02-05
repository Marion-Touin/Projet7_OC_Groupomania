
<template>   
    <div class="register" >
        <form class="register__form" method="post" v-on:submit.prevent="register()">
            <h1 class="register__title">Formulaire d'inscription</h1>
            <div>
                <label class="register__label" for="username">Pseudonyme:</label>
                <input class="register__input" type="text" name="username" id="username" v-model="username"><br/>
                <span class="error" v-if="(!$v.username.required && $v.username.$dirty) && submited">Veuillez saisir votre pseudonyme !</span>
                <span class="error" v-if="!$v.username.alpha && $v.username.$dirty">Veuillez saisir un pseudonyme valide !</span>
            </div>
            <div>
                <label class="register__label" for="email">Email:</label>
                <input class="register__input" type="email" name="email" id="email" v-model="email" v-on:focus="deActivate"><br/>
                <span class="error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez saisir un email valide !</span>
                <span class="error" v-if="responseEmailError">L'inscription a échouée, merci de réessayer !</span>
            </div>
            <div>
                <label class="register__label" for="password">Mot de passe:</label>
                <input class="register__input" type="password" name="password" id="password" v-model="password"><br/>
                <span class="error" v-if="(!$v.password.required && $v.password.$dirty) && submited">Veuillez saisir un mot de passe !</span>
                <span class="error" v-if="(!$v.password.isPasswordStrong) && $v.password.$dirty">Votre mot de passe doit être contenir minimum 8 caractères avec au moins une minuscule, une majuscule, un chiffre et un caractère spécial.</span>
            </div>
            <div>
                <button class="register__submit" type="submit">S'INSCRIRE</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, alpha, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    name: 'Register',
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
        register() {
            this.$v.$touch();
            this.submited = true;
            console.log(!this.$v.password.isPasswordStrong);
            console.log(!this.$v.password.$dirty);
            if(!this.$v.$invalid) {
                axios.post('http://localhost:8080/api/user/register',{
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    console.log(res);
                    alert('Votre compte a bien été créé! Vous pouvez à présent vous connecter!')
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
.register{
    padding-bottom: 10%;
    background-color: #09FB98;
    &__form{
    border: #FFF 2px solid;
    margin: 0 50% 0 15%;
    }
    &__title{
    margin-left: 25%;
    padding-bottom: 3%;
    text-decoration: underline;
    }
    &__label{
    margin-left: 38%;
    font-size: 25px;
    color: #861313;
    }
    &__input{
    width: 80%;
    height: 35px;
    margin-left: 10%;
    border-color: #861313;
    }
    &__submit{
    width: 50%;
    height: 50px;
    margin: 5% 0 5% 25%;
    font-size: 20px;
    border-color: #861313;
    background-color: #FFF;
    }
}
.error{
    color: #000;
}
</style>