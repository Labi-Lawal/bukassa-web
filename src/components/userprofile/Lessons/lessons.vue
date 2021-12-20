<template>
    <section class="lessons_frame">
        <div class="head">
            <div class="section_title"> Lessons </div>
            <div class="create_new_wrapper">
                <ButtonIcon
                    iconName="plus"
                    @buttonAction="createNewLesson()"
                />
            </div>
        </div>

        <div class="lessons_list" v-if="userLessons.length > 0">
            <VerticalList :lessons="userLessons" />
        </div>
        
        <div class="no_lesson" v-else>
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
import VerticalList from "@/components/lists/VerticalList.vue";;
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";

export default defineComponent({
    name:"lessons",
    components: { VerticalList, ButtonIcon },
    data()  {
        console.log(this.$store.getters.tutorData);
        return {
            userLessons: this.$store.getters.tutorData.lessons
        }
    },
    methods: {
        createNewLesson() {
            this.$router.push('lessons/create');
        }
    },
});
</script>

<style scoped>
    .lessons_frame {
        padding: 1%;
        position: relative;
        height: 100%;
    }
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }
    .create_new_wrapper {
        width: 80px;
        height: 80px;
        position: absolute;
        bottom: 20%;
        right: 5%;
    }
    .create_new_wrapper button {
        border-radius: 50%;
        border: none;
        background: var(--paper-light-blue-100);
        box-shadow: var(--shadow-100);
        color: var(--paper-light-blue-800);
        font-size: 200%;
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