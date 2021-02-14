<template>
    <div class="login">
        <div class="login__image">
            <router-link to="/" class="login__image--position"><img src="../assets/logo.png" class="login__image--logo" alt="logo groupomania"></router-link>
        </div>
        <form class="login__form" v-on:submit.prevent="login()">
            <h1 class="login__title">Formulaire de connexion</h1>
            <div>
                <label class="login__label" for="email">Email:</label>
                <input class="login__input" type="email" name="email" id="email" value="" v-model="email" v-on:focus="deActivate">
                <span class="error" v-if="((!$v.email.required || !$v.email.email) && $v.email.$dirty) && submited">Veuillez saisir un email valide !</span>
            </div>
            <div>
                <label class="login__label" for="password">Mot de passe:</label>
                <input class="login__input" type="password" name="password" id="password" value="" v-model="password" v-on:focus="deActivate">
                <span class="error" v-if="(!$v.password.required && $v.password.$dirty) && submited">Veuillez saisir votre mot de passe </span>
            </div>
                <span class="error" v-if="responseError && submited">Votre e-mail/votre mot de passe est incorrect !</span>
            <div>
                <button class="login__submit" type="submit">SE CONNECTER</button>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import axios from 'axios'
import { required, email} from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    data(){
        return{
            email:"",
            password:"",
            submited: false,
            responseError: false
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        }
    },
    methods: {
        deActivate() {
            this.responseError = false
        },
        login(){
            this.submited = true;
            this.$v.$touch();
            if (!this.$v.$invalid){
                axios.post('http://localhost:8080/api/user/login',{
                    email: this.email,
                    password: this.password
                },
                {
                    headers:{ 'Content-type': 'application/json'}
                })
                .then(res => {
                    console.log(res.data)
                    localStorage.setItem('usertoken', res.data.token);
                    localStorage.setItem('id', parseInt(res.data.id));
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('username', res.data.username);

                    this.$router.push('/accueil');  
                })
                .catch(error => {
                    console.log({error});
                    this.responseError = true;
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$color: #a92323;
.login{
    padding-bottom: 10%;
    &__image{
        display: flex;
        &--position{
            margin: 2% auto ;
        }
        &--logo{
            margin: 0 22%;
            width: 60%;
        }
    }
    &__form{
    border: $color 2px solid;
    margin: 0 10%;
    padding: 2% 2%
    }
    &__title{
    text-decoration: underline;
    font-size: 50px;
    text-align: center;
    padding-bottom: 3%;
    }
    &__label{
    margin-left: 40%;
    font-size: 35px;
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
    margin: 5% 0 5% 25%;
    font-size: 20px;
    border-color: $color;
    background-color: #FFF;
    }
}
.error{
    color: #000;
}

@media all and (max-width: 1024px){
    .login{
        &__image{
            &--logo{
                margin: 5% 19%;
            }
        }
        &__title{
            font-size: 40px;
        }
    }

}

@media all and (max-width: 767px){
    .login{
        &__title{
            font-size: 20px;
        }
        &__label{
            margin-left: 35%;
            font-size: 20px;
        }
        &__input{
            margin: 2% 10%;
            width: 80%;
        }
        &__submit{
            width: 70%;
            margin: 5% 17%;
            font-size: 15px;
        }
    }
}
</style>