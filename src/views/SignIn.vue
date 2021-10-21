<template>
    <body>
        <Header />
        <section class="body">
            <div class="image-box">

            </div>
            <div class="form-box-frame">
                <div class="form-box">
                    <div class="heading">Log into <br /> your account  </div>
                    <div class="form">

                        <div class="error-msg" v-if="formModel.error != ''">{{ formModel.error }}</div>
                        
                        <form @submit.prevent="signInButtonPressed">

                            <input v-model="emailModel.value" @keyup="validateEmail()" :type="emailModel.type" class="email" placeholder="Email">
                            <div class="error-message" v-if="emailModel.error != ''">{{ emailModel.error }}</div>

                            <input v-model="passwordModel.value" @keyup="validatePassword()" :type="passwordModel.type" placeholder="Password">
                            <div class="error-message" v-if="passwordModel.error != ''">{{ passwordModel.error }}</div>

                            <div class="link">
                                <router-link to="/"> Forgot your password? </router-link>
                            </div>
                            
                            <plain-text-button buttonText='SIGN IN' @button-action="signUserIn" />

                        </form>
                        <div class="orsignup">
                            Don't have an account? 
                            <router-link to="/register"> Create an account </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </body>
</template>

<script>
    import Header from '@/components/Header.vue';
    import PlainTextButton from '@/components/buttons/plain-text-button.vue';
    import net from '@/services/http.js';
    
    export default {
        components: { Header, PlainTextButton },
        data() {
            var emailModel = {
                    type: 'email',
                    value: '',
                    error: ''
                },
                passwordModel = {
                    type: 'password',
                    value: '',
                    error: ''
                },
                formModel = {
                    error: ''
                },
                isDisabled = true;

            return { 
                emailModel,
                passwordModel, 
                formModel, 
                isDisabled 
            }
        },
        methods: {
            async signUserIn() {
                if (this.validateInput()) {

                    var body = {
                        email: this.emailModel.value,
                        password: this.passwordModel.value
                    };

                    try {

                        const response = await net.http.post('/user/auth', body);
                        
                        localStorage.setItem("access-token", response.data.token);p
                        if(response.status == 200) {
                            window.location.pathname = '/dashboard';
                        }

                    } catch (error) { 
                        if(error.response.status == 404) {
                            this.formModel.error = "Invalid Login Credentials";
                        }
                    }
                }
            },
            validateInput() {
                if(this.validateEmail() && this.validatePassword()) return true;
                else false;
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

                this.emailModel.error = '';
                return true;
            },
            validatePassword() {
                if(this.passwordModel.value == '') {
                    this.passwordModel.error = "Password field cannot be empty";
                    return false;
                }

                this.passwordModel.error = '';
                return true;
            },
            emailValidation(email) {
                const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
                if(emailRegExp.test(email)) return true;
                else false;
            }
        },
        async created(){
            let response = await net.http.get(`${url}/product`);
            console.log(response);
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

    div.error-message, div.error-msg {
        text-align: start;
        padding: 0% 5%;
        color: red;
        font-size: 90%;
    }
    div.error-msg {
        font-size: 100%;
    }

    div.form-box {
        width: 40%;
        text-align: center;
    }
    div.heading {
        padding: 0% 5%;
        font-weight: 700;
        color: rgb(20, 20, 20);
        font-size: 180%;
        margin-bottom: 5%;
        text-align: start;
    }
    div.form-box input {
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
    div.form-box input::placeholder {
        color: rgb(146, 146, 146);
    }
    div.form-box input.error {
        border: 1px solid red;
    }
    div.form-box input.error ~ div.error-message {
        display: block;
    }
    div.link{
        text-align: right;
        width: 95%;
        padding: 0% 0% 0%;
        margin: 2% 0%;
        color: grey;
        font-size: 90%;
        font-weight: 500; 
    }
    div.orsignup {
        width: 90%;
        margin: 10% auto 0;
        display: flex;
        justify-content: space-between;
        color: grey;
    }
    div.orsignup a{
        font-weight: 700;
        font-size: 100%;
        color: #bd1d1d;
    }
</style>