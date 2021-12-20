import { createStore } from 'vuex';
import net from "../services/http";

export default createStore({
    state: {
        isSignedIn: false,
        token: localStorage.getItem('access-token') || '',
        user: '',
        tutor: '',
        tutors: [],
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
        store_tutor(state, payload) {
            state.tutor = payload;
        },
        store_tutors(state, payload) {
            state.tutors = payload;
        },
        store_token(state, payload) {
            localStorage.setItem('access-token', payload);
            state.token = payload;
        },
        clear_user(state) {
            state.user = {};
            state.token = '';
            localStorage.removeItem('access-token');
            this.commit('update_auth_status', true);
        },
        update_auth_status(state, payload) {
            state.isSignedIn = payload;
        },
        auth_success(state, payload) {
            this.commit('store_token', payload.token);
            this.commit('store_user', payload.user);
            this.commit('update_auth_status', true);
        }
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
        updatesigninstatus({commit}, payload){
            return new Promise(async (resolve, reject)=> {
                commit('update_auth_status', payload);
                resolve();
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
        fetchuserdata({commit}) {
            return new Promise(async (resolve, reject)=> {
                net.httpSec.get('/user/profile/me')
                .then((response)=> {
                    const user = response.data.user;
                    commit('store_user', user);
                    
                    resolve(user);
                })
                .catch((error)=> {
                    reject(error);
                });
            });
        },
        fetchtutordata({commit}) {
            return new Promise(async (resolve, reject)=> {
                await net.httpSec.get(`/tutors/me/${this.state.user.email}`)
                .then((response)=> {
                    const tutor = response.data.data;
                    commit('store_tutor', tutor);
                    
                    resolve();
                })
                .catch((error)=> {
                    console.log(error.response);
                    reject(error);
                });
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
        submittutorapplication({commit}, payload) {
            return new Promise((resolve, reject)=> {
                net.httpSec.post('/tutors/becometutor', payload)
                .then((response)=> {
                    console.log(response.data);
                })
                .catch((error)=> {
                    console.log(error.response);
                });
            });
        },
        createlesson({commit}, payload) {
            return new Promise(async (resolve, reject)=> {
                await net.httpSec.post('/tutors/createlesson', payload)
                .then((response)=> {
                    const tutor = response.data.tutor;
                    commit('store_tutor', tutor);

                    resolve();
                })
                .catch((error)=> reject(error));
            });
        },
        fetchtutors({commit}) {
            return new Promise((resolve, reject)=> {
                net.http.get("/tutors/explore")
                .then((response)=> {
                    
                    const tutors = response.data.data;
                    commit('store_tutors', tutors);

                    resolve(tutors);
                })
                .catch((error)=> {
                    console.log(error);
                    reject(error);
                });
            });
        },
        fetchtutor({commit}, payload) {
            return new Promise((resolve, reject)=> {
                net.http.get(`/tutors/explore/${payload}`)
                .then((response)=> {
                    const tutor = response.data.data;
                    resolve(tutor);
                })
                .catch((error)=> {
                    console.log(error);
                    reject(error);
                });
            });
        }
    },
    getters: { 
        isSignedIn: state => state.isSignedIn,
        userData: state => state.user,
        tutorData: state => state.tutor,
        tutors: state => state.tutors,
        token: state => state.token
    }

});