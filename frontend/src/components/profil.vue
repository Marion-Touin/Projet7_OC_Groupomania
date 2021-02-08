<template>
    <div>
    <Header />
        <main>
            <div>
                <h3>Bonjour ravi de vous revoir !</h3>
            </div>
        </main>
    </div>
</template>
<script>
import Header from '../components/Header.vue'

export default {
    name: 'Accueil',
    components:{
        Header,
    },
}

</script>