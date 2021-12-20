<template>
    <div class="select" >
        <div
            tabindex=0
            class="display" 
            :class="(hideBorder)?'hide-border':''" 
            @click="$emit('show-options', dropdownIndex)"
            @keypress.enter="$emit('show-options', dropdownIndex)"
        >
            <div class="placeholder-option" v-if="placeholder!=undefined && !selected">{{placeholder}}</div>
            <div class="selected-option" v-if="placeholder!=undefined && selected">{{options[selectedIndex].display_name}}</div>
            <div class="selected-option" v-if="placeholder==undefined && selected">{{options[selectedIndex].display_name}}</div>
            <div class="icon" v-if="!hideIcon">
                <font-awesome-icon :icon="['fas', 'caret-down']" v-if="!isOptionsVisible"/>
                <font-awesome-icon :icon="['fas', 'caret-up']" v-if="isOptionsVisible"/>
            </div>
        </div>
        <div 
            class="options"
            :class="{
                raise_by_1_level: (raiseByOne == 1) ? true : false,
                raise_by_2_level: (raiseByOne == 2) ? true : false,
                raise_by_3_level: (raiseByOne == 3) ? true : false,
                raise_by_4_level: (raiseByOne == 4) ? true : false,
                raise_by_5_level: (raiseByOne == 5) ? true : false
            }" 
            v-if="isOptionsVisible"
        >
            <div 
                tabindex=1
                class="option" 
                v-for="(option, index) in options" 
                :key="option.value" 
                @click="optionSelected(index)"
                @keypress.enter="optionSelected(index)"
            > 
                {{ option.display_name }}
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'Drop-Down',
    props: [
        'placeholder', 
        'options', 
        'isOptionsVisible',
        'selected', 
        'selectedIndex', 
        'hideIcon', 
        'hideBorder', 
        'raiseByOne',
        'dropdownIndex'
    ],
    data(){
        return { }
    },
    methods: {
        optionSelected (index){
            this.$emit('option-select', { dropDownIndex: this.dropdownIndex, optionIndex: index });
        }
    }
});
</script>

<style scoped>
    div.select {
        height: 80%;
        width: 100%;
        cursor: pointer;
        position: relative;
    }
    div.select *::selection {
        background: none;
    }
    div.display {
        height: 100%;
        padding: 1% 6%;
        display: flex;
        text-align: start;
        border: 1px solid lightgrey;
        border-radius: 5px;
        text-transform: capitalize;
        font-size: 105%;
        color: rgb(83, 83, 83);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    div.display:focus {
        outline-color: var(--paper-light-blue-500);
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
        margin: auto 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    div.display div.placeholder-option {
        color: rgba(146, 146, 146, 0.705);
    }
    div.icon {
        width: 10%;
        justify-content: center;
    }
    div.options {
        border: 1px solid lightgrey;
        background: white;
        position: absolute;
        width: 99.2%;
        left: 0;
        top: 115%;
        padding: 2% 0%;
        border-radius: 0 0 5px 5px;
    }
    .raise_by_1_level {
        z-index: 1;
    }
    .raise_by_2_level {
        z-index: 2;
    }
    .raise_by_3_level {
        z-index: 3;
    }
    .raise_by_4_level {
        z-index: 4;
    }
    .raise_by_5_level {
        z-index: 5;
    }
    div.option {
        display: flex;
        align-items: center;
        text-align: start;
        color: grey;
        padding: 3% 6%;
        text-transform: capitalize;
    }
    div.option:hover {
        background: rgb(216, 216, 216);
    }
</style>