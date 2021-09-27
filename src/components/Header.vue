<template>
    <header>
        <div class="logo">
            <router-link to="/">
                BUKASSA
            </router-link>
        </div>
        <div class="drop-down">
            <div class="language-drop-down">
                <Drop-Down 
                    :options="allLanguages" 
                    :selected="selected[0]" 
                    :selectedIndex="selectedLanguageIndex" 
                    :isOptionsVisible="isOptionsVisible[0]" 
                    :hideIcon="true"
                    :hideBorder="true"
                    @show-options="toggleOptions(0)" 
                    @option-select="resetLanguage" 
                />
            </div>
            <div class="dot"></div>
            <div class="currencies-drop-down">
                <Drop-Down 
                    :options="allCurrencies" 
                    :selected="selected[1]" 
                    :selectedIndex="selectedCurrencyIndex" 
                    :isOptionsVisible="isOptionsVisible[1]" 
                    :hideIcon="false"
                    :hideBorder="true"
                    @show-options="toggleOptions(1)" 
                    @option-select="resetCurrency"
                />
            </div>
        </div>
        <nav>
            <router-link to="/tutors">Find a tutor</router-link>
            <router-link to="/community">Community</router-link>
            <router-link to="/become-tutor">Become a tutor</router-link>
        </nav>
        <div class="user-nav">
            <div class="login-btn">
                <router-link to="/signin">
                    <div class="login-btn-text">Login</div>
                </router-link>
            </div>
            <div class="register-btn">
                <router-link to="/register">
                    <div class="register-btn-text">Join Us Now</div>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import DropDown from '@/components/drop-down/drop-down.vue';

export default {
    name: 'Header',
    components: { DropDown },
    data() {
        const allCurrencies = [
            {
                display_name: "GBP £",
                value: "£"
            },
            {
                display_name: "NGN ₦",
                value: "₦"
            },
            {
                display_name: "USD $",
                value: "$"
            }
        ], 
        allLanguages = [
            {
                display_name: "English",
                value: "english"
            },
            {
                display_name: "French",
                value: "french"
            },
            {
                display_name: "Yoruba",
                value: "yoruba"
            }
        ];
    
        let isOptionsVisible = [false, false], selected = [true, true];

        let selectedCurrencyIndex = 0, selectedLanguageIndex = 0;

        return { allCurrencies, allLanguages, isOptionsVisible, selectedCurrencyIndex, selectedLanguageIndex, selected }
    },
    methods: {
        hideAllOptions() {
            for(var i=0; i < this.isOptionsVisible.length; i++) {
                this.isOptionsVisible[i] = false;
            };
        },
        toggleOptions(index){
            this.isOptionsVisible[index] = !this.isOptionsVisible[index];
        },
        resetLanguage(index) {
            this.selectedLanguageIndex = index;
            this.selected[0] = true;
            this.toggleOptions(0);
        },
        resetCurrency(index) {
            this.selectedCurrencyIndex = index;
            this.selected[1] = true;
            this.toggleOptions(1);
        },
    }
}
</script>

<style scoped>
    header {
        border-bottom: 1px solid lightgrey;
        display: flex;
        align-items: center;
        height: 70px;
        padding: 0% 5%;
    }
    div.logo {
        font-weight: 900;
        font-size: 160%;
    }
    div.drop-down {
        margin-left: auto;
        display: flex;
        justify-content: space-between;
        width: 10%;
        height: 50%;
    }
    div.drop-down > div {
        width: 48%;
    }
    div.drop-down > div.dot {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: black;
        margin-top: auto;
        margin-right: auto;
        margin-bottom: 9%;
    }
    div.icon > * {
        font-size: 90%;
        color: grey;
    }
    div.drop-down select {
        border: none;
    }
    div.language-drop-down div.display {
        border: none !important;
    }
    div.language-drop-down div.icon > * {
        display: none;
    }
    nav {
        margin: 0% 0% 0% 3%;
        display: flex;
        justify-content: space-between;
    }
    nav > * {
        padding: 0px 30px 0px 0px;
        font-size: 100%;
        font-weight: 400;
    }
    div.user-nav {
        display: flex;
        justify-content: space-between;
    }
    div.user-nav > div {
        border-radius: 5px;
        font-weight: 600;
    }
    div.login-btn {
        font-weight: 700;
    }
    div.login-btn-text {
        padding: 10px 20px;
    }
    div.register-btn {
        background: #AE1919;
        color: white;
        overflow: hidden;
    }
    div.register-btn-text{
        padding: 10px 20px;
    }

</style>