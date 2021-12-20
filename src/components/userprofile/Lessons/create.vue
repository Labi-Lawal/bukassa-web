<template>
    <section class="lessons_frame">
        <div class="head">
            <div class="section_title"> Create New Lesson </div>
            <div class="cancel_btn_wrapper">
                <ButtonIcon
                    iconName="times"
                    @buttonAction="closeCreate"
                />
            </div>
        </div>
       <div class="create_form">
           <form @submit.prevent="signInButtonPressed">
                
                <div class="field_wrapper double">
                    <div class="field three_third title">
                        <div class="label">Lesson Title</div>
                        <textarea
                            placeholder="Enter lesson title..."
                            v-model="titleModel.value"
                        /> 
                    </div>
                </div>
                <div class="field_wrapper">
                    <div class="field one_third">
                        <InputField 
                            label="Lesson Language"
                            :model="languageModel"
                        />
                    </div>
                    <div class="field one_fifth">
                        <div class="label">Duration</div>
                        <div class="input_field duration">
                            <input
                                :type="durationModel.type"
                                v-model="durationModel.value"
                                @keyup="convertToMilliSecs()"
                            />
                            <drop-down 
                                :dropdownIndex=0
                                :options="durationModel.options"
                                :selected="durationModel.selected"
                                :selectedIndex="durationModel.selectedIndex"
                                :isOptionsVisible="showOptions[0]"
                                :hideBorder=true
                                @showOptions="toggleDropdownOptions"
                                @optionSelect="selectDropDownOption"
                            />
                        </div>
                    </div>
                    <div class="field one_third">
                        <InputField 
                            label="Price ($) "
                            :model="priceModel"
                        />
                    </div>
                </div>

                <div class="submit_btn_wrapper">
                    <ButtonPlainText 
                        buttonText="SUBMIT"
                        :isLoading="loading"
                        @buttonAction="createLesson"
                    />
                </div>
           </form>
       </div>
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import InputField from "@/components/InputField.vue";
import DropDown from "@/components/drop-down/drop-down.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";

export default defineComponent({
    name:"lessons",
    components: { InputField, DropDown, ButtonIcon, ButtonPlainText },
    data()  {
        
        return {
            titleModel: {
                type: 'email',
                value: '',
                error: '',
                readonly: false
            },
            languageModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            durationModel: {
                type: 'number',
                value: '',
                error: '',
                readonly: false,
                options: [
                    {
                        display_name: 'Secs',
                        value: 'secs'
                    },
                    {
                        display_name: 'Mins',
                        value: 'mins'
                    },
                    {
                        display_name: 'Hrs',
                        value: 'hrs'
                    }
                ],
                selected: true,
                selectedIndex: 0,
                inMilliSecs: 0
            },
            priceModel: {
                type: 'number',
                value: '',
                error: '',
                readonly: false
            },
            formModel: {
                error: ''
            },
            showOptions: [false],
            loading: false
        }
    },
    methods: {
        createLesson() {
            this.loading = true;

            var body = {
                title: this.titleModel.value.toLowerCase(),
                language: this.languageModel.value.toLowerCase(),
                duration: this.durationModel.inMilliSecs,
                price: this.priceModel.value
            };

            this.$store.dispatch('createlesson', body)
            .then(()=> {
                this.$router.push('/profile/lessons')
            })
            .catch((error)=> {
                this.loading = false;
                console.log(error.response);
                this.formModel.error = error.response.message
            });
        },
        closeCreate() {
            this.$router.push('/profile/lessons');
        },
        convertToMilliSecs() {
           var selected = this.durationModel.options[this.durationModel.selectedIndex].value;
           if(selected == 'secs') {
               this.durationModel.inMilliSecs = this.durationModel.value * 1000;
           }
           if(selected == 'mins') {
               this.durationModel.inMilliSecs = this.durationModel.value * 60000;
           }
           if(selected == 'hrs') {
                this.durationModel.inMilliSecs = this.durationModel.value * 3600000;
           }
        },
        toggleDropdownOptions(index) {
            if(!this.showOptions[index])
                this.hideAllDropDownOptions();
            this.showOptions[index] = !this.showOptions[index];
        },
        hideAllDropDownOptions () {
            for(var i = 0; i < this.showOptions.length; i++) {
                this.showOptions[i] = false; 
            }
        },
        selectDropDownOption(selected) {
            if(selected.dropDownIndex == 0) {
                this.durationModel.selectedIndex = selected.optionIndex;
                this.convertToMilliSecs();
            }

            this.hideAllDropDownOptions();
        }
    },
});
</script>

<style scoped>
    .lessons_frame {
        padding: 1%;
        position: relative;
        height: 100%;
    }
    .head {
        display: flex;
    }
    .section_title {
        font-size: 150%;
    }
    .cancel_btn_wrapper {
        margin-left: auto;
    }
    .cancel_btn_wrapper button {
        background: none;
        border: none;
        font-size: 200%;
        color: var(--paper-grey-600);
    }

    .create_form {
        width: 80%;
        margin-top: 5%;
    }
    .field_wrapper {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3%;
    }
    .field_wrapper.double.equal .field {
        width: calc(calc(100% - 5%)/2);
    }
    .field {
    
    }
    .field input {
        color: var(--paper-grey-700);
        padding: 0% 3%;
        height: 40px;
        font-size: 110%;
        outline: none;
    }
    .input_field {
        display: flex;
    }
    .input_field input {
        width: 60%;
    }
    .input_field .select {
        width: 40%;
        border-left: 1px solid var(--paper-grey-400);
        height: 40px;
        border-radius: 0; 
    }

    .title textarea {
        padding: 2%;
        outline: none;
        width: 96%;
        height: 70px;
        border: none;
        color: var(--paper-grey-700);
        font-size: 200%;
        font-weight: 500;
        resize: none;
    }
    textarea::placeholder {
        color: var(--paper-grey-400);
    }

    .duration {
        border-radius: 5px;
        border: 1px solid var(--paper-grey-400);
        /* overflow: hidden; */
        padding: 5px;
    }
    .duration input {
        border: none;
    }
    .label {
        height: 20px;
        color: var(--paper-grey-700);
    }
    
    .one_fifth {
        width: 20%;
    }

    .one_third {
        width: 30%;
    }
    .two_third {
        width: 60%; 
    }
    .three_third {
        width: calc(100% / 1)
    }

    .submit_btn_wrapper {
        width: 15%;
        margin-left: auto;
        margin-top: 10%;
    }
    .submit_btn_wrapper button {
        border-radius: 25px;
        height: 50px;
        background: var(--paper-light-blue-100);
        color: var(--paper-light-blue-800);
        border: none;
        box-shadow: var(--shadow-100);
    }
</style>