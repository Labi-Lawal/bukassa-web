<template>
    <section class="students">
        <div class="head">
            <div class="section_title"> Students </div>
            <div class="create_new_wrapper">
                <ButtonIconText 
                    buttonText="Create New Lesson"
                    buttonIcon="plus"
                />
            </div>
        </div>
        <div class="lessons_list">
            <GridList
                v-if="userLessons.length > 0"
                :list-items="userLessons"
            />
        </div>
        <div class="no_lesson">
            <div>
                <div class="icon">
                    <img src="" />
                </div>
                <div class="label">You have not added any lesson</div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import GridList from "@/components/lists/grid-list.vue";
import ButtonIconText from "@/components/buttons/ButtonIconText.vue";

export default defineComponent({
    name:"students",
    components: { GridList, ButtonIconText },
    data() {
        console.log(this.$store.getters.tutorData);
        return {
            students: this.$store.getters.tutorData.lessons
        }
    },
    methods: {
        
    },
});
</script>

<style scoped>
    .lessons {
        padding: 1%;
        position: relative;
    }
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }
    .create_new_wrapper {
        margin-left: auto;
        width: 15%;
        position: fixed;
        bottom: 10%;
        right: 10%;
    }
    .create_new_wrapper button {
        border: none ;
        border-radius: 5px;
        background: var(--paper-light-blue-100);
        color: var(--paper-light-blue-800);
    }
    .no_lesson {
        height: 100%;
        margin-top: 15%;
        text-align: center;
    }
    .no_lesson  .icon{
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
    .no_lesson .label {
        font-size: 140%;
        font-weight: 700;
        color: var(--paper-grey-400);
    }
    .no_lesson .label::selection {
        background: none;
    }

</style>