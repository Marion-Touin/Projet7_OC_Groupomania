
<template>   
    <div class="register" >
        <form
            class="register__form"
            method="post"
        >
            <h1 class="register__title">Formulaire d'inscription</h1>
            <p>
            <label for="username" class="register__label" required>Pseudonyme:</label>
            </p>
            <p>
            <input
                class="register__input"
                id="username"
                v-model="user.username"
                type="text"
                name="username"
            >
            </p>
            <p>
            <label for="email" class="register__label" required>Email:</label>
            </p>
            <p>
            <input
                class="register__input"
                id="email"
                v-model="user.email"
                type="text"
                name="email"
            >
            </p>
            <p>
            <label for="password" class="register__label" required>Mot de passe:</label>
            </p>
            <p>
            <input
                class="register__input"
                id="password"
                v-model="user.password"
                type="text"
                name="password"
            >
            </p>
            <p>
            <button
                class="register__submit"
                type="submit"
                @click="signup"
            >Envoyer
            </button>
            </p>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'signup',
    data() {
        return {
            user: {
                username: null,
                email: null,
                password: null,
            }
        }
    },
    components: {
    },
    methods: {
        signup(e) {
            axios.post("http://localhost:8080/api/user/register", this.user)
            .then(() => {
                alert('Votre compte a bien été créé! Vous pouvez à présent vous connecter!')
            })
            e.preventDefault();
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
    color: #8F0000;
    }
    &__input{
    width: 80%;
    height: 35px;
    margin-left: 10%;
    border-color: #8F0000;
    }
    &__submit{
    width: 50%;
    height: 50px;
    margin: 5% 0 5% 25%;
    font-size: 20px;
    border-color: #8F0000;
    background-color: #FFF;
    }
}
</style>