<template>
    <div class="header">
        <div class="header__image">
            <img src="../assets/logo-blanc-groupomania.png" class="header__image--logo" alt="logo groupomania">
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header{
    background-color: #0A2041;
    &__image{
        display: flex;
        &--logo{
            width: 25%;
            margin: 2% auto 1%;
        }
    }
}

@media all and (max-width: 1024px) {
    .header{
        padding: 3% 0;
        &__image{
            &--logo{
                width: 50%;
            }
        }
    }
}
</style>