<template>
  <div class="nested_drop_down_frame" @mouseover=showNestedOptions @mouseleave=hideNestedOptions>
        <div class="display">
          <div class="lang">{{ allLanguages[selectedLangIndex].display_name }} . {{ allCurrencies[selectedCurrencyIndex].display_name }} </div>
          <font-awesome-icon :icon="['fas', 'caret-up']" class="icon" v-if=!isCollapsed[0] />
          <font-awesome-icon :icon="['fas', 'caret-down']" class="icon" v-if=isCollapsed[0] />
        </div>

        <div class="options" v-if=!isCollapsed[0]>
            <div class="langauge" @mouseover="showLangOptions" @mouseleave="hideLangOptions">
                Site Language
                <font-awesome-icon :icon="['fas', 'caret-right']" class="icon"/>
                <SelectOptions
                    :alloptions="allLanguages"
                    v-if="!isCollapsed[1]"
                    @selected=resetLanguage
                />
            </div>

            <div class="currency" @mouseover="showCurrencyOptions" @mouseleave="hideCurrencyOptions">
                Currency
                <font-awesome-icon :icon="['fas', 'caret-right']" class="icon"/>
                <SelectOptions
                    :alloptions="allCurrencies"
                    v-if="!isCollapsed[2]"
                    @selected=resetCurrency
                />
            </div>
        </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import DropDown from "./drop-down.vue";
import SelectOptions from "./SelectOptions.vue";

export default defineComponent({
    name: 'header-nested-drop-down',
    components: { DropDown, SelectOptions },
    data() {
        const allLanguages = [
            {
                display_name: "English",
                value: "english",
            },
            {
                display_name: "French",
                value: "french"
            },
            {
                display_name: "Yoruba",
                value: "yoruba"
            }
        ], 
        allCurrencies = [
            {   
                currency_name: 'Great Britain Pound',
                display_name: "GBP £",
                value: "£",
                rateFromDollar: 0.73
            },
            {   
                currency_name: 'Nigerian Naira',
                display_name: "NGN ₦",
                value: "₦",
                rateFromDollar: 470.00
            },
            {
                currency_name: 'United States Dollar',
                display_name: "USD $",
                value: "$",
                rateFromDollar: 1
            }
        ];

        var selectedLangIndex = 0,
        selectedCurrencyIndex = 0;


        return { 
            isCollapsed: [true, true, true],
            allLanguages,
            allCurrencies,
            selectedLangIndex,
            selectedCurrencyIndex,
        }
    },
    methods: {
        showNestedOptions() {
            this.isCollapsed[0] = false;
        },
        showLangOptions() {
            this.isCollapsed[1] = false;
        },
        showCurrencyOptions() {
            this.isCollapsed[2] = false;
        },
        hideNestedOptions() {
            this.isCollapsed[0] = true;
        },
        hideLangOptions() {
            this.isCollapsed[1] = true;
        },
        hideCurrencyOptions() {
            this.isCollapsed[2] = true;
        },
        hideAllOptions() {
            this.hideLangOptions();
            this.hideCurrencyOptions();
            this.hideNestedOptions();
        },

        resetLanguage(index) {
            this.selectedLangIndex = index;
            this.hideAllOptions();
            this.$store.commit('changePrefLanguage', this.allLanguages[index]);
        },
        resetCurrency(index) {
            this.selectedCurrencyIndex = index;
            this.hideAllOptions();
            this.$store.commit('changePrefCurrency', this.allCurrencies[index]);
        },

        getSelectedIndex() { 
            for (let index = 0; index < this.allCurrencies.length; index++) { 
                const element = this.allCurrencies[index]; 

                if (element.value == this.$store.state.prefCurrency.symbol) 
                    this.selectedCurrencyIndex = index;
            }

            for (let index = 0; index < this.allLanguages.length; index++) { 
                const element = this.allLanguages[index]; 
                
                if (element.value == this.$store.state.prefLanguage)
                    this.selectedLangIndex = index;
            }
        },
    },
    beforeMount() {
        if(localStorage.getItem("currency") == null ) {
            localStorage.setItem(
                "currency", 
                JSON.stringify({
                    currencyName: 'Great Britain Pound',
                    abbr: 'GBP',
                    symbol: '£',
                    rateFromDollar: 0.73
                })
            );

            this.$store.commit('changePrefCurrency', this.allCurrencies[0]);
        }
       
        if(localStorage.getItem("language") == null ) {
            localStorage.setItem(
                "language", 
                JSON.stringify({
                    display_name: "English",
                    value: "english",
                })
            );

            this.$store.commit('changePrefLanguage', this.allLanguages[0]);
        }
        
        this.getSelectedIndex();
    }
});
</script>

<style scoped>
.nested_drop_down_frame {
    width: 100%;
    height: 100%;
    position: relative;
}
.display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0% 2%;
    cursor: pointer;
}
.options {
    position: absolute;
    left: -1%;
    background: white;
    width: 100%;
    border-top: 1px solid var(--burgundy-white-text);
}
.options > div {
    padding: 10% 5%;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.2s;
}
.options > div:hover {
    background: var(--black-100);
    color: white;
}

.options > div {
    position: relative;
}

</style>