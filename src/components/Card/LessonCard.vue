<template>
    <div class="lesson_card">
        <div class="lesson_card_details">
            <div class="title">{{ title }}</div>
            <div class="lang">{{ language }}</div>
            <div class="duration">{{ convertTime(duration) }} Minutes </div>
        </div>
        <div class="right_dets">
            <div class="edit_icon_frame">
                <router-link :to="'lessons/'+id">
                    <font-awesome-icon :icon="['fas', 'edit']" class="edit_icon" />
                </router-link>
            </div>
            <div class="price">
                <div>{{ appendCurreny(price) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import  appendCurreny  from "../../helper/currency.js";
import  duration  from "../../helper/duration.js";

export default defineComponent({
    name: 'lesson-card',
    props: ['id', 'title', 'price', 'duration', 'language'],
    data() {
        return {
            appendCurreny
        }
    },
    methods: {
        convertTime(time) {
            return duration.convertMilliSecsToMins(time);
        }
    },
});
</script>

<style scoped>
    .lesson_card{
        box-shadow: 0px 0px 10px 2px rgb(241, 241, 241);
        width: 96%;
        height: 100px;
        margin: 0% 0% 2% 0%;
        border-radius: 5px;
        padding: 2%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .lesson_card > div {
        height: 100%;
    }
    .lesson_card_details {
        height: 100%;
    }
     .title{
        font-size: 150%;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: capitalize;
        color: rgb(95, 95, 95);
    }
    .lang{
        font-weight: 400;
        color: grey;
        font-size: 110%;
        text-transform: capitalize;
    }
    .duration{
        font-weight: 600;
        color: grey;
        font-size: 100%;
        margin-top: 30px;
    }

    .right_dets > div {
        height: 50%;
        display: flex;
    }
    .edit_icon_frame {
        justify-content: flex-end;
    }
    .edit_icon {
        font-size: 130%;
        color: var(--paper-grey-600);
        cursor: pointer;
    }
    .price {
        display: flex;
        align-items: flex-end;
        margin-top: auto;
        justify-content: center;
    }
    .price div {
        border-radius: 25px;
        width: max-content;
        background: rgba(195, 243, 239, 0.521);
        color: rgb(61, 189, 178);
        font-weight: 600;
        padding: 5px 10px;
        font-size: 120%;
    } 

</style>