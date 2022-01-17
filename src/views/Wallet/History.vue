<template>
    <div class="wallet_history">
        <div class="head">
            <div class="section_title">Transaction History</div>
        </div>
        <div class="table">
            <StudentWalletTable />
        </div>
    </div>
</template>
<script>

import StudentWalletTable from "@/components/Table/StudentWalletTable.vue";

export default {
    components: { StudentWalletTable },
    data() {
        console.log();
        var user, tutor;

        if(this.$store.getters.userData.transactions){
            user = this.$store.getters.userData.transactions;
        } else {
            tutor = this.$store.getters.tutorData.wallet.history;
        }
        console.log(user);
        console.log(tutor);
        return {
            user, tutor
        }
    }
}
</script>
<style scoped>
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }
</style>