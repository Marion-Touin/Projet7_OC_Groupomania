<template>
<div>
    <headerHome/>
        <div class="login__intro">
            <p class="login__intro--text">Le réseau social pour les employés !</p>
        </div>
        <div class="authentification__form">
            <form class="login__form" v-on:submit.prevent="login()">
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
                <div class="login__button">
                    <router-link to="/register" class="login__inscription">S'INSCRIRE</router-link>
                    <button class="login__submit" type="submit">SE CONNECTER</button>
                </div>
            </form>
        </div>
</div>

</template>

<script>
import headerHome from '../components/headerHome.vue'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import axios from 'axios'
import { required, email} from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    components:{
        headerHome,
    },
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
                    localStorage.setItem('usertoken', res.data.token);
                    localStorage.setItem('userId', parseInt(res.data.id));
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
$color: #CF515D;
.login{
    &__form{
        margin: 3% 15%;
    }
    &__label{
        display: flex;
        justify-content: center;
        color: #FFF;
        font-size: 22px;
        text-align: center;
    }
    &__input{
        width: 100%;
        border-radius: 10px;
    }
    &__submit{
        border: #CF515D 1px solid;
        background-color: #FFF;
        color: #0A2041;
        font-size: 20px;
        padding: 2% 8%;
        margin: 8% 0;
        border-radius: 10px;
    }
    &__inscription{
        border: #0A2041 1px solid;
        background-color: #CF515D;
        color: #FFF;
        border-radius: 10px;
        font-size: 20px;
        padding: 2% 8%;
        margin: 8% 0;
        text-decoration: none;
    }
    &__button{
        display: flex;
        justify-content: space-around;
    }
    &__intro{
        background-color: $color;
        width: 40%;
        height: 100px;
        line-height: 100px;
        margin: 2% auto;
        opacity: 0.8;
        &--text{
            font-size: 30px;
            color: #FFF;
            text-align: center;
        }
    }
}
.authentification{
    &__form{
        border: $color 2px solid;
        background-color: #0A2041;
        opacity: 0.8;
        width: 35%;
        margin: 0 auto;
   }
}
.error{
    color: #FFF;
}

//responsive tablette
@media all and (max-width: 1024px){
    .login{
        &__intro{
            width: 75%;
            margin: 5% auto;
        }
        &__label{
            font-size: 30px;
        }
        &__submit{
            margin: 15% 5%;
            font-size: 13px;
        }
        &__inscription{
            margin: 15% 5%;
            font-size: 14px;
        }
    }
    .authentification{
        &__form{
            width: 65%;
        }
    }
}
//responsive smartphone
@media all and (max-width: 727px){
    .login{
        &__intro{
            width: 80%;
            height: 70px;
            line-height: 70px;  
            &--text{
                font-size: 15px;
            }
        }
        &__label{
            font-size: 18px;
        }
        &__button{
            display: flex;
            flex-direction: column;
        }
        &__submit{
            margin: 7% 5% 0;
        }
        &__connexion{
            margin: 7% 5%;
            text-align: center;
        }
    }
    .authentification{
        &__form{
            width: 80%;
        }
    }
}

//responsive tablette
@media all and (max-width: 1024px){
    .login{
        &__intro{
            width: 75%;
            margin: 5% auto;
        }
        &__label{
            font-size: 30px;
        }
        &__submit{
            margin: 10% 5%;
        }
        &__connexion{
            margin: 10% 5%;
        }
    }
    .authentification{
        &__form{
            width: 65%;
        }
    }
}
//responsive smartphone
@media all and (max-width: 727px){
    .login{
        &__intro{
            width: 80%;
            height: 70px;
            line-height: 70px;  
            &--text{
                font-size: 15px;
            }
        }
        &__label{
            font-size: 18px;
        }
        &__button{
            display: flex;
            flex-direction: column;
        }
        &__submit{
            margin: 7% 5% 0;
        }
        &__inscription{
            margin: 7% 5%;
            text-align: center;
        }
    }
    .authentification{
        &__form{
            width: 80%;
        }
    }
}
</style>