w<template>
    <div class="toggle_button">
        <ButtonIconText
            v-for="(button, index) in buttons"
            :key="index"
            :buttonIcon="button.icon"
            :buttonText="button.label"
            :class="{ selected: (selectedButtonIndex === index) ?true :false }"
            @buttonAction="$emit('change-button', index)"
        />
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonIconText from "./ButtonIconText.vue";

export default defineComponent({
    name: "plain-text-button",
    props: ['buttons', 'selectedButtonIndex'],
    components: { ButtonIconText },
    data() {
        return {
            
        }
    }
});
</script>

<style scoped>
    .toggle_button {
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
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
    }
    button:first-of-type {
        border: none;
    }
</style>

