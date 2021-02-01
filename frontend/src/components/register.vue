
<template>   
    <div class="form" >
        <form
            class="form__form"
            method="post"
        >
            <h1 class="title">Formulaire d'inscription</h1>
            <p>
            <label for="username" class="form__label" required>Pseudonyme:</label>
            </p>
            <p>
            <input
                class="form__input"
                id="username"
                v-model="user.username"
                type="text"
                name="username"
            >
            </p>
            <p>
            <label for="email" class="form__label" required>Email:</label>
            </p>
            <p>
            <input
                class="form__input"
                id="email"
                v-model="user.email"
                type="text"
                name="email"
            >
            </p>
            <p>
            <label for="password" class="form__label" required>Mot de passe:</label>
            </p>
            <p>
            <input
                class="form__input"
                id="password"
                v-model="user.password"
                type="text"
                name="password"
            >
            </p>
            <p>
            <button
                class="form__submit"
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
            axios.post("http://localhost:8080/api/register", this.user)
            .then(() => {
                alert('Votre compte a bien été créé !')
            })
            e.preventDefault();
        }
    } 
}
</script>

<style>
.title{
    margin-left: 25%;
    padding-bottom: 3%;
    text-decoration: underline;
}
.form__label{
    margin-left: 38%;
    font-size: 25px;
    color: #8F0000;
}
.form__input{
  
    width: 80%;
    height: 35px;
    margin-left: 10%;
    border-color: #8F0000;
}
.form__submit{
    width: 50%;
    height: 50px;
    margin: 5% 0 5% 25%;
    font-size: 20px;
    border-color: #8F0000;
    background-color: #FFF;
}
.form__form{
    border: #FFF 2px solid;
    margin: 0 50% 0 15%;
}
.form{
    padding-bottom: 10%;
}
</style>