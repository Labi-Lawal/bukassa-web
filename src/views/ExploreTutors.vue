<template>
    <div class="exploretutors">
        <Header />

        <section class="body">
            <div class="sub-heading">Find the best tutor for you</div>
            <div class="sub">
                <div class="search-form">
                    <form class="search">
                        <input :type="searchModel.type" placeholder="Search tutors by keyword">
                        <button><font-awesome-icon :icon="['fas', 'search']" /></button>
                    </form>
                </div>
                <div class="tutors-found"> {{ listOfTutors.length }} tutors found</div>
            </div>
            <div class="all-tutors">
                <vertical-list list-type="tutors" :list-items="listOfTutors"/>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import Header from '@/components/Header.vue';
import VerticalList from '@/components/lists/vertical-list.vue';
import GridList from '@/components/lists/grid-list.vue';
import Footer from '@/components/Footer.vue';
import net from '@/services/http.js';
import Subheading from '@/components/title/subheading.vue';

export default defineComponent({
    name: 'Home',
    components: { Header, GridList, VerticalList, Subheading, Footer },
    data() {
        let listOfTutors = [];

        let searchModel = {
            type: 'text',
            value: ''
        }

        return { 
            listOfTutors,
            searchModel
        }
    },
    methods: {
        async fetchTutors() {
            try {
                let response = await net.http.get("/tutors/explore");
                console.log(this.listOfTutors);
                this.listOfTutors = response.data.data;

            } catch (error) {
                console.log(error.response);
            }
        }
    },
    beforeMount(){
        this.fetchTutors();
    }
})
</script>

<style scoped>  
    .body {
        width: 60%;
        margin: 0% auto;
        padding: 5% 0%;
    }
    div.sub-heading {
        font-weight: 400;
        font-size: 150%;
        margin-bottom: 2%;
        color: grey;
    }
    div.sub {
        display: flex;
        align-items: center;
        color: grey;
        margin-bottom: 4%;
    }
    div.tutors-found {
        padding: 1%;
        font-size: 100%;
        margin-left: 5%;
        border-radius: 5px;
        background: rgb(235, 235, 235);
    }
    div.search-form {
        width: 50%;
        height: 40px;
    }
    div.search-form form {
        border: 1px solid var(--border-color);
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    form.search input {
        width: 90%;
        border: none;
        outline: none;
        height: 100%;
        padding: 0 5%;
        font-size: 110%;
        font-weight: 300;
    }
    form.search input::placeholder {
        color: var(--border-color);
    }
    form.search button {
        font-size: 110%;
        width: 10%;
        border: none;
        outline: none;
        background: none;
        color: var(--border-color);
        text-align: center;
    }
</style>