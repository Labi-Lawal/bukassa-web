<template>
    <div class="become_tutor">
        <CommunityHeader />
        
        <div class="body">
            <router-view />
        </div>

        <SiteFooter />
    </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import CommunityHeader from "@/components/Header/CommunityHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";

export default defineComponent({
    components: { CommunityHeader, SiteFooter }
})
</script>
<style scoped>
    .body {
        width: 90%;
        margin: 5% auto;
    }
</style>