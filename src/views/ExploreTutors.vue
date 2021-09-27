<template>
    <div class="exploretutors">
        <Header />
        <div class="all-tutors grid-list">
            <div class="tutor">
                <router-link to="/tutors/tutorname/">
                    <div class="profile">
                        <img src="../assets/user1.jpg" alt="">
                        <div class="details">
                            <div class="name"> Angel Sonja </div>
                            <div class="lang"> English, French, Spanish </div>
                        </div>
                    </div>
                    <div class="summary">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit, viverra curabitur porttitor senectus porta lobortis praesent pellentesque, netus bibendum quis condimentum ac ut
                    </div>
                    <div class="pointers">
                        <div class="rating">
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star-half']" />
                        </div>
                        <div class="price">
                            $500
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="tutor">
                <router-link to="/tutors/tutorname/">
                    <div class="profile">
                        <img src="../assets/user1.jpg" alt="">
                        <div class="details">
                            <div class="name"> Angel Sonja </div>
                            <div class="lang"> English, French, Spanish </div>
                        </div>
                    </div>
                    <div class="summary">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit conubia, odio dignissim tempor massa nisl mus.
                    </div>
                    <div class="pointers">
                        <div class="rating">
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star-half']" />
                        </div>
                        <div class="price">
                            $500
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="tutor">
                <router-link to="/tutors/tutorname/">
                    <div class="profile">
                        <img src="../assets/user1.jpg" alt="">
                        <div class="details">
                            <div class="name"> Angel Sonja </div>
                            <div class="lang"> English, French, Spanish </div>
                        </div>
                    </div>
                    <div class="summary">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit conubia, odio dignissim tempor massa nisl mus.
                    </div>
                    <div class="pointers">
                        <div class="rating">
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star-half']" />
                        </div>
                        <div class="price">
                            $500
                        </div>
                    </div>
                </router-link>
            </div>
              <div class="tutor">
                <router-link to="/tutors/tutorname/">
                    <div class="profile">
                        <img src="../assets/user1.jpg" alt="">
                        <div class="details">
                            <div class="name"> Angel Sonja </div>
                            <div class="lang"> English, French, Spanish </div>
                        </div>
                    </div>
                    <div class="summary">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit conubia, odio dignissim tempor massa nisl mus.
                    </div>
                    <div class="pointers">
                        <div class="rating">
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['fas', 'star-half']" />
                        </div>
                        <div class="price">
                            $500
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';

    export default {
        name: 'Home',
        components: {
            Header,
            Footer
        },
        mounted (){
            
        }
    }
</script>

<style scoped>
    .grid-list {
        display: grid;
        grid-template-columns: 24% 24% 24% 24%;
        column-gap: 20px;
        row-gap: 20px;
        padding: 1% 0%;
    }
    div.all-tutors {
        width: 90%;
        margin: 1% auto;
    }
    div.tutor {
        box-shadow: 3px 3px 25px 3px lightgrey;
        /* height: 160px; */
        border-radius: 10px;
        overflow: hidden;
        padding: 2%;
    }
    div.tutor div.profile {
        display: flex;
        padding: 0%;   
    }
    div.tutor div.profile img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        object-position: top;
    }
    div.tutor div.profile div.details {
        margin: auto 0% auto 5%;
    }
    div.tutor div.profile div.name {
        margin-bottom: 1%;
        font-weight: 700;
    }
    div.tutor div.profile div.lang {
        font-weight: 300;
        color: grey;
    }
    div.summary {
        margin: 4% 2%;
        color: grey;
        font-weight: 300;
        font-size: 110%;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-lines: 3;
    }
    div.pointers {
        display: flex;
        justify-content: space-between;
    }
    div.pointers div.price {
        font-weight: 700;
        font-size: 120%;
    }
</style>