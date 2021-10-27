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
            <router-link to="/tutors/explore">Find a tutor</router-link>
            <router-link to="/community">Community</router-link>
            <router-link to="/become-tutor">Become a tutor</router-link>
        </nav>
        <div class="user-nav" v-show="isLoggedIn" @click="toggleProfileMenu">
            <div class="user-image">
                <img src="../assets/userimage.png">
            </div>
            <UserProfileMenu v-if="showUserMenu" />
        </div>
        <div class="no-user-nav" v-show="!isLoggedIn">
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
import UserProfileMenu from '@/components/userprofile/UserProfileMenu.vue';

export default {
    name: 'Header',
    components: { DropDown, UserProfileMenu },
    data() {

        var isLoggedIn, showUserMenu = false;

        if(localStorage.getItem("access-token")) isLoggedIn = true;
        else isLoggedIn = false;

        const allCurrencies = [
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
        ], 

        allLanguages = [
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
        ];
    
        let isOptionsVisible = [false, false], selected = [true, true];

        let selectedCurrencyIndex = 0, selectedLanguageIndex = 0;

        return { allCurrencies, allLanguages, isOptionsVisible, selectedCurrencyIndex, selectedLanguageIndex, selected, showUserMenu, isLoggedIn }
    },
    methods: { 
        getSelectedIndex() { 
            for (let index = 0; index < this.allCurrencies.length; index++) { 
                const element = this.allCurrencies[index]; 

                if (element.value == this.$store.state.prefCurrency.symbol) 
                    this.selectedCurrencyIndex = index;
            }

            for (let index = 0; index < this.allLanguages.length; index++) { 
                const element = this.allLanguages[index]; 
                
                if (element.value == this.$store.state.prefLanguage)
                    this.selectedLanguageIndex = index;
            }
        },
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
            this.$store.commit('changePrefLanguage', this.allLanguages[this.selectedLanguageIndex]);
        },
        resetCurrency(index) {
            this.selectedCurrencyIndex = index;
            this.selected[1] = true;
            this.toggleOptions(1);
            this.$store.commit('changePrefCurrency', this.allCurrencies[this.selectedCurrencyIndex]);
        },
        toggleProfileMenu() {
            this.showUserMenu = !this.showUserMenu;
        }
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
        /* color: var(--burgundy-100); */
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
    div.drop-down .dot {
        width: 3px;
        height: 3px;
        border-radius: 50%;
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
        align-items: center;
        justify-content: center;
        width: 45px;
        position: relative;
        cursor: pointer;
    }
    div.user-image {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        overflow: hidden;
        background: rgb(238, 238, 238);
    }
    div.no-user-nav {
        display: flex;
        justify-content: space-between;
    }
    div.no-user-nav > div {
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
        background: var(--burgundy-100);
        color: white;
        overflow: hidden;
    }
    div.register-btn-text{
        padding: 10px 20px;
    }

</style>

