<template>
    <div class="accueil">
        <Header />
        <Articles />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Articles from '../components/Articles.vue'
export default {
    name: 'Accueil',
    components:{
        Header,
        Articles,
    },
}
</script>

<style lang="scss" scoped>
.accueil{
    background-color: #CF515D;
}
</style>