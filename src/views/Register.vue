<template>
    <div class="header_wrapper">
        <Header />
    </div>
    <section class="body">
        <div class="image_wrapper">
            <img src="@/assets/class1.jpg" />
            <div class="overlay"></div>
        </div>
        <div class="form-box-frame">
            <div class="form-box">
                <div class="heading">Create A New Account To Get Started Connecting With The Best Tutors</div>
                <div class="form">
                
                <div class="error-msg" v-if="formModel.error != ''">{{ formModel.error }}</div>

                <form @submit.prevent="signInButtonPressed">
                    <input 
                        v-model="fullnameModel.value" 
                        @keyup="validateFullname()" 
                        :type="fullnameModel.type" 
                        class="fullname" 
                        placeholder="Fullname" 
                        autocomplete="off"
                        :class="{
                            error: (fullnameModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="fullnameModel.error != ''">{{ fullnameModel.error }}</div>

                    <input 
                        v-model="emailModel.value" 
                        @keyup="validateEmail()" 
                        :type="emailModel.type" 
                        class="email" 
                        placeholder="Email" 
                        autocomplete="off"
                        :class="{
                            error: (emailModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="emailModel.error != ''">{{ emailModel.error }}</div>

                    <input 
                        v-model="passwordModel.value" 
                        @keyup="validatePassword()" 
                        :type="passwordModel.type" 
                        placeholder="Password" 
                        autocomplete="off"
                        :class="{
                            error: (emailModel.error != '') ?true :false
                        }"
                    >
                    <div class="error-message" v-if="passwordModel.error != ''">{{ passwordModel.error }}</div>

                    <div class="register_btn_wrapper">
                        <ButtonPlainText buttonText="CREATE NEW ACCOUNT" :isLoading="isLoading" @button-action="registerUser" /> 
                    </div>

                    <div class="legal">
                        By signing up, you agree to our Terms, Data Policy and Cookie Policy.
                    </div>

                    <div class="orsignin">
                        Already have an account? <a href='/login'>Sign In</a>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    
import Header from '@/components/Header.vue';
import AccountTypes from '@/components/account-types.vue';
import ButtonPlainText from '@/components/buttons/ButtonPlainText.vue';

export default {
    components: { Header, AccountTypes, ButtonPlainText },
    data() {
        var emailModel = { type: 'email', value: '', error: '' },
        passwordModel = { type: 'password', value: '', error: '' },
        fullnameModel = { type: 'text', value: '', error: '' },
        formModel = { error: '' },

        typeSelected = false;

        return { 
            emailModel,
            passwordModel,
            fullnameModel,
            formModel,
            typeSelected,
            isLoading: false
        }
    },
    methods: {
        async registerUser() {
            if(this.validateInput()) {
                var body = {
                    fullname: this.fullnameModel.value,
                    email: this.emailModel.value,
                    password: this.passwordModel.value
                };

                this.isLoading = true;
            
                this.$store.dispatch('register', body)
                .then(()=> {
                    if(this.$store.state.tempRoute != '') 
                        this.$router.push({ path: `/${this.$store.state.tempRoute}`})
                    else 
                        this.$router.push({ path: '/profile' })
                })
                .catch((error)=> {
                    this.isLoading = false;

                    if( error.response.status == 409 )
                        this.emailModel.error = error.response.data.message
                    if (error.response.status == 422 )
                        this.formModel.error = error.response.data.message;
                });
            }
        },
        validateInput() {
            if(this.validateFullname() && this.validateEmail() && this.validatePassword()) return true;
            else return false;
        },
        validateFullname() { 
            if(this.fullnameModel.value.trim() == '') {
                this.fullnameModel.error = 'Fullname field cannot be empty';
                return false;
            }
            if(this.fullnameModel.value.trim().split(' ').length != 2) {
                this.fullnameModel.error = 'Please seperate your first and last name with a space';
                return false;
            }

            this.fullnameModel.error = '';
            return true;
        },
        validateEmail() { 
            if(this.emailModel.value == '') {
                this.emailModel.error = "Email field cannot be empty";
                return false;
            }
            if(!this.emailValidation(this.emailModel.value)) { 
                this.emailModel.error = "Email isn't valid";
                return false;
            }
            if(!this.checkEmail(this.emailModel.value)) {
                this.emailModel.error = "Email already exist";
                return false;
            }

            this.emailModel.error = '';
            return true;
        },
        validatePassword() {
            if(this.passwordModel.value == '') {
                this.passwordModel.error = "Password field cannot be empty";
                return false;
            }
            if(this.passwordModel.value.length < 8) {
                this.passwordModel.error = "Password cannot be less than 8 characters";
                return false;
            }

            this.passwordModel.error = '';
            return true;
        },
        async checkEmail(email) {
            try {
                await net.httpSec.get(`/user/checkemail/${email}`); 
                return true;

            } catch (error) {
                return false;
            }
        },
        emailValidation(email) {
            const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            
            if(emailRegExp.test(email)) return true;
            else false;
        }
    }
}
</script>

<style scoped>
    .header_wrapper {
        position: absolute;
        width: 100%;
        z-index: 10000;
    }
    .header_wrapper header {
        box-shadow: none;
    }
    .header_wrapper header:deep > * {
        color: white !important;
    }
    .header_wrapper header:deep nav > * {
        color: white !important;
    }

    section.body {
        display: flex;
        padding: 0;
        height: 100vh;
    }

    div.image_wrapper {
        width: 100%;
        height: 100%;
        position: relative;
    }
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .overlay {
        background: linear-gradient(to right, rgba(18, 18, 18, 0.432),  rgba(18, 18, 18, 0.808));
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    div.image-box {
        width: 45%;
        height: 80vh;
        margin: auto 0;
    }
    div.form-box-frame {
        width: 40%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10%;
        bottom: 5%;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 10px;
    }

    div.error-message{
        text-align: start;
        padding: 0% 5%;
        color: red;
        font-size: 90%;
    }
    div.form-box {
        width: 70%;
        text-align: center;
    }
    div.heading {
        padding: 0% 5%;
        font-weight: 700;
        color: var(--paper-grey-100);
        font-size: 160%;
        margin-bottom: 5%;
        /* width: 75%; */
        text-align: center;
    }
    div.form-box input {
        width: 80%;
        height: 40px;
        font-weight: 500;
        padding: 1% 5%;
        font-size: 110%;
        border: 1px solid var(--paper-grey-100);
        background: none;
        color: white;
        outline: none;
        margin-top: 10px;
        border-radius: 5px;
    }
    
    div.form-box input::placeholder {
        color: var(--paper-grey-400);
    }
    div.form-box input.error {
        border: 1px solid rgb(255, 86, 86);
    }
    div.form-box input.error ~ div.error-message {
        display: block;
    }
    .register_btn_wrapper {
        height: 50px;
        width: 90%;
        margin: 0 auto;
        margin-top: 5%;
    }
    .register_btn_wrapper button {
        border-radius: 5px;
        border: none;
        background: var(--paper-grey-900);
        color: white;
    }
    div.legal{
        text-align: center;
        padding: 8% 0%;
        color: var(--paper-grey-400);
        width: 90%;
        margin: 0 auto;
    }
    div.orsignin {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        color: var(--paper-grey-300);
    }
    div.orsignin a{
        font-weight: 700;
        font-size: 110%;
        color: var(--paper-grey-200);
    }
    .hidden {
        display: none;
    }

    @media screen and (max-width: 1200px) {
        div.form-box-frame {
            width: 80%;
            right: 10%;
        }
    }

    @media screen and (max-width: 630px) {
        div.form-box {
            width: 90%;
        }
    }

    @media screen and (max-width: 500px) {
        div.form-box-frame {
            width: 90%;
            right: 5%;
        }
        div.form-box {
            width: 100%;
        }
    }
</style>