<template>
    <body>
        <Header />
        <section class="body">
            <div class="image-box">

            </div>
            <div class="form-box-frame">
                <div class="form-box">
                    <div class="heading">Create A New Account To Get Started Connecting With The Best Tutors</div>
                    <div class="form">
                    
                    <div class="error-msg" v-if="formModel.error != ''">{{ formModel.error }}</div>

                    <form @submit.prevent="signInButtonPressed">
                        <input v-model="fullnameModel.value" @keyup="validateFullname()" :type="fullnameModel.type" class="fullname" placeholder="Fullname" autocomplete="off">
                        <div class="error-message" v-if="fullnameModel.error != ''">{{ fullnameModel.error }}</div>

                        <input v-model="emailModel.value" @keyup="validateEmail()" :type="emailModel.type" class="email" placeholder="Email" autocomplete="off">
                        <div class="error-message" v-if="emailModel.error != ''">{{ emailModel.error }}</div>

                        <input v-model="passwordModel.value" @keyup="validatePassword()" :type="passwordModel.type" placeholder="Password" autocomplete="off">
                        <div class="error-message" v-if="passwordModel.error != ''">{{ passwordModel.error }}</div>

                        <div class="register_btn_wrapper">
                            <ButtonPlainText buttonText="CREATE NEW ACCOUNT" :isLoading="isLoading" @button-action="registerUser" /> 
                        </div>

                        <div class="legal">
                            By signing up, you agree to our Terms, Data Policy and Cookie Policy.
                        </div>

                        <div class="orsignin">
                            Already have an account? <a href='/signin'>Sign In</a>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    </body>
</template>

<script>
    
import Header from '@/components/Header.vue';
import AccountTypes from '@/components/account-types.vue';
import ButtonPlainText from '@/components/buttons/ButtonPlainText.vue';
import net from '@/services/http';

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
  section.body {
        display: flex;
        padding: 0% 5%;
        height: calc(100vh - 71px);
    }
    div.image-box {
        width: 45%;
        height: 80vh;
        margin: auto 0;
    }
    div.form-box-frame {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.error-message{
        text-align: start;
        padding: 0% 5%;
        color: red;
        font-size: 90%;
    }
    div.form-box {
        width: 40%;
        text-align: center;
    }
    div.heading {
        margin: 0 auto;
        width: 80%;
        font-weight: 500;
        color: grey;
        font-size: 110%;
        margin-bottom: 5%;
    }
    div.form-box input, div.form-box select {
        width: 80%;
        height: 40px;
        font-weight: 500;
        padding: 1% 5%;
        font-size: 110%;
        border: 1px solid lightgrey;
        color: rgb(83, 83, 83);
        outline: none;
        margin-top: 10px;
        border-radius: 5px;
    }
    div.form-box select {
        width: 91%;
        height: 50px;
        color: rgb(146, 146, 146);
    }
    div.form-box input::placeholder {
        color: rgb(146, 146, 146);
    }
    div.form-box input.error {
        border: 1px solid red;
    }
    div.form-box input.error ~ div.error-message{
        display: block;
    }
    .register_btn_wrapper {
        height: 50px;
        width: 90%;
        margin: 0 auto;
        margin-top: 5%;
    }
    .register_btn_wrapper button {
        border: none;
        background: var(--paper-grey-900);
        color: white;
    }
    div.legal{
        text-align: center;
        padding: 8% 0%;
        color: grey;
        width: 90%;
        margin: 0 auto;
    }
    div.orsignin {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        color: grey;
    }
    div.orsignin a{
        font-weight: 700;
        font-size: 110%;
        color: #AE1919;
    }
    .hidden {
        display: none;
    }
</style>