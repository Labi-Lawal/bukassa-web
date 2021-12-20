<template>
    <div class="empty_list">
        <div class="icon">
            <img src="../../assets/icons/tutor.png" />
        </div>
        <div class="label">{{ text }}</div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: 'empty-list',
    props: ['text', 'image']
});
</script>

<style scoped>
    .empty_list {
        width: 100;
        padding: 4% 0%;
    }
    .icon{
        width: 50px;
        height: 50px;
    }
    .label {
        font-size: 180%;
        font-weight: 700;
        color: var(--paper-grey-400);
    }
    .label::selection {
        background: none;
    }
</style>