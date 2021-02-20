<template>
    <div class="profile">
        <main>
            <div id="profile" v-for="user in profile" :key="user.userId">
                <h3>Bonjour <span>{{ user.username }}</span> ravi de vous revoir !</h3><hr>
                <div id="profile_informations">
                    <p>{{ userId.username }}</p>
                    <p>Vous êtes parmis nous depuis le :</p>
                    <p>{{ user.createdAt | formatDate }}</p>
                </div> 
                <button @click="toggleModale">Supprimer mon compte</button>
                <div id="modal-confirmation" v-if="showModal===true" @close="toggleModale">
                    <hr>
                    <p id="confirm-delete">Etes vous sûr de vouloir supprimer votre compte ?</p>
                    <button id="confirm" @click="deleteAccount">OUI</button>
                    <button id="cancel" @click="toggleModale">NON</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Profile',
    props: ['userId', 'token'],
    data(){
        return {
            profile:"",
            showModal: false
        }
    },
    methods:{
        toggleModale(){
            this.showModal = !this.showModal
        },
        deleteAccount(){
            axios.delete('http://localhost:8080/api/user/' + this.userId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(() => {
                console.log("Profil supprimé");
                sessionStorage.clear();
                this.$store.commit("setAuthentication", false);
                this.$router.push('/login');
            })
        },
                printNewusers(){
            const token = localStorage.getItem('usertoken');
            const header = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('http://localhost:8080/api/user/', header)
            .then(res => {
                const data = res.data;
                this.users = data;
            })
            .catch(error => console.log({error}));
        }
    },
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