<template>
    <div class="select" >
        <div
            tabindex=0
            :class="{
                display: true,
                hide_border: (hideBorder) ?true :false,
                open: (isOptionsVisible) ?true :false
            }"
            :style="{
               'z-index': raiseBy
            }" 
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
            :style="{
               'z-index': raiseBy
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
    name: 'drop-down',
    props: [
        'placeholder',
        'options',
        'isOptionsVisible',
        'selected', 
        'selectedIndex', 
        'hideIcon', 
        'hideBorder', 
        'raiseBy',
        'dropdownIndex'
    ],
    data(){
        return { }
    },
    methods: {
        optionSelected (index){
            this.$emit('option-select', { dropdownIndex: this.dropdownIndex, optionIndex: index });
        }
    }
});
</script>

<style scoped>
    .select {
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
    }
    .select *::selection {
        background: none;
    }
    .display {
        height: 100%;
        width: 100%;
        padding: 1% 0;
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
    .display:focus {
        outline-color: var(--paper-light-blue-500);
    }
    .display.hide_border {
        border: none;
    }
    .display > div {
        display: flex;
        align-items: center;
        margin: auto 0;
        margin-left: 5%;
    }
    .display div.selected-option, div.display div.placeholder-option {
        width: 90%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .display div.placeholder-option {
        color: rgba(146, 146, 146, 0.705);
    }
    .icon {
        width: 10%;
        justify-content: center;
    }
    .open {
        border-radius: 5px 5px 0px 0px;
    }

    .options {
        border: 1px solid lightgrey;
        background: white;
        position: absolute;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        left: 0;
        top: 120%;
        padding: 2% 0%;
        border-radius: 0 0 5px 5px;
    }
    .option {
        display: flex;
        align-items: center;
        text-align: start;
        color: grey;
        padding: 3% 6%;
        text-transform: capitalize;
    }
    .option:hover {
        background: rgb(216, 216, 216);
    }
</style>