import { createStore } from 'vuex';

export default createStore({
    state: {
        counter: 0,
        prefCurrency: JSON.parse(localStorage.getItem("currency")),
        prefLanguage: localStorage.getItem("language")
    },
    mutations: {
        changePrefCurrency(state, payload){
            var selectedCurrency = {
                currencyName: payload.currency_name,
                abbr: payload.display_name,
                rateFromDollar: payload.rateFromDollar,
                symbol: payload.value
            };
            
            localStorage.setItem(
                "currency", 
                JSON.stringify(selectedCurrency)
            );
            
            state.prefCurrency = selectedCurrency;
        },

        changePrefLanguage(state, payload){
            var selectedlang = payload.value;
            
            localStorage.setItem("language", selectedlang);
            state.prefLanguage = selectedlang;
        }
    },
    actions: { },
    getters: { }

});