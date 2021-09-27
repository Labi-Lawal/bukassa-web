<template>
    <div class="profile">
        <Header />
        <section class="profile-frame">
           
        </section>
        <Footer />
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    
    export default {
         components: {
            Header,
            Footer
        },
    }
</script>

<style scoped>
    section.profile-frame {
        border: 1px solid rgb(240, 240, 240);
        width: 80%;
        height: 80vh;
        margin: 2% auto;
        display: flex;
    }
    div.nav {
        border-right: 1px solid rgb(240, 240, 240);
        text-align: center;
        width: 15%;
    }
    div.nav div.initial {
        border: 1px solid black;
        height: 90px;
        width: 90px;
        border-radius: 50%;
        margin: 5% auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: black;
        color: white;
        font-weight: 600;
        font-size: 150%;
    }
    div.nav div.name {
        font-weight: 700;
        font-size: 120%;
    }
    div.links {
        margin-top: 20%;
    }
    div.links div {
        color: grey;
        font-weight: 600;
        font-size: 100%;
        padding: 5% 0%;
    }
    div.links div:hover {
        background: rgb(250, 250, 250);
        color: grey;
        cursor: pointer;
    }
    div.details{
        width: 85%;
    }
</style>