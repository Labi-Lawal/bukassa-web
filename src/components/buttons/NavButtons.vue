w<template>
    <div class="nav_button">
        <ButtonPlainText
            v-for="(button, index) in buttons"
            :key="index"
            :buttonText="button.label"
            :class="{ selected: (selectedButtonIndex === index) ?true :false }"
            @buttonAction="$emit('change-button', index)"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonPlainText from "./ButtonPlainText.vue";

export default defineComponent({
    name: "plain-text-button",
    props: ['buttons', 'selectedButtonIndex'],
    components: { ButtonPlainText, },
    data() {
        return { }
    }
});
</script>

<style scoped>
    .nav_button {
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        border: 1px solid var(--burgundy-200);
    }
    button {
        width: 100%;
        height: 100%;
        font-weight: 700;
        font-size: 90%;
        cursor: pointer;
        outline: none;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        border-left: 1px solid var(--burgundy-200);
        color: var(--burgundy-200);
    }
    button:first-of-type {
        border: none;
    }
    .selected {
        background: var(--burgundy-200);
        color: white;
    }
</style>

