<template>
    <section class="vertical-list">
        <div class="all-tutors" v-if="listType=='tutors'">
            <div class="tutor" v-for="(tutor, index) in listItems" :key="index">
                <div class="profile">
                    <img :src="tutor.image" alt="">
                    <div class="dets">
                        <div class="rating">
                           <TutorRatingsIcon :rating="tutor.rating" :showDigit="false"/>
                        </div>
                        <div class="lessons">{{ tutor.lessons.length }} Lessons</div>
                        <button class="btn_book">BOOK</button>
                    </div>  
                </div>
                <div class="details">
                    <router-link :to="`/tutor/${tutor.tutor_name}`"><div class="name"> {{ tutor.tutor_name }} </div></router-link>
                    <div class="career">{{ tutor.career }}</div>
                    <div class="under"></div>
                    <div class="label">LANGUAGES</div>
                    <div class="lang-box">
                        <div class="lang"> {{ tutor.language_skills.join(',') }} </div>
                    </div>
                    <div class="label">HOURLY RATE FROM</div>
                    <div class="price">
                        USD {{ (tutor.min_rate_usd).toFixed(2) }}
                    </div>
                </div>
                <div class="engagement">
                    <div class="nav">
                        <div :class="{selected: oneSelected[index]}" @click="oneselected(index)">VIDEO</div>
                        <div :class="{selected: twoSelected[index]}" @click="twoselected(index)">SCHEDULE</div>
                    </div>
                    <div class="content"> 
                        <div class="video-content" v-if="oneSelected[index]">
                            <IntroVideo :videoLink="tutor.intro_vid"/>
                        </div>
                        <div class="schedule-content" v-if="twoSelected[index]"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import IntroVideo from "../tutor/TutorIntrovideo.vue";
import TutorRatingsIcon from "../TutorRatingsIcon.vue";

export default defineComponent({
    components: { IntroVideo, TutorRatingsIcon },
    name: "grid-list",
    props: ["listItems", "listType"],
    data() {
        let oneSelected = [], twoSelected = [];

        this.listItems.forEach(item => {
            oneSelected.push(true);
            twoSelected.push(false);
        });

        return { 
            oneSelected, twoSelected
        }
    },
    methods: {
        oneselected(index) {
            this.oneSelected[index] = true;
            this.twoSelected[index] = false;
        },
        twoselected(index) {
            this.oneSelected[index] = false;
            this.twoSelected[index] = true;
        }
    }

});
</script>

<style scoped>
.grid-list {
    display: grid;
    grid-template-columns: 24% 24% 24% 24%;
    column-gap: 20px;
    row-gap: 20px;
    padding: 1% 0%;
}
div.tutor {
    box-shadow: 0px 0px 10px 1px lightgrey;
    border-radius: 10px;
    height: 200px;
    overflow: hidden;
    padding: 3% 0;
    display: flex;
    margin: 2% 0;
}
div.tutor div.profile {
    padding: 0%;
    text-align: center;
    width: 20%;
}
div.tutor div.profile img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    object-position: top;
}
div.lessons {
    margin-top: 10px;
    font-size: 90%;
}
div.dets {
    width: 100%;
}
div.dets button {
    width: 100px;
    height: 30px;
    margin-top: 10px;
}
div.dets div.rating {
    font-size: 90%;
}

div.details {
    height: 100%;
    width: 40%;
    margin: auto 0 auto 1%;
    border-right: 1px solid lightgrey;
}
div.details div.name {
    font-weight: 700;
    font-size: 130%;
    text-transform: capitalize;
}
div.details div.name:hover {
    text-decoration: underline;
}
div.lang-box {
    display: flex;
    margin-top: 1%;
}
div.details div.lang {
    margin-right: 1%;
    text-transform: capitalize;
}
div.career {
    text-transform: uppercase;
    font-size: 120%;
    font-weight: 400;
    margin-top: 2%;
}
div.under {
    margin-top: 1%;
    width: 6%;
    height: 2px;
    border-radius: 5px;
    background: crimson;
}
div.label {
    margin-top: 6%;
    color: grey;
}
div.summary {
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
    margin-top: 1%;
}
div.engagement {
    margin: 0% auto;
    height: 100%;
    width: 30%;
}
div.nav {
    display: flex;
    justify-content: space-around;
    height: 10%;
}
div.nav > div {
    cursor: pointer;
}
div.nav .selected {
    border-bottom: 2px solid black;
}
div.content {
    margin-top: 2%;
    height: 85%;
    display: flex;
    align-items: center;
    justify-content: center;
}
div.content > div {
    height: 100%;
    width: 100%;
}
div.video-content {
    
}
div.schedule-content {
    background: red;
}
.btn_book {
    border: 1px solid var(--burgundy-100);
    background: var(--burgundy-100);
    color: white;
    cursor: pointer;
}
</style>