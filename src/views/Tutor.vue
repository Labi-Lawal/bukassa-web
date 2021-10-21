<template>
    <div class="tutor">
        <Header />
        <section class="body" v-if="!isLoading">
            <div class="details">
                <div class="intro-vid">
                    <IntroVideo :videoLink="tutor.intro_vid"/>
                </div>
                <div class="tutor-profile">
                    <div class="left">
                        <img :src="tutor.image" alt="">
                        <div class="buttons">
                            <button @click="showContactModal">
                                <font-awesome-icon :icon="['fas', 'comments']" />
                                <div class="text">Chat Me</div>
                            </button>
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">TUTOR</div>
                        <div class="tutor-name">{{ tutor.tutor_name }}</div>
                        <div class="languages">
                            <div class="lang"> {{ tutor.language_skills.join(',') }} </div>
                        </div>
                        <div class="ratings">
                            <TutorRatingsIcon :rating="tutor.rating" :showDigit="false"/>
                        </div>
                        <div class="metrics">
                            <div>
                                <div class="title">Total Students</div>
                                <div class="number">2,234,353</div>
                            </div>
                            <div>
                                <div class="title">Ratings</div>
                                <div class="number">{{ tutor.rating }}</div>
                            </div>
                            <div>
                                <div class="title">Reviews</div>
                                <div class="number">{{ tutor.reviews.length }}</div>
                            </div>
                        </div>
                        <div class="bio">
                            <div class="section-title">About Me</div>
                            <div class="content">
                                {{ tutor.bio.substr(0, 1).toUpperCase() + tutor.bio.substr(1, tutor.bio.length) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="action">
                <div class="package-box">
                    <div class="section-title">Lessons</div>
                    <div class="all-packages">
                        <div class="package">
                            <div class="package-details">
                                <div class="duration">50 mins</div>
                                <div class="lang">English Class</div>
                            </div>
                            <div class="price">$150</div>
                        </div>
                        <div class="package">
                            <div class="package-details">
                                <div class="duration">45 mins</div>
                                <div class="lang">Spanish Class</div>
                            </div>
                            <div class="price">$250</div>
                        </div>
                    </div>
                </div>
                <div class="calendar">
                    <div class="section-title">Schedule</div>
                    <Calendar />
                </div>
            </div>
            <div id="contactModalBackDrop" @click="hideContactModal"></div>
            <div id="contactModalFrame">
                <div class="contactModal">
                    <div class="contactHead">
                        <div class="name">Contact Priscilia Jose</div>
                        <div class="cancelcontact" @click="hideContactModal"><font-awesome-icon :icon="['fas', 'times']" /></div>
                    </div>
                    <div class="questions">
                        <div class="field">
                            <div class="question">What is the main reason you're taking lessons?</div>
                            <select>
                                <option selected disabled hidden>Please select an option</option>
                                <option>School</option>
                                <option>Test</option>
                                <option>Work</option>
                                <option>Travel</option>
                                <option>Personal Interest</option>
                                <option>Lessons are for my child</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="field">
                            <div class="question">Is there a specific area that you would like to focus on during your lessons?</div>
                            <select>
                                <option selected disabled hidden>Please select an option</option>
                                <option>School</option>
                                <option>Test</option>
                                <option>Work</option>
                                <option>Travel</option>
                                <option>Personal Interest</option>
                                <option>Lessons are for my child</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="field">
                            <div class="question">What language proficiency level are you aiming for?</div>
                            <select>
                                <option selected disabled hidden>Please select an option</option>
                                <option>School</option>
                                <option>Test</option>
                                <option>Work</option>
                                <option>Travel</option>
                                <option>Personal Interest</option>
                                <option>Lessons are for my child</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="field">
                            <div class="question">What language proficiency level are you aiming for?</div>
                            <textarea></textarea>
                        </div>
                        <div class="field">
                            <div class="question">What language proficiency level are you aiming for?</div>
                            <textarea></textarea>
                        </div>
                    </div>
                    <div class="send">
                        <button class="cancel" @click="hideContactModal">CANCEL</button>
                        <button class="send-message" @click="hideContactModal">SEND</button>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<script>
    import Header from '../components/Header.vue';
    import IntroVideo from "../components/tutor/intro-video.vue";
    import TutorRatingsIcon from "../components/TutorRatingsIcon.vue";
    import Calendar from '../components/Calendar.vue';
    import Footer from '../components/Footer.vue';
    import net from '../services/http';

    export default {
        name: 'Tutor',
        components: {
            Header,
            IntroVideo,
            TutorRatingsIcon,
            Calendar,
            Footer,
        },  
        data() {
            return {
                isLoading: true,
                tutor: { }
            }
        },
        methods: {
            showContactModal() {
                const contactModalBackDrop = document.getElementById("contactModalBackDrop");
                const contactModalFrame = document.getElementById("contactModalFrame");

                contactModalBackDrop.style.display = "block";
                contactModalFrame.style.display = "flex";
            },
            hideContactModal() {
                const contactModalBackDrop = document.getElementById("contactModalBackDrop");
                const contactModalFrame = document.getElementById("contactModalFrame");

                contactModalBackDrop.style.display = "none";
                contactModalFrame.style.display = "none";
            },
            async fetchTutorData() {
                try {
                    const response = await net.http.get('/tutors/' + this.$route.params.name);
                    this.tutor = response.data.data;
                    this.isLoading = false;

                } catch (error) {
                    console.log(error);
                }
            }
        },
        beforeMount() {
            this.fetchTutorData();
        }
    }
</script>

<style scoped>
    section.body {
        width: 80%;
        margin: 0% auto;
        display: flex;
        justify-content: space-between;
    }
    div.details {
        width: 60%;
    }
    div.action {
        width: 30%;
    }
    div.intro-vid {
        border-radius: 0px 0px 15px 15px;
        overflow: hidden;
        height: 400px;
        width: 100%;
    }
    div.tutor-profile {
        z-index: 10;
        position: relative;
        margin: 0% 0% 0%;
        display: flex;
        padding: 1% 0% 0%;
    }
    div.left {
        width: 20%;
        text-align: center;
    }
    div.left img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        object-position: top;
        margin: 0% 0% 0%;
    }
    div.left div.buttons {
        margin: 4% 0% 0%;
    }
    div.left button {
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 40px;
        font-size: 100%;
        background: none;
        font-weight: 700;
        margin: 0% 0% 2%;
    }
    div.left button > svg {
        width: 30%;
    }
    div.left button > div.text {
        width: 60%;
        text-align: start;
    }
    div.left button:hover {
        background: black;
        cursor: pointer;
    }
    div.left button:hover > * {
        color: white;
    }
    div.right {
        padding: 4% 0% 0% 4%;
        margin-left: 0%;
        width: 80%;
    }
    div.right div.title {
        font-weight: 700;
        font-size: 100%;
        color: grey;
    }
    div.right div.tutor-name {
        font-size: 260%;
        font-weight: 700;
        text-transform: capitalize;
    }
    div.right div.languages {
        text-transform: capitalize;
    }
    div.right div.languages > div{
        margin-right: 1%;
        font-weight: 700;
    }
    div.ratings {
        padding: 2% 0%;
        display: flex;
    }
    div.ratings div.number {
        margin-left: 5%;
        font-weight: 700;
    }
    div.metrics {
        margin: 3% 0%;
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    div.metrics > div > div.title{
        font-weight: 600;
        font-size: 90%;
    }
    div.metrics > div > div.number{
        font-weight: 700;
        font-size: 150%;
        margin-top: 4%;
    }
    div.bio div.content{
        font-size: 110%;
        font-weight: 300;
        color: rgb(63, 63, 63);
    }
    div.schedule {
        margin: 0 auto;
    }
    div.section-title {
        font-weight: 600;
        font-size: 110%;
        padding: 3% 0%;
    }

    div.action {
        
    }
    div.action div.section-title {
        font-size: 140%;
        font-weight: 700;
        padding: 4%;
    }
    div.package-box {
        margin-top: 5%;
        border: 1px solid lightgrey;
        border-radius: 5px;
    }
    div.all-packages {
        
    }
    div.package {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4%;
        border-top: 1px solid lightgrey;
    }
    div.package div.duration {
        font-weight: 500;
        font-size: 90%;
    }
    div.package div.lang {
        font-size: 80%;
        margin-top: 5%;
        font-weight: 400;
    }
    div.price {
        font-size: 150%;
        font-weight: 600;
    }
    div.calendar {
        border: 1px solid lightgrey;
        border-radius: 4px;
        margin-top: 5%;
    }

    div#contactModalBackDrop {
        display: none;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.452);
        z-index: 1000;
    }
    div#contactModalFrame {
        display: none;
        align-items: center;
        justify-content: center;
        width: 30%;
        top: 0px;
        left: 35%;
        height: 100vh;
        position: absolute;
        z-index: 1000;
        padding: 5% 0%;
    }
    div.contactModal {
        width: 100%;
        background: white;
        border-radius: 5px;
    }
    div.contactHead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2% 4%;
        border-bottom: 1px solid lightgrey;
        font-weight: 400;
    }
    div.cancelcontact {
        font-size: 140%;
        cursor: pointer;
    }
    div.field {
        width: 90%;
        margin: 0% auto;
        padding: 2% 0%;
    }
    div.question {
        margin: 0% auto;
        padding: 2% 1%;
        font-weight: 300;
        color: rgb(119, 119, 119);
    }
    select {
        width: 100%;
        font-size: 100%;
        border: 1px solid lightgrey;
        padding: 3% 0%;
        font-weight: 300;
        color: grey;
        outline: none;
    }
    option {
        margin: 2% 0%;
    }
    textarea {
        width: 90%;
        height: 100px;
        display: block;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 5%;
        outline: none;
        color: #333;
        font-size: 14px;
        resize: none;   
    }
    div.send {
        padding: 4% 5%;
        border-top: 1px solid lightgrey;
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid #ccc;

    }
    div.send > button {
        padding: 3% 5%;
        border: 1px solid #ccc;
        background: none;
        color: rgb(97, 97, 97);
        font-weight: 700;
        cursor: pointer;
    }
    div.send > button:hover{
        background: rgb(224, 224, 224);
    }
    div.send button.cancel {
        margin-right: 2%;
    }

</style>


