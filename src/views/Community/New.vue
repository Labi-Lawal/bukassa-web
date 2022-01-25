<template>
    <div class="new_community_questions">
        <div class="form_box">
            <form @submit.prevent="signInButtonPressed">
                <div class="form_title">New Question</div>
                <div class="form_fields">
                    <div class="field">
                        <div class="input_field">
                            <label> Topic </label>
                            <input 
                                placeholder="Enter question topic"
                                :type="titleModel.type" 
                                v-model="titleModel.value"
                                autocomplete="false"
                                :class="{ input_error: (titleModel.error != '') ? true : false }"
                            >
                            <div class="error" v-if="titleModel.error != ''">
                                {{ titleModel.error }}
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="input_field">
                            <label> Description </label>
                            <textarea
                                placeholder="Describe your question"
                                :type="descModel.type" 
                                v-model="descModel.value"
                                autocomplete="false"
                                :class="{
                                    input_error: (descModel.error != '') ? true : false
                                }"
                            ></textarea>
                            <div class="error" v-if="descModel.error != ''">
                                {{ descModel.error }}
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="input_field"> 
                            <label> Media (Optional) </label>
                            <div class="media_actions_wrapper">
                            <div class="toggle_buttons_wrapper">
                                <ToggleButton
                                    :buttons=mediaButtons.options
                                    :selectedButtonIndex=mediaButtons.selectedIndex
                                    @changeButton="changeSelectedButton"
                                />
                            </div>
                            </div>

                            <div class="select_media_field">
                                
                                <div class="video_selector_wrapper" v-if="mediaButtons.selectedIndex === 0">
                                    <ImageFileSelector
                                        @imageSaved="saveImage"
                                    />
                                </div>

                                <div class="video_selector_wrapper" v-if="mediaButtons.selectedIndex === 1">
                                    <VideoFileSelector 
                                        @videoSaved="saveVideo"
                                    />
                                </div>
                            
                            </div>
                        </div>
                    </div>

                    <div class="submit_btn_wrapper">
                        <ButtonPlainText 
                            buttonText="Create Question"
                            :isLoading="isLoading"
                            @buttonAction="submitQuestion()"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";
import DropDown from '@/components/DropDown/DropDown.vue';
import InputField from '@/components/InputField.vue';
import ToggleButton from "../../components/buttons/ToggleButton.vue";
import ImageFileSelector from "../../components/ImageFileSelector.vue";
import VideoFileSelector from "../../components/VideoFileSelector.vue";

export default defineComponent({
    components: { ButtonPlainText, DropDown, InputField, ToggleButton, VideoFileSelector, ImageFileSelector },
    data() {
        return {
            titleModel: {
                type: 'text',
                value: '',
                error: ''
            },
            descModel: {
                type: 'text',
                value: '',
                error: ''
            },
            mediaModel: {
                type: '',
                value: '',
                error: ''
            },
            showLanguages: false,
            lang: [],
            mediaButtons: {
                options: [
                    {
                        icon: 'image',
                        label: 'Image',
                        reset: false
                    },
                    {
                        icon: 'video',
                        label: 'Video',
                        reset: false
                    }
                ],
                selectedIndex: 0
            },
            isLoading: false
        }
    },
    methods: {
        submitQuestion() {
            const body = {
                title: this.titleModel.value,
                desc: this.descModel.value,
                media: this.mediaModel.value,
                mediaType: this.mediaModel.type,
                user: this.$store.getters.userData._id
            };

            const formData = new FormData();
            var allKeys = Object.keys(body);
            allKeys.forEach(key => formData.append(key, body[key]));

            this.isLoading = true;

            this.$store.dispatch('createpost', formData)
            .then((postInfo)=> this.$router.push(`/community/posts/${postInfo._id}`))
            .catch((error)=> {
                this.isLoading = false;
                console.log(error);
            });
        },
        clearMedia() {
            this.mediaButtons.options.forEach(option => {
                option.reset = true;
            });
            this.mediaModel.value = '';
            this.mediaModel.type = '';
        },
        changeSelectedButton(index) {
            this.mediaButtons.selectedIndex = index;
        },
        saveVideo(file) {
            this.mediaModel.value = file;
            this.mediaModel.type = 'video';
        },
        saveImage(file) {
            this.mediaModel.value = file;
            this.mediaModel.type = 'image';
        }
    }
})
</script>

<style scoped>
    .new_community_questions {
    }
    .form_box {
        width: 40%;
        margin: 0 auto;
        box-shadow: var(--shadow-100);
        border-radius: 10px;
    }
    .form_title {
        border-bottom: 1px solid var(--paper-grey-300);
        color: var(--burgundy-100);
        display: flex;
        align-items: center;
        padding: 3% 5%;
        font-weight: 800;
        font-size: 140%;
    }
    .form_fields {
        padding: 2% 0;
        width: 90%;
        margin: 0 auto;
    }
    .field {
        margin-top: 5%;
    }

    .field label {
        font-size: 100%;
        font-weight: 600;
        width: 100%;
        color: var(--burgundy-100);
    }

    .input_field input, textarea, .select_input_field {
        font-weight: 300;
        outline-color: var(--burgundy-faded);
        border-radius: 5px;
        border: 1px solid var(--paper-grey-400);
        color: var(--paper-grey-600);
        height: 50px;
        margin-top: 1%;
        padding: 0 2%;
        width: 95%;
        font-size: 110%;
        font-weight: 400;
    }
    textarea {
        resize: none;
        height: 100px;
        width: 93.5%;
        padding: 3%;
    }
    textarea::placeholder, input::placeholder {
        color: var(--paper-grey-400);
    }

    .select_media_field {
        border-top: 1px solid var(--paper-grey-200);
        min-height: 100px;
        max-height: auto;
    }

    .video_selector_wrapper {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .toggle_buttons_wrapper {
        height: 30px;
        width: 30%;
        padding: 5px 0;
    }
    .toggle_buttons_wrapper > div {
        
    }
    .toggle_buttons_wrapper:deep button {
        border-radius: 10px;
        color: var(--paper-grey-700);
        font-size: 80%;
    }
    .toggle_buttons_wrapper:deep .selected {
        background: var(--paper-grey-200);
    }


    .submit_btn_wrapper {
        width: 30%;
        height: 40px;
        margin: 5% 0;
        margin-left: auto;
    }
    .submit_btn_wrapper button, .create_language_btn_wrapper button {
        border: none;
        border-radius: 5px;
        background: var(--burgundy-200);
        color: white;
    }
    
    .media_actions_wrapper {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .clear_media {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 8px;
        font-size: 80%;
        width: 12%;
        border-radius: 25px;
        background: var(--paper-grey-100);
    }
</style>