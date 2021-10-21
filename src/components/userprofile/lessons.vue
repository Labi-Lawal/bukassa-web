<template>
    <section class="lessons">
        <grid-list :list-items="userLessons"/>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import GridList from "@/components/lists/grid-list.vue";

export default defineComponent({
    name:"lessons",
    components: { GridList },
    props: ["userLessons"],
    data() {
        return {}
    },
    methods: {

    },
});
</script>

<style scoped>
    section.lessons {
        border: 1px solid;
        padding: 1%;
    }
</style>