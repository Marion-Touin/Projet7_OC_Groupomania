<template>
    <div class="login">
        <form class="login__form">
            <h1 class="login__title">Formulaire de connexion</h1>
            <p>
            <label for="email" class="login__label" required>Email:</label>
            </p>
            <p>
            <input
                class="login__input"
                id="email"
                v-model="user.email"
                type="text"
                name="email"
            >
            </p>
            <p>
            <label for="password" class="login__label" required>Mot de passe:</label>
            </p>
            <p>
            <input
                class="login__input"
                id="password"
                v-model="user.password"
                type="text"
                name="password"
            >
            </p>
            <p>
            <button
                class="login__submit"
                type="submit"
                @click="login"
            >Envoyer
            </button>
            </p>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
	name: 'login',
	data() {
		return {
			user: {
				email: null,
				password: null,
			}
		}
	},
	components: {
	},
	methods: {
		login(e) {
            axios.post("http://localhost:8080/api/user/login", this.user)
            .then(() => this.$router.push("/accueil"))
            e.preventDefault();
		}
	} 
}
</script>

<style lang="scss" scoped>
.login{
    padding-bottom: 10%;
    background-color: #09FB98;
    &__form{
        border: #FFF 2px solid;
        margin: 0 15% 0 50%; 
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