<template>
    <section class="forgot_password">
 
        <div class="code_is_invalid" v-if="codeInvalid">
            <font-awesome-icon :icon="['fas', 'times']" class="icon error" />
            <div class="text"> 
                Reset password link is expired or invalid.
            </div>
        </div>

        <div v-else>
            <div class="code_is_invalid" v-if="passwordResetSuccess">
                <font-awesome-icon :icon="['fas', 'check']" class="icon success" />
                <div class="text_success text"> 
                    Your password has been reset successfully.
                </div>
                <div class="goto_btn_wrapper">
                    <ButtonPlainText 
                        buttonText="LOGIN"
                        @buttonAction="gotologin()"
                    />
                </div>
            </div>

            <div class="form_box" v-else>
                <div class="heading">
                    <div class="title">Choose New Password </div>
                    <div class="sub">Choose new password for your <br/> account with email {{ email }}. </div>
                </div>
                <div class="form">
                    <form @submit.prevent="signInButtonPressed">
                        <input
                            v-model="passwordModel.value"
                            :type="passwordModel.type" 
                            @keyup="validatePassword()"
                            placeholder="New Password" 
                            autocomplete="off"
                        />
                        <div class="error_text" v-if="passwordModel.error != ''">
                            {{ passwordModel.error }}
                        </div>

                        <input
                            v-model="confirmPasswordModel.value"
                            :type="confirmPasswordModel.type" 
                            @keyup="validateConfirmPassword()"
                            placeholder="Comfirm New Password" 
                            autocomplete="off"
                        />
                        <div class="error_text" v-if="confirmPasswordModel.error != ''">
                            {{ confirmPasswordModel.error }}
                        </div>


                        <div class="signin_btn_wrapper">
                            <ButtonPlainText
                                buttonText='SET NEW PASSWORD' 
                                :isLoading="isLoading"
                                @button-action="setNewPassword" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import ButtonPlainText from "@/components/buttons/ButtonPlainText";

export default {
    components: { ButtonPlainText },
    data() {
        return {
            email: this.$route.params.email,
            code: this.$route.params.code,
            codeInvalid: false,
            passwordModel: {
                type: 'password',
                value: '',
                error: ''
            },
            confirmPasswordModel: {
                type: 'password',
                value: '',
                error: ''
            },
            isLoading: false,
            passwordResetSuccess: false
        }   
    },
    methods: {
        validatePassword() {
            if(this.passwordModel.value == '') {
                this.passwordModel.error = "Password cannot be empty";
                return false;
            }
            this.passwordModel.error = "";
            if(this.passwordModel.value !== this.confirmPasswordModel.value) {
                this.confirmPasswordModel.error = "Password doesn't match";
                return false;
            }
            
            this.confirmPasswordModel.error = "";
            return true;
        },
        validateConfirmPassword() {
            if(this.confirmPasswordModel.value == '') {
                this.confirmPasswordModel.error = "Password cannot be empty";
                return false;
            }
            if(this.passwordModel.value !== this.confirmPasswordModel.value) {
                this.confirmPasswordModel.error = "Password doesn't match";
                return false;
            }

            this.passwordModel.error = "";
            this.confirmPasswordModel.error = "";
            return true;
        },
        setNewPassword() {
            if(this.validatePassword() && this.validateConfirmPassword()) {
                this.isLoading = true;
                this.$store.dispatch('setnewpassword', {
                    newPassword: this.confirmPasswordModel.value,
                    email: this.email, 
                    code: this.code
                })
                .then(()=> {
                    this.passwordResetSuccess = true;
                    this.isLoading = false;
                })
                .catch(()=> {
                    this.isLoading = false;
                    this.codeInvalid = true;
                });
            }
        },
    },
    beforeMount() {
        this.$store.dispatch('checkresetcode', {
            email: this.email, 
            code: this.code
        })
        .then(()=> this.codeInvalid = false)
        .catch(()=> this.codeInvalid = true)
    }
}
</script>

<style scoped>
.code_is_invalid {
    width: 30%;
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
    margin-bottom: 5%;
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
    border: 1px solid var(--paper-grey-400);
    width: 90%;
    margin-top: 2%;
    border-radius: 5px;
    padding: 0% 5%;
    height: 50px;
    font-size: 110%;
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
.goto_btn_wrapper {
    margin-top: 5%;
    height: 50px;
}
.goto_btn_wrapper button {
    border: 1px solid var(--burgundy-200);
    color: var(--burgundy-200);
    background: none;
    font-weight: 600;
    border-radius: 5px;
}

</style>