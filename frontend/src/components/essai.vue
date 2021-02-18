<template>
    <div>
        <createArticle />
    </div>
</template>

<script>
import createArticle from '../components/createArticle.vue'

export default {
    name: 'Articles',
    components:{
        createArticle,
    },
}

</script>

<style lang="scss" scoped>
h2{
    text-align: center;
}
</style>