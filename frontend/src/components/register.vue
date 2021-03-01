<template>   
    <div>
        <headerHome/>
        <div class="register__intro">
            <p class="register__intro--text">Le réseau social pour les employés !</p>
        </div>
        <div class="authentification__form">
            <form class="register__form" method="post" v-on:submit.prevent="register()">
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
                <div class="register__button">
                    <button class="register__submit" type="submit">S'INSCRIRE</button>
                    <router-link to="/login" class="register__connexion">CONNEXION</router-link>
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
import { required, alpha, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
    name: 'Register',
        components:{
        headerHome,
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
                    alert('Votre compte a bien été créé! Vous pouvez à présent vous connecter!');
                    this.$router.push('/login');
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
$color: #CF515D;
.register{
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
        margin: 5%;
        border-radius: 10px;
    }
    &__connexion{
        border: #0A2041 1px solid;
        border-radius: 10px;
        background-color: #CF515D;
        color: #FFF;
        font-size: 18px;
        padding: 2% 8%;
        margin: 5% ;
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
    .register{
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
    .register{
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
    .register{
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
    .register{
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
</style>