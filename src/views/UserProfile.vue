<template>
    <div class="profile">
        <Header />
        <section class="profile-frame">
            <div class="profile-head">
                <div class="user">
                    <div class="user-image">
                        <img src="../assets/userimage.png">
                    </div>
                    <div class="user-info"> 
                        <div class="role">STUDENT</div>
                        <div class="name">Dummy Denkins</div>
                        <div class="metrics">
                            <div class="">
                                <div class="title">Total Classes</div>
                                <div class="figure">4</div>
                            </div>
                            <div class="">
                                <div class="title">Classes Taken</div>
                                <div class="figure">1</div>
                            </div>
                            <div class="">
                                <div class="title">Pending Classes</div>
                                <div class="figure">3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-nav">
               <router-link to="/profile/schedule" class="nav" :class="($route.name)"><div>SCHEDULE</div></router-link>
               <router-link to="/profile/lessons" class="nav"><div>LESSONS</div></router-link>
               <router-link to="/profile/tutors" class="nav"><div>TUTORS</div></router-link>
               <router-link to="/profile/edit" class="nav"><div>EDIT PROFILE</div></router-link>
            </div>
            <router-view />
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
        data(){
            console.log(this.$route);
            return {}
        }
    }
</script>

<style scoped> 
    section.profile-frame {
        width: 70%;
        height: 80vh;
        margin: 0 auto;
    }
    div.profile-head {
        height: 250px;
        display: flex;
        width: 70%;
        margin: 0 auto;
    }
    div.user {
        width: 100%;
        display: flex;
        /* justify-content: space-between; */
    }
    div.user-image {
        border-radius: 50%;
        width: 150px;
        height: 150px;
        margin: auto 0%;
        margin-left: 5%;
        overflow: hidden;
        background: rgb(238, 238, 238);
    }
    div.user-info {
        margin: auto 25% auto auto;
    }
    div.user-info div.role {
        font-size: 90%;
        color: grey;
        font-weight: 700;
    }
    div.user-info div.name {
        font-size: 200%;
        font-weight: 700;
    }
    div.metrics {
        width: 150%;
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
    }
    div.metrics div.title {
        font-size: 90%;
        color: grey;
        font-weight: 600;
    }
    div.metrics div.figure {
        font-size: 150%;
        font-weight: 700;
    }

    div.profile-nav {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;
        border-bottom: 1px solid lightgrey;
    }
    div.profile-nav .nav {
        width: calc(100% / 8);
        height: 100%;
        text-align: center;
        padding: 2% 0%;
        font-weight: 500;
        color: grey;
        margin-bottom: -1px;
    }
    div.profile-nav .router-link-exact-active {
        border-bottom: 2px solid black;
        color: black;
    }
</style>