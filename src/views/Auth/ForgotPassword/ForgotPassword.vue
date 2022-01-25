<template>
    <section class="forgot_password">
        <div class="code_is_invalid" v-if="isPasswordRequestSent">
            <font-awesome-icon :icon="['fas', 'check']" class="icon success" />
            <div class="text_success text"> 
                Your password reset link has been sent to your email successfully.
            </div>
        </div>

        <div class="form_box" v-else>
            <div class="heading">
                <div class="title">Reset Password </div>
                <div class="sub">Provide email for your already existing <br/> account. </div>
            </div>
            <div class="form">

                <div class="error-msg" v-if="formModel.error != ''">{{ formModel.error }}</div>
                
                <form @submit.prevent="signInButtonPressed">
                    <div :class="{
                            input_field: true,
                            error_border: (emailModel.error != '') ?true :false
                        }"
                    >
                        <input
                            v-model="emailModel.value" 
                            @keyup="validateEmail()"
                            :type="emailModel.type" 
                            placeholder="Email" 
                            autocomplete="off"
                        />
                        <div class="email_verification_status" v-if="validitidyChecked">
                            <font-awesome-icon :icon="['fas', 'times']" class="error" v-if="isValid == false" />
                            <font-awesome-icon :icon="['fas', 'check']"  class="success" v-else-if="isValid == true"/>

                            <div class="circle_loader" v-else>
                                <div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                    </div>
                    <div class="error_text" v-if="emailModel.error != ''">
                        {{ emailModel.error }}
                    </div>

                    <div class="signin_btn_wrapper">
                        <ButtonPlainText
                            :disabled="(isValid) ?false :true"
                            buttonText='RESET PASSWORD' 
                            :isLoading="isLoading" 
                            @button-action="resetPassword" 
                        />
                    </div>
                </form>

            </div>
        </div>
    </section>
</template>

<script>
import ButtonPlainText from "@/components/buttons/ButtonPlainText";
import axios from "axios";
export default {
    components: { ButtonPlainText },
    data() {
        return {
            formModel: {
                value: '',
                error: ''
            },
            emailModel: {
                type: 'email',
                value: '',
                error: ''
            },
            isValid: null,
            validitidyChecked: false,
            baseURL: process.env.VUE_APP_API_BASE_URL,
            isLoading: false
        }   
    },
    methods: {
        async validateEmail() { 
            this.validitidyChecked = true;

            if(this.emailModel.value == '') {
                this.emailModel.error = "Email field cannot be empty";
                this.isValid = false;
                return false;
            }
            if(!this.emailValidation(this.emailModel.value)) { 
                this.emailModel.error = "Email isn't valid";
                this.isValid = false;
                return false;
            }

            this.isValid = null;
            try {
                const res = await axios.get(`${this.baseURL}/user/checkemail/${this.emailModel.value}`);    
                if(res.status != 409) {
                    console.log(res);
                    console.log('HERE 1');
                    this.isValid = false;
                    this.emailModel.error = "Account with email doesn't exist."

                    return false;
                }
            } catch(error) {
                if(error.response.status != 409) {
                    console.log('HERE 2');
                    this.isValid = false;
                    this.emailModel.error = "Account with email doesn't exist."

                    return false;
                }
            }

            this.isValid = true;
            this.emailModel.error = '';

            return true;
        },
        emailValidation(email) {
            const emailRegExp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            
            if(emailRegExp.test(email)) return true;
            else return false;
        },
        resetPassword() {
            this.isLoading = true;
            this.$store.dispatch('resetpassword', {email: this.emailModel.value})
            .then(()=> {
                this.isLoading = false;
                this.isPasswordRequestSent = true;
            })
            .catch((error)=> {
                
            });
        }
    }
    
}
</script>

<style scoped>
.code_is_invalid {
    width: 40%;
    height: 50%;
    margin: auto;
    margin-top: 10%;
}
.code_is_invalid .icon {
    border: 1px solid black;
    margin: auto 0;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
} 
.code_is_invalid .error {
    background: rgba(245, 135, 135, 0.295);
    border: 1px solid red;
    color: red;
}
.code_is_invalid .success {
    background: rgba(165, 243, 165, 0.493);
    border: 1px solid rgb(15, 179, 15);
    color: rgb(15, 179, 15);
} 
.code_is_invalid .text {
    font-size: 200%;
    font-weight: 500;
    color: var(--paper-grey-500);
    margin-top: 5%;
}
.text_success {
    color: var(--paper-grey-800)!important;
}
.forgot_password {
    width: 90%;
    min-height: 70vh;
    margin: 0 auto;
}
.form_box {
    margin: 0 auto;
    margin-top: 5%;
    width: 40%;
}
.heading {
    
}
.title {
    font-size: 240%;
    font-weight: 600;
}
.sub {
    font-size: 140%;
    font-weight: 400;
    color: var(--paper-grey-600);
}
.input_field {
    margin-top: 10%;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid var(--paper-grey-400);
    display: flex;
}
.email_verification_status {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
}
.email_verification_status > * {
    border: 1px solid black;
    margin: auto 0;
    width: 15px;
    height: 15px;
    padding: 5px;
    border-radius: 50%;
}
.email_verification_status .success {
    background: rgba(165, 243, 165, 0.493);
    border: 1px solid rgb(15, 179, 15);
    color: rgb(15, 179, 15);
}
.email_verification_status .error {
    background: rgba(245, 135, 135, 0.295);
    border: 1px solid red;
    color: red;
}
.circle_loader {
    border: none;
}
.error_text {
    color: red;
}
.error_border {
    border: 1px solid red;
}
input {
    border: none;
    width: 80%;
    padding: 0% 5%;
    height: 50px;
    font-size: 130%;
    outline: none;
}

.signin_btn_wrapper {
    margin-top: 2%;
    height: 50px;
}
.signin_btn_wrapper button {
    border: 1px solid var(--burgundy-100);
    background: var(--burgundy-100);
    color: white;
    border: none;
    border-radius: 5px;
} 

</style>