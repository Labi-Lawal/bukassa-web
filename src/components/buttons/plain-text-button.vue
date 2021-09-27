<template>
  <button class="submit" @click="$emit('button-action')">{{ buttonText }}</button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: "plain-text-button",
    props: ['buttonText']
});
</script>

<style scoped>
    button.submit{
        width: 91%;
        padding: 4% 0%;
        font-weight: 700;
        background: rgb(16, 16, 16);
        border: 1px solid rgb(16, 16, 16);
        color: white;
        margin: 0% 0% 0%;
        font-size: 90%;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
        opacity: 1;
    }
    button.submit:disabled{
        opacity: 0.7;
    }
</style>