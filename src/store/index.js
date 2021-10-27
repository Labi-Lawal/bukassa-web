import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { createStore } from 'vuex';
import net from "../services/http";

export default createStore({
    state: {
        isSignedIn: false,
        token: localStorage.getItem('access-token') || '',
        user: '',
        prefCurrency: JSON.parse(localStorage.getItem('currency')),
        prefLanguage: localStorage.getItem('language'),
        bookingInfo: '',
        counter: 0,
        tempRoute: ''
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
            
            localStorage.setItem('language', selectedlang);
            state.prefLanguage = selectedlang;
        },
        setNewEvent(state, payload) {
            state.bookingInfo = payload;
        },
        saveUser(state, payload) {
            localStorage.setItem('user', JSON.stringify(payload));
            state.user = payload;
        },
        store_user(state, payload) {
            state.user = payload;
        },
        store_token(state, payload) {
            localStorage.setItem('access-token', payload);
            state.token = payload;
        },
        clear_user(state) {
            state.user = {};
            state.token = '';
            localStorage.removeItem('access-token');
        },
        auth_success(state, payload) {
            this.commit('store_token', payload.token);
            this.commit('store_user', payload.user);
        },
    },
    actions: { 
        signin({commit}, payload) {    
            return new Promise( async (resolve, reject)=>{
                try {
                    const response = await net.http.post('/user/auth', payload),
                    token = response.data.token,
                    user = response.data.user;

                    commit('auth_success', { token, user });

                    resolve();

                } catch (error) { 
                    commit('clear_user');
                    reject(error);
                }
            });
        },
        register({commit}, payload) {    
            return new Promise( async (resolve, reject)=>{
                try {
                    const response = await net.http.post('/user/register', payload),
                    token = response.data.token,
                    user = response.data.user;

                    commit('auth_success', { token, user });

                    resolve();
    
                } catch (error) { 
                    commit('clear_user');
                    reject(error);
                }
            });
        },
        signout({commit}) {
            return new Promise((resolve, reject)=>{
                commit('clear_user');
                resolve();
            });
        },
        fetchuserinfo({commit}) {
            return new Promise(async (resolve, reject)=> {
                try {
                    const response = await net.httpSec.get('/user/profile/me'),
                    user = response.data.user;

                    commit('store_user', user);
                    resolve(user);

                } catch (error) {
                    reject(error);
                }
            });
        },
        submitEvent(commit) {
            return new Promise(async (resolve, reject)=> {
                const eventInfo = commit.state.bookingInfo;

                try {
                    const response = await net.httpSec.post(
                        `/tutors/${eventInfo.tutorname}/newevent`, {newevent: eventInfo}
                    );

                    console.log(response.data);

                } catch(error) {
                    console.log(error.response);
                }
            });
        },
    },
    getters: { 
    }

});