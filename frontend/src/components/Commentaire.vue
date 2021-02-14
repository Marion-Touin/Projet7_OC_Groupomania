<template>
    <div>
        <form class="article__form" method="post" v-on:submit.prevent="createArticle()">
            <div class="article__message">
                <input class="article__input" type="text" name="message" id="message" placeholder="Votre message" v-model="message">
            </div>
            <div class="article__image" v-if="!image">
                <input class="article__image--button" type="file" @change="onFileChange">
            </div>
            <div v-else>
                <img :src="image" />
                <button @click="removeImage">Remove image</button>
            </div>
            <div class="article__button">
                <button class="article__submit" type="submit">COMMENTER</button>
            </div>
        </form>
    </div>
</template>