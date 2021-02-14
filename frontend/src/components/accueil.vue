<template>
    <div>
        <Header />
        <createArticle />
        <Articles />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import createArticle from '../components/createArticle.vue'
import Articles from '../components/Articles.vue'

export default {
    name: 'Accueil',
    components:{
        Header,
        createArticle,
        Articles,
    },
}
</script>