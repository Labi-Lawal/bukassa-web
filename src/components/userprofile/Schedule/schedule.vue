<template>
    <section class="schedule">
        <TutorFullScheduleCalendar 
            v-if="user.role === 'tutor'"
            :events="tutor.events"
            showingTo="tutor"
        />

        <StudentFullScheduleCalendar 
            v-if="user.role === 'student'"
            :events="user.classes"
            showingTo="student"
        />
    </section>    
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import TutorFullScheduleCalendar from "@/components/tutor/TutorFullScheduleCalendar.vue";
import StudentFullScheduleCalendar from "@/components/student/StudentFullScheduleCalendar.vue";

export default defineComponent({
    name: 'schedule',
    components: { TutorFullScheduleCalendar, StudentFullScheduleCalendar },
    data() {
        var user, tutor;

        return {
            user,
            tutor
        }
    },
    beforeMount() {
        this.user = this.$store.getters.userData;

        if(this.user.role == 'tutor') {
            this.tutor = this.$store.getters.tutorData
        }
    }
});
</script>

<style scoped>
.schedule {
    
}
</style>