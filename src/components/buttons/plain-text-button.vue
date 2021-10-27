<template>
    <button 
        class="submit" 
        @click="$emit('button-action')"> 
        
        <div
            class="text"
            v-if="!isLoading">
            {{ buttonText }}
        </div>

        <div 
            class="loader"
            v-if="isLoading"
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";


export default defineComponent({
    name: "plain-text-button",
    props: ['buttonText', 'isLoading']
});
</script>

<style scoped>
    .submit{
        width: 91%;
        height: 100%;
        font-weight: 700;
        background: rgb(16, 16, 16);
        border: 1px solid rgb(16, 16, 16);
        margin: 0% auto 0%;
        font-size: 90%;
        border-radius: 5px;
        cursor: pointer;
        outline: none;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .submit:disabled{
        opacity: 0.7;
    }
    .text {
        color: white;
    }
    .loader {
        height: 13px;
        width: 83px;
    }
    .loader div {
        background: white;
    }
</style>

