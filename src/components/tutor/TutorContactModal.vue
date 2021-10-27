<template>
    <div class="tutor_contact_model">
        <div id="contactModalFrame">
            <div class="contactModal">
                <div class="contactHead">
                    <div class="name">Contact Priscilia Jose</div>
                    <div class="cancelcontact" @click="$emit('button-action')"><font-awesome-icon :icon="['fas', 'times']" /></div>
                </div>
                <div class="questions">
                    <div class="field">
                        <div class="question">What is the main reason you're taking lessons?</div>
                        <select>
                            <option selected disabled hidden>Please select an option</option>
                            <option>School</option>
                            <option>Test</option>
                            <option>Work</option>
                            <option>Travel</option>
                            <option>Personal Interest</option>
                            <option>Lessons are for my child</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="field">
                        <div class="question">Is there a specific area that you would like to focus on during your lessons?</div>
                        <select>
                            <option selected disabled hidden>Please select an option</option>
                            <option>School</option>
                            <option>Test</option>
                            <option>Work</option>
                            <option>Travel</option>
                            <option>Personal Interest</option>
                            <option>Lessons are for my child</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="field">
                        <div class="question">What language proficiency level are you aiming for?</div>
                        <select>
                            <option selected disabled hidden>Please select an option</option>
                            <option>School</option>
                            <option>Test</option>
                            <option>Work</option>
                            <option>Travel</option>
                            <option>Personal Interest</option>
                            <option>Lessons are for my child</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div class="field">
                        <div class="question">What language proficiency level are you aiming for?</div>
                        <textarea></textarea>
                    </div>
                    <div class="field">
                        <div class="question">What language proficiency level are you aiming for?</div>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="send">
                    <button class="cancel" @click="hideContactModal">CANCEL</button>
                    <button class="send-message" @click="hideContactModal">SEND</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name:"tutor-contact-model",
    components: { },
    data() {
        return { hide: true }
    },
    methods: {
        closeModal() {
            this.hide = false;
        }
    }
});
</script>

<style scoped>
    div.tutor_contact_model {
        display: flex;
    }
    div#contactModalFrame {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        top: 0px;
        left: 35%;
        height: 100vh;
        position: absolute;
        z-index: 1000;
        padding: 5% 0%;
    }
    div.contactModal {
        width: 100%;
        background: white;
        border-radius: 5px;
    }
    div.contactHead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2% 4%;
        border-bottom: 1px solid lightgrey;
        font-weight: 400;
    }
    div.cancelcontact {
        font-size: 140%;
        cursor: pointer;
    }
    div.field {
        width: 90%;
        margin: 0% auto;
        padding: 2% 0%;
    }
    div.question {
        margin: 0% auto;
        padding: 2% 1%;
        font-weight: 300;
        color: rgb(119, 119, 119);
    }
    select {
        width: 100%;
        font-size: 100%;
        border: 1px solid lightgrey;
        padding: 3% 0%;
        font-weight: 300;
        color: grey;
        outline: none;
    }
    option {
        margin: 2% 0%;
    }
    textarea {
        width: 90%;
        height: 100px;
        display: block;
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 5%;
        outline: none;
        color: #333;
        font-size: 14px;
        resize: none;   
    }
    div.send {
        padding: 4% 5%;
        border-top: 1px solid lightgrey;
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid #ccc;

    }
    div.send > button {
        padding: 3% 5%;
        border: 1px solid #ccc;
        background: none;
        color: rgb(97, 97, 97);
        font-weight: 700;
        cursor: pointer;
    }
    div.send > button:hover{
        background: rgb(224, 224, 224);
    }
    div.send button.cancel {
        margin-right: 2%;
    }
</style>