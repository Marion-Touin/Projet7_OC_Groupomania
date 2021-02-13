<template>
    <div>
        <Header />
        <createArticle />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import createArticle from '../components/createArticle.vue'

export default {
    name: 'Accueil',
    components:{
        Header,
        createArticle,
    },
}
</script>