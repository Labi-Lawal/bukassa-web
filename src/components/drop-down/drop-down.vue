<template>
    <div class="select">
        <div class="display" :class="(hideBorder)?'hide-border':''" @click="$emit('show-options')">
            <div class="placeholder-option" v-if="placeholder!=undefined && !selected">{{placeholder}}</div>
            <div class="selected-option" v-if="placeholder!=undefined && selected">{{options[selectedIndex].display_name}}</div>
            <div class="selected-option" v-if="placeholder==undefined && selected">{{options[selectedIndex].display_name}}</div>
            <div class="icon" v-if="!hideIcon">
                <font-awesome-icon :icon="['fas', 'caret-down']" v-if="!isOptionsVisible"/>
                <font-awesome-icon :icon="['fas', 'caret-up']" v-if="isOptionsVisible"/>
            </div>
        </div>
        <div class="options" v-if="isOptionsVisible">
            <div class="option" v-for="(option, index) in options" :key="option.value" @click="optionSelected(index)"> {{ option.display_name }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'Drop-Down',
    props: ['options', 'selected', 'selectedIndex', 'placeholder', 'isOptionsVisible', 'hideIcon', 'hideBorder'],
    data(){
        console.log(this.options[this.selectedIndex]);
        return {}
    },
    methods: {
        optionSelected (index){
            this.$emit('option-select', index);
        }
    }
});
</script>

<style scoped>
    div.select {
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
    }
    div.select *::selection {
        background: none;
    }
    div.display {
        height: 100%;
        padding: 0% 6%;
        display: flex;
        border: 1px solid lightgrey;
    }
    div.display.hide-border {
        border: none;
    }
    div.display > div {
        display: flex;
        align-items: center;
    }
    div.display div.selected-option, div.display div.placeholder-option {
        width: 90%;
    }
    div.display div.placeholder-option {
        color: rgb(156, 156, 156);
    }
    div.icon {
        width: 10%;
        justify-content: center;
    }
    div.options {
        border: 1px solid lightgrey;
        background: white;
        position: absolute;
        width: 97%;
        left: 0;
        top: 105%;
        padding: 2% 0%;
        border-radius: 2px;
    }
    div.option {
        display: flex;
        align-items: center;
        height: 30px;
        color: grey;
        padding: 0% 6%;
    }
    div.option:hover {
        background: rgb(216, 216, 216);
    }
</style>