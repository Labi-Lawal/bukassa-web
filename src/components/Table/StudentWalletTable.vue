<template>
    <div class="students_list_table">
        <Table 
            :tableHeadings="headings"
            :tableBody="body"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Table from './Table.vue';

export default defineComponent({
    name: 'students-wallet-table',
    components: { Table },
    data() {
        return {
            headings: [
                'Amount',
                'Tutor',
                'Lesson',
                'Class Date',
                'Txn Date'
            ],
            body: [
                [
                    25,
                    'Ms Mistura', 
                    'Greetings The Hausa Way Greetings The Hausa Way tableHeadings tableHeadings tableHeadings',
                    '23/1/2022',
                    '17/1/2022'
                ]
            ]
        }
    },
    methods: {

    }
})
</script>

<style scoped>

</style>