<template>
    <section class="become_tutor">
        <Header />

        <section class="become_tutor_body">
            <div 
                v-if="applicationSubmitted === false"
            >
                <div class="become_tutor_page_form">
                    <form @submit.prevent="signInButtonPressed">
                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">1.</div>
                                    <FormTitle title="Basic Information" />
                                </div>

                                <div class="field">
                                    <InputField 
                                        label="Display Name" 
                                        :model="displayNameModel"
                                        @inputAction=validateDisplayName()
                                    />
                                </div>
                                <div class="double_field_equal">
                                    <div class="field">
                                        <label>Nationality</label>
                                        <div class="dropdown_wrapper">
                                            <DropDown
                                                placeholder="-- Select Your Nationality --"
                                                :dropdownIndex=0
                                                :options=countries
                                                :selected=dropdownSelected[0]
                                                :selectedIndex=dropdownSelectedIndex[0]
                                                :isOptionsVisible=optionsVisible[0]
                                                :hideBorder=false
                                                @showOptions=showOptions
                                                @optionSelect=selectOption
                                            />
                                        </div>
                                        <div class="field_error" v-if="selectedNativeCountryError != ''">
                                            {{ selectedNativeCountryError }}
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label>Country Of Residence</label>
                                        <div class="dropdown_wrapper">
                                            <DropDown
                                                placeholder="-- Select Option --"
                                                :dropdownIndex=1
                                                :options=countries
                                                :selected=dropdownSelected[1]
                                                :selectedIndex=dropdownSelectedIndex[1]
                                                :isOptionsVisible=optionsVisible[1]
                                                raiseBy=10
                                                :hideBorder=false
                                                @showOptions=showOptions
                                                @optionSelect=selectOption
                                            />
                                        </div>
                                        <div class="field_error" v-if="selectedResidentCountryError != ''">
                                            {{ selectedResidentCountryError }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">2.</div>
                                    <FormTitle title="Private Information" />
                                </div>
                                <div class="sub_title">
                                    <div class="sub_title_main">Please make sure your information is identical to your government-issued ID.</div>
                                    <div class="sub_title_note">Note: You can’t change key information such as your name, birthday, and gender once you have finished onboarding.</div>
                                </div>
                                <div class="double_field_equal">
                                    <div class="field">
                                        <InputField 
                                            label="First Name" 
                                            :model="firstNameModel"
                                            @inputAction=validateFirstName()
                                        />
                                    </div>
                                    <div class="field">
                                        <InputField 
                                            label="Last Name" 
                                            :model="lastNameModel"
                                            @inputAction=validateLastName()
                                        />
                                    </div>
                                </div>
                                <div class="double_field_equal">
                                    <div class="field">
                                        <InputField 
                                            label="Date Of Birth" 
                                            :model="dobModel"
                                            @inputAction=validateDOB()
                                        />
                                    </div>
                                    <div class="field">
                                        <label>Gender</label>
                                        <div class="dropdown_wrapper">
                                            <DropDown  
                                                placeholder="-- Select Your Gender --"
                                                :dropdownIndex=2
                                                :options=gender
                                                :selected=dropdownSelected[2]
                                                :selectedIndex=dropdownSelectedIndex[2]
                                                :isOptionsVisible=optionsVisible[2]
                                                raiseBy=9
                                                :hideBorder=false
                                                @showOptions=showOptions
                                                @optionSelect=selectOption
                                            />
                                        </div>
                                        <div class="field_error" v-if="selectedGenderError != ''">
                                            {{ selectedGenderError }}
                                        </div>
                                    </div>
                                </div>
                                <div class="double_field_right_lopsided">
                                    <div class="field">
                                        <InputField 
                                            label="Street Address" 
                                            :model="strAddModel"
                                            @inputAction=validateStrAdd()
                                        />
                                    </div>
                                    <div class="field">
                                        <label>City</label>
                                        <div class="dropdown_wrapper">
                                            <DropDown  
                                                placeholder="City"
                                                :dropdownIndex=3
                                                :options=cities
                                                :selected=dropdownSelected[3]
                                                :selectedIndex=dropdownSelectedIndex[3]
                                                :isOptionsVisible=optionsVisible[3]
                                                raiseBy=8
                                                :hideBorder=false
                                                @showOptions=showOptions
                                                @optionSelect=selectOption
                                            />
                                        </div>
                                        <div class="field_error" v-if="selectedCityError != ''">
                                            {{ selectedCityError }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">3.</div>
                                    <FormTitle title="Teacher Language Skills" />
                                </div>
                                <div class="sub_title">
                                    <div class="sub_title_note">Note: You will not be able to change your teaching language.</div>
                                </div>
                                <div class="form_field_wrapper">
                                    <div class="field">
                                        <label>Languages</label>

                                        <div
                                            class="language_field"
                                            v-for="(languageModel, index) in languagesModel"
                                            :key="index"
                                        >   
                                            <div class="input">
                                                <InputField 
                                                    :model="languageModel"
                                                    @inputAction="validateLanguages()"
                                                />
                                            </div>
                                            <div 
                                                class="remove_language_btn_wrapper"
                                                v-if="index !== 0"
                                            >
                                                <ButtonIcon
                                                    buttonIcon="times"
                                                    @buttonAction="removeLanguage(index)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="add_language_btn_wrapper">
                                    <ButtonIconText 
                                        buttonIcon="plus"
                                        buttonText="Add Language"
                                        @buttonAction="addLanguage()"
                                    />
                                </div>
                                <div class="field_error" v-if="selectedLanguagesError != ''">
                                    {{ selectedLanguagesError }}
                                </div>
                            </div>
                        </div>

                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">4.</div>
                                    <FormTitle title="Teacher Profile Picture" />
                                </div>
                                <div class="body">
                                    <div class="profile_picture_section">
                                        <div class="profile_picture_wrapper">
                                            <img 
                                                :src="profilepicModel.source"
                                            >
                                        </div>
                                        <div class="profile_picture_instructions">
                                            <label for=profile_picture>
                                                <div class="choose_photo_button">
                                                    Choose Photo
                                                </div>
                                            </label>
                                            <input 
                                                type="file"
                                                id="profile_picture"
                                                accept="image/*"
                                                @change="newPhotoSelected"
                                                hidden
                                            >

                                            <div class="instructions">
                                                <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                                <span class="text">
                                                    At least 500 x 500 pixels
                                                </span>
                                            </div>
                                            <div class="">
                                                <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                                <span class="text">
                                                    JPG and PNG formats only
                                                </span>
                                            </div>
                                            <div class="">
                                                <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                                <span class="text">
                                                    Maximum size of 2MB
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        class="error"
                                        v-if="profilepicModel.error != ''"
                                    >
                                        {{ profilepicModel.error }}
                                    </div>
                                    <div class="extra_instruction">
                                        <div class="section_title">
                                            Your photo has to respect the following characteristics: 
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text">
                                                does not show other people
                                            </span>
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text">
                                                is not too close or too far away
                                            </span>
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text">
                                                shows my eyes and face clearly
                                            </span>
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text">
                                                is clear and has good lighting
                                            </span>
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text">
                                                is friendly and personable
                                            </span>
                                        </div>
                                    </div>
                                    <div class="agreement">
                                        <CheckBox 
                                            :label="agreementModel.label"
                                            :selected="agreementModel.selected"
                                            :index=0
                                            @selectCheckBox="selectCheckBoxItem"
                                        />
                                        <div class="error">
                                            {{ agreementModel.error }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">4.</div>
                                    <FormTitle title="Professional Teaching Background" />
                                </div>
                                <div class="body">
                                    <div class="sub_title">
                                        <div class="sub_title_main">Please upload relevant documents showing your training or experience as a language teacher.</div>
                                        <div class="sub_title_note">
                                            Note: Uploaded files are ONLY visible to italki staff.
                                        </div>
                                    </div>
                                    <div class="body">
                                        <div class="background_card">
                                            <div class="label">Education</div>

                                            <div class="double_field_equal">
                                                <div class="field">
                                                    <InputField 
                                                        label="Institution"
                                                        :model="institutionModel"
                                                        @inputAction=validateEduInstitution()
                                                    />
                                                </div>
                                                <div class="field">
                                                    <InputField 
                                                        label="Major / Course" 
                                                        :model="courseModel"
                                                        @inputAction=validateEduCourse()
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div class="field">
                                                <label>Degree</label>
                                                <div class="dropdown_wrapper">
                                                    <DropDown  
                                                        placeholder="Please select an option"
                                                        :dropdownIndex=5
                                                        :options=degreeTypes
                                                        :selected=dropdownSelected[5]
                                                        :selectedIndex=dropdownSelectedIndex[5]
                                                        :isOptionsVisible=optionsVisible[5]
                                                        raiseBy=6
                                                        :hideBorder=false
                                                        @showOptions=showOptions
                                                        @optionSelect=selectOption
                                                    />
                                                </div>
                                                <div class="field_error" v-if="selectedEduDegreeTypeError != ''">
                                                    {{ selectedEduDegreeTypeError }}
                                                </div>
                                            </div>

                                            <div class="double_field_equal">
                                                <div class="field date">
                                                    <label>From</label>
                                                    <div class="dropdown_wrapper">
                                                        <DropDown  
                                                            placeholder="-- Select Date --"
                                                            :dropdownIndex=6
                                                            :options=years
                                                            :selected=dropdownSelected[6]
                                                            :selectedIndex=dropdownSelectedIndex[6]
                                                            :isOptionsVisible=optionsVisible[6]
                                                            raiseBy=5
                                                            :hideBorder=false
                                                            @showOptions=showOptions
                                                            @optionSelect=selectOption
                                                        />
                                                    </div>
                                                    <div class="field_error" v-if="selectedEduYearFromError != ''">
                                                        {{ selectedEduYearFromError }}
                                                    </div>
                                                </div>
                                                <div class="field date">
                                                    <label>To</label>
                                                    <div class="dropdown_wrapper">
                                                        <DropDown  
                                                            placeholder="-- Select Date --"
                                                            :dropdownIndex=7
                                                            :options=years
                                                            :selected=dropdownSelected[7]
                                                            :selectedIndex=dropdownSelectedIndex[7]
                                                            :isOptionsVisible=optionsVisible[7]
                                                            raiseBy=4
                                                            :hideBorder=false
                                                            @showOptions=showOptions
                                                            @optionSelect=selectOption
                                                        />
                                                    </div>
                                                    <div class="field_error" v-if="selectedEduYearToError != ''">
                                                        {{ selectedEduYearToError }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <TextareaField
                                                    label="Description (Optional)"
                                                    :model="eduDescModel"
                                                />
                                            </div>

                                            <div class="extra_instruction"></div>
                                        </div>

                                        <div class="background_card">
                                            <div class="label">Work Experience</div>

                                            <div class="double_field_equal">
                                                <div class="field">
                                                    <InputField 
                                                        label="Company / Organization" 
                                                        :model="companyModel"
                                                        @inputAction=validateCompany()
                                                    />
                                                </div>
                                                <div class="field">
                                                    <InputField 
                                                        label="Position" 
                                                        :model="positionModel"
                                                        @inputAction=validatePosition()
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div class="field">                                 
                                                <label>Country / Region</label>
                                                <div class="dropdown_wrapper">
                                                    <DropDown  
                                                        placeholder="Please select an option"
                                                        :dropdownIndex=8
                                                        :options=countries
                                                        :selected=dropdownSelected[8]
                                                        :selectedIndex=dropdownSelectedIndex[8]
                                                        :isOptionsVisible=optionsVisible[8]
                                                        raiseBy=3
                                                        :hideBorder=false
                                                        @showOptions=showOptions
                                                        @optionSelect=selectOption
                                                    />
                                                </div>
                                                <div class="field_error" v-if="selectedWorkCountryFromError != ''">
                                                    {{ selectedWorkCountryFromError }}
                                                </div>
                                            </div>

                                            <div class="double_field_equal">
                                                <div class="field date">
                                                    <label>From</label>
                                                    <div class="dropdown_wrapper">
                                                        <DropDown  
                                                            placeholder="-- Select Date --"
                                                            :dropdownIndex=9
                                                            :options=years
                                                            :selected=dropdownSelected[9]
                                                            :selectedIndex=dropdownSelectedIndex[9]
                                                            :isOptionsVisible=optionsVisible[9]
                                                            raiseBy=2
                                                            :hideBorder=false
                                                            @showOptions=showOptions
                                                            @optionSelect=selectOption
                                                        />
                                                    </div>
                                                    <div class="field_error" v-if="selectedWorkYearFromError != ''">
                                                        {{ selectedWorkYearFromError }}
                                                    </div>
                                                </div>
                                                <div class="field date">
                                                    <label>To</label>
                                                    <div class="dropdown_wrapper">
                                                        <DropDown  
                                                            placeholder="-- Select Date --"
                                                            dropdownIndex="10"
                                                            :options=years
                                                            :selected=dropdownSelected[10]
                                                            :selectedIndex=dropdownSelectedIndex[10]
                                                            :isOptionsVisible=optionsVisible[10]
                                                            raiseBy=1
                                                            :hideBorder=false
                                                            @showOptions=showOptions
                                                            @optionSelect=selectOption
                                                        />
                                                    </div>
                                                    <div class="field_error" v-if="selectedWorkYearToError != ''">
                                                        {{ selectedWorkYearToError }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <TextareaField
                                                    label="Description (Optional)"
                                                    :model="workDescModel"
                                                />
                                            </div>

                                            <div class="extra_instruction"></div>
                                        </div>

                                        <div class="background_card certificate">
                                            <div class="label">Certificates</div>
                                            
                                            <div class="double_field_equal">
                                                <div class="field date">
                                                    <label>Date Awarded</label>
                                                    <div class="dropdown_wrapper">
                                                        <DropDown  
                                                            placeholder="-- Select Date --"
                                                            :dropdownIndex=11
                                                            :options=years
                                                            :selected=dropdownSelected[11]
                                                            :selectedIndex=dropdownSelectedIndex[11]
                                                            :isOptionsVisible=optionsVisible[11]
                                                            raiseBy=0
                                                            :hideBorder=false
                                                            @showOptions=showOptions
                                                            @optionSelect=selectOption
                                                        />
                                                    </div>
                                                    <div class="field_error" v-if="selectedCertYearError != ''">
                                                        {{ selectedCertYearError }}
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="double_field_equal">
                                                <div class="field">
                                                    <InputField 
                                                        label="Certificate Title" 
                                                        :model="certTitleModel"
                                                        @inputAction=validateCertTitle
                                                    />
                                                </div>
                                                <div class="field">
                                                    <InputField 
                                                        label="Institution" 
                                                        :model="certInstitutionModel"
                                                        @inputAction=validateCertInstitution
                                                    />
                                                </div>
                                            </div>

                                            <div class="field">
                                                <TextareaField 
                                                    label="Description (Optional)"
                                                    :model="certDescModel"
                                                />
                                            </div>

                                            <div class="field">
                                                <label>Attachment (Scanned and in color)</label>
                                                <div class="">
                                                    <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                                    <span class="text"> Max 2MB </span>
                                                </div>
                                                <div class="">
                                                    <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                                    <span class="text"> PDF or JPG file </span>
                                                </div>
                                                <div class="">
                                                    <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                                    <span class="text"> Visible to italki staff only </span>
                                                </div>
                                            </div>

                                            <label for="choose_cert">
                                                <div class="choose_photo_button choose_cert_wrapper">
                                                    Choose File
                                                </div>
                                                <input 
                                                    type="file" 
                                                    id="choose_cert"
                                                    @change="selectCertFile"
                                                    hidden 
                                                />
                                            </label>
                                            <div class="cert_name">
                                                {{ certFileModel.name }}
                                            </div>
                                            <div 
                                                class="error"
                                                v-if="certFileModel.error != ''"
                                            >
                                                {{ certFileModel.error }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">5.</div>
                                    <FormTitle title="Teacher Introduction" />
                                </div>
                                <div class="body">
                                    <div class="sub_title">
                                        <div class="sub_title_note">
                                            Note: You can't add external links or use offensive terms in your description 
                                        </div>
                                    </div>
                                    <div class="body">
                                        <div class="field">
                                            <TextareaField
                                                label="About Me (as a teacher)"
                                                :model="aboutMeModel"
                                                @inputAction="validateAboutMe()"
                                            />
                                        </div>

                                        <div class="field">
                                            <TextareaField
                                                label="My lessons & Teaching Style"
                                                :model="lessonsDescModel"
                                                @inputAction="validateLessonsDesc()"
                                            />
                                        </div>

                                        <div class="teaching_materials field">
                                            <label>My Teaching Material</label>
                                            <div class="check_boxes grid_list col_3">
                                                <div
                                                    class="checkbox_option"
                                                    v-for="(material, index) in allTeachingMaterials"
                                                    :key=index
                                                >
                                                    <CheckBox 
                                                        :label="material.label"
                                                        :value="material.value"
                                                        :selected="material.selected"
                                                        :index="index + 1"
                                                        @selectCheckBox="selectCheckBoxItem"
                                                    />
                                                </div>
                                            </div>
                                            <div 
                                                class="checkbox_error error" 
                                                v-if="selectedTeachingMaterialsError != ''"
                                            >
                                                {{ selectedTeachingMaterialsError }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form_section">
                            <div class="form">
                                <div class="title">
                                    <div class="no">6.</div>
                                    <FormTitle title="Video Introduction" />
                                </div>
                                <div class="body">
                                    <div class="sub_title">
                                        <div class="sub_title_main">
                                            It's mandatory for every teacher to upload a video introduction
                                        </div>
                                        <div class="sub_title_note"></div>
                                    </div>
                                    <div class="field">
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text"> 
                                                By submitting your video to italki, you acknowledge that you agree to italki's Terms of Service.
                                            </span>
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text"> File size may not exceed 500 MB</span>
                                        </div>
                                        <div class="">
                                            <font-awesome-icon :icon="['fas', 'circle']" class="circle_icon" />
                                            <span class="text"> For the best result, the video aspect ratio should be 16:9. </span>
                                        </div>

                                        <div class="field video_upload_section">
                                            <VideoFileSelector 
                                                @videoSaved="introVideoSelected"
                                            />
                                            <div 
                                                class="error intro_video_error"
                                                v-if="introVideoModel.error != ''"
                                            >
                                                {{ introVideoModel.error }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div class="form_error" v-if="formError != ''">
                    {{ formError }}
                    <font-awesome-icon :icon="['fas', 'times']" @click="clearFormError" class="icon" />
                </div>

                <div class="submit_button_section">
                    <div class="submit_btn_wrapper">
                        <ButtonPlainText
                            buttonText="SUBMIT"
                            @buttonAction="submitApplication"
                            :isLoading="isSubmitting"
                        />
                    </div>
                </div>
            </div>
            <div 
                v-else
                class="application_submitted_modal_wrapper"
            >
                <div class="application_submitted_modal">
                    <div class="modal_img_wrapper">
                        <img src="@/assets/become-tutor-success.png" />
                    </div>
                    <div class="modal_text">
                        <div class="title">Congrats!</div>
                        <div class="body">
                            As a tutor you're all set and ready to start teaching here.
                        </div>
                    </div>
                    <div class="finish_btn_wrapper">
                        <ButtonPlainText 
                            buttonText="CREATE LESSON"
                        />
                    </div>
                </div>
            </div>
        </section>
      
        <SiteFooter />
    </section>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "@/components/Header.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import PageTitle from "@/components/title/page-title.vue";
import FormTitle from "@/components/title/FormTitle.vue";
import ButtonPlainText from "@/components/buttons/ButtonPlainText.vue";
import ButtonIconText from "@/components/buttons/ButtonIconText.vue";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import VideoFileSelector from "@/components/VideoFileSelector.vue";
import InputField from "@/components/InputField.vue";
import DropDown from "@/components/DropDown/DropDown.vue";
import TextareaField from "@/components/TextareaField.vue";
import CheckBox from "@/components/checkbox/CheckBox.vue";

export default defineComponent({
    components: { 
        Header, 
        SiteFooter, 
        PageTitle, 
        DropDown, 
        FormTitle, 
        ButtonPlainText,
        ButtonIconText,
        ButtonIcon,
        VideoFileSelector, 
        InputField, 
        TextareaField, 
        CheckBox
    },
    data() {    
        var countries = [
            {
                display_name: 'Nigeria',
                value: 'nigeria',
                note: ''
            },
            {
                display_name: 'Morocco',
                value: 'morocco',
                note: ''
            },
        ],
        gender = [
            {
                display_name: 'Male',
                value:'male',
                note: ''
            },
            {
                display_name: 'Female',
                value:'female',
                note: ''
            }
        ],
        cities = [
            {
                display_name: 'Lagos',
                value:'lagos',
                note: ''
            },
            {
                display_name: 'Kwara',
                value:'kwara',
                note: ''
            }
        ],
        years = [],
        selectedYearFrom, selectedYearTo,
        dropdownSelected = [],
        dropdownSelectedIndex = [0, 0, 0, 0, 0, 0],
        optionsVisible = [false, false, false, false, false, false],
        allTeachingMaterials = [
            {
                label: 'PDF file',
                value: 'pdf-file',
                selected: false,
            },
            {
                label: 'Text Documents',
                value: 'text-documents',
                selected: false,
            },
            {
                label: 'Presentation slides/PPT',
                value: 'presentation-slides/ppt',
                selected: false,
            },
            {
                label: 'Audio files',
                value: 'audio-files',
                selected: false,
            },
            {
                label: 'Image files',
                value: 'image-files',
                selected: false,
            },
            {
                label: 'Video files',
                value: 'video-files',
                selected: false,
            },
            {
                label: 'Flashcards',
                value: 'flashcards',
                selected: false,
            },
            {
                label: 'Articles and news',
                value: 'articles-and-news',
                selected: false,
            },
            {
                label: 'Quizzes',
                value: 'quizzes',
                selected: false,
            },
            {
                label: 'Test templates and examples',
                value: 'test-templates-and-examples',
                selected: false,
            },
            {
                label: 'Graphs and charts',
                value: 'graphs-and-charts',
                selected: false,
            },
            {
                label: 'Homework Assignments',
                value: 'homework-assignments',
                selected: false,
            }
        ],
        selectedTeachingMaterials = [];

        return {
            displayNameModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            firstNameModel: {
                type: 'text',
                value: this.$store.getters.userData.fullname.split(' ')[0],
                error: '',
                readonly: true,
            },
            lastNameModel: {
                type: 'text',
                value: this.$store.getters.userData.fullname.split(' ')[1],
                error: '',
                readonly: true
            },
            dobModel: {
                type: 'date',
                value: '',
                error: '',
                readonly: false
            },
            strAddModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            institutionModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            courseModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            aboutMeModel: {
                type: 'text',
                placeholder: 'Describe the focus of your studies',
                value: '',
                error: '',
                readonly: false
            },
            lessonsDescModel: {
                type: 'text',
                placeholder: 'Describe the focus of your studies',
                value: '',
                error: '',
                readonly: false
            },
            certDescModel: {
                type: 'text',
                placeholder: 'Describe the focus of your studies',
                value: '',
                error: '',
                readonly: false
            },
            companyModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            positionModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            eduDescModel: {
                type: 'text',
                placeholder: 'Describe the focus of your studies',
                value: '',
                error: '',
                readonly: false
            },
            workDescModel: {
                type: 'text',
                placeholder: 'Describe the focus of your studies',
                value: '',
                error: '',
                readonly: false
            },
            certTitleModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            certInstitutionModel: {
                type: 'text',
                value: '',
                error: '',
                readonly: false
            },
            certFileModel: {
                type: 'file',
                value: '',
                name: '',
                error: '',
                readonly: false
            },
            agreementModel: {
                label: "I'm aware that if my profile photo does not respect the listed characteristics, my application to become a teacher on italki could be rejected.",
                selected: false,
                error: ''
            },
            countries,
            selectedNativeCountry: '',
            selectedNativeCountryError: '',
            selectedResidentCountry: '',
            selectedResidentCountryError: '',
            gender,
            selectedGender: '',
            selectedGenderError: '',
            cities,
            selectedCity: '',
            selectedCityError: '',
            languagesModel: [
                {   
                    type: 'text',
                    value: '',
                    error: '',
                }
            ],
            
            selectedLanguages: [],
            selectedLanguagesError: '',

            formError: '',
            dropdownSelected,
            dropdownSelectedIndex,
            optionsVisible,
            years,

            degreeTypes: [
                {
                    display_name: 'BSc',
                    value: 'bsc'
                },
                {
                    display_name: 'BA',
                    value: 'ba'
                },
                {
                    display_name: 'BEng',
                    value: 'beng'
                },
                {
                    display_name: 'BEd',
                    value: 'BEd'
                }
            ],
            selectedEduYearFrom: '',
            selectedEduYearFromError: '',

            selectedEduDegreeType: '',
            selectedEduDegreeTypeError: '',
            
            selectedEduYearTo: '',
            selectedEduYearToError: '',

            selectedWorkCountryFrom: '',
            selectedWorkCountryFromError: '',

            selectedWorkYearFrom: '',
            selectedWorkYearFromError: '',
            
            selectedWorkYearTo: '',
            selectedWorkYearToError: '',
            
            selectedCertYear: '',
            selectedCertYearError: '',
            
            lessonsDescModel: {
                type: 'text',
                value: '',
                error: ''
            },
            allTeachingMaterials,
            selectedTeachingMaterials,
            selectedTeachingMaterialsError: '',
            introVideoModel: {
                value: '',
                error: '',
            },
            profilepicModel: {
                source: require('@/assets/userimage.png'),
                fileContent: {},
                error: ''
            },
            isSubmitting: false,
            applicationSubmitted: false
        }
    },
    methods: {
        async submitApplication () {
            if(this.validateInput()) {
                var becomeTeacherForm = {
                  
                  // SECTION 1
                    displayName: this.displayNameModel.value,
                    nationality: this.selectedNativeCountry,
                    residence: this.selectedResidentCountry,
                    
                    // SECTION 2
                    firstName: this.firstNameModel.value,
                    lastName: this.lastNameModel.value,
                    dob: this.dobModel.value,
                    gender: this.selectedGender,
                    str: this.strAddModel.value,
                    city: this.selectedCity,
                    languages: this.selectedLanguages,
                    
                    // SECTION 3
                    profileimage: this.profilepicModel.fileContent,
                    agreement: this.agreementModel.selected,
                    
                    // SECTION 4
                    // EDU
                    eduinstitution: this.institutionModel.value,
                    course: this.courseModel.value,
                    eduDegree: this.selectedEduDegreeType,
                    edufrom: this.selectedEduYearFrom,
                    eduto: this.selectedEduYearTo,
                    edudesc: this.eduDescModel.value,

                    // WORK
                    company: this.companyModel.value,
                    position: this.positionModel.value,
                    workfrom: this.selectedWorkYearFrom,
                    workto: this.selectedWorkYearTo,
                    workdesc: this.workDescModel.value,

                    // CERT
                    certyear: this.selectedCertYear,
                    certtitle: this.certTitleModel.value,
                    certinstitution: this.certInstitutionModel.value,
                    certdesc: this.certDescModel.value,
                    certfile: this.certFileModel.value,

                    // SECTION 5
                    aboutme: this.aboutMeModel.value,
                    lessonsdesc: this.lessonsDescModel.value,
                    teachingmat: this.selectedTeachingMaterials,

                    // SECTION 6 
                    introvideo: this.introVideoModel.value
                };

                var formData = new FormData();

                var allKeys = Object.keys(becomeTeacherForm);
                allKeys.forEach(key => {
                    formData.append(key, becomeTeacherForm[key]);
                });

                this.isSubmitting = true;
                this.$store.dispatch('submittutorapplication', formData)
                .then(()=> this.applicationSubmitted = true)
                .catch((error)=> {
                    this.isSubmitting = false;
                    console.log(error);
                    this.formError = 'There was an error submitting application, please try again.'
                });
            } 
            else this.formError = 'There was a validation error, please make corrections where necespicModel'
        },
        validateInput () {
            if( 
                this.validateDisplayName() &&
                this.validateNativeCountry() &&
                this.validateResidentCountry() &&
                this.validateFirstName() &&
                this.validateLastName() &&
                this.validateDOB() &&
                this.validateGender() &&
                this.validateStrAdd() &&
                this.validateSelectedCity() &&
                this.validateLanguages() &&
                this.validateProfilePicture() &&
                this.validateAgreement() &&
                this.validateEduInstitution() &&
                this.validateEduCourse() &&
                this.validateEduDegreeType() &&
                this.validateEduYearFrom() &&
                this.validateEduYearTo() &&
                this.validateCompany() &&
                this.validatePosition() &&
                this.validateWorkCountry() &&
                this.validateWorkYearFrom() &&
                this.validateWorkYearTo() &&
                this.validateCertYear() &&
                this.validateCertTitle() &&
                this.validateCertInstitution() &&
                this.validateCertFile() &&
                this.validateCompany() &&
                this.validatePosition() &&
                this.validateAboutMe() &&
                this.validateLessonsDesc() &&
                this.validateTeachingMaterials() &&
                this.validateIntroVideo() 

            ) return true
            else return false;
        },

        validateProfilePicture() {
            if(this.profilepicModel.fileContent.type.split('/')[0] !== 'image') {
                this.profilepicModel.error = "Only image file type (PNG, JPG) accepted";
                return false;
            }
            if(this.profilepicModel.source == '') {
                this.profilepicModel.error = "You haven`t selected your profile picture";
                return false;
            }

            this.profilepicModel.error = '';
            return true;
        },
        validateAgreement() {
             if(this.agreementModel.selected == '') {
                this.agreementModel.error = '* Check to proceed';
                return false;
            }

            this.agreementModel.error = '';
            return true;
        },
        validateNativeCountry() {
            if(this.selectedNativeCountry == '') {
                this.selectedNativeCountryError = 'Please select an option';
                return false;
            }

            this.selectedNativeCountryError = ''
            return true;
        },
        validateResidentCountry() {
            if(this.selectedResidentCountry == '') {
                this.selectedResidentCountryError = 'Please select an option'
                return false;

            } else {
                this.selectedResidentCountryError = ''
            }

            return true;
        },
        validateGender() {
            if(this.selectedGender == '') {
                this.selectedGenderError = 'Please select an option'
                return false;
            } else {
                this.selectedGenderError = ''
            }

            return true;
        },
        validateSelectedCity() {
            if(this.selectedCity == '') {
                this.selectedCityError = 'Please select an option'
                return false;
            } else {
                this.selectedCityError = ''
            }

            return true;
        },
        validateLanguages() {
            for(var i=0; i<this.languagesModel.length; i++) {
                const element = this.languagesModel[i];

                if(element.value != '') {
                    this.selectedLanguages[i] = element.value;
                    element.error = '';
                }
                else {
                    element.error = 'This field cannot be left empty';
                    return false;
                }
            } 

            if(this.selectedLanguages.length == 0) {
                this.selectedLanguagesError = 'Please select your languages'
                return false;
            }

            this.selectedLanguagesError = '';
            return true;
        },
        validateEduInstitution() {
            if(this.institutionModel.value == '') {
                this.institutionModel.error = 'Please provide your education institution';
                return false;
            }

            this.institutionModel.error = '';
            return true;
        },
        validateEduCourse() {
            if(this.courseModel.value == '') {
                this.courseModel.error = `Please provide title of course studied at ${this.institutionModel.value}`;
                return false;
            }

            this.courseModel.error = '';
            return true;
        },
        validateEduDegreeType() {
            if(this.selectedEduDegreeType == '') {
                this.selectedEduDegreeTypeError = 'Please select an option'
                return false;
            } 

            this.selectedEduDegreeTypeError = '';
            return true;
        },
        validateEduYearFrom() {
            if(this.selectedEduYearFrom == '') {
                this.selectedEduYearFromError = 'Please select an option'
                return false;
            }
            
            this.selectedEduYearFromError = '';
            return true;
        },
        validateEduYearTo() {
            if(this.selectedEduYearTo == '') {
                this.selectedEduYearToError = 'Please select an option'
                return false;
            } else {
                this.selectedEduYearToError = ''
            }

            return true;
        },
        validateWorkCompany() {
            if(this.companyModel.value == '') {
                this.companyModel.error = 'Please select an option';
                return false;
            }
            
            this.companyModel.error = '';
            return true;
        },
        validateWorkPosition() {
            if(this.positionModel.value == '') {
                this.positionModel.error = `Please enter your position in ${this.companyModel.value}`;
                return false;
            }
            
            this.positionModel.error = '';
            return true;
        },
        validateWorkCountry() {
            if(this.selectedWorkCountryFrom == '') {
                this.selectedWorkCountryFromError = 'Please select an option'
                return false;
            } else {
                this.selectedWorkCountryFromError = ''
            }

            return true;
        },
        validateWorkYearFrom() {
            if(this.selectedWorkYearFrom == '') {
                this.selectedWorkYearFromError = 'Please select an option'
                return false;
            } else {
                this.selectedWorkYearFromError = ''
            }

            return true;
        },
        validateWorkYearTo() {
            if(this.selectedWorkYearTo == '') {
                this.selectedWorkYearToError = 'Please select an option'
                return false;
            } else {
                this.selectedWorkYearFromError = ''
            }

            return true;
        },
        validateCertYear() {
            if(this.selectedCertYear == '') {
                this.selectedCertYearError = 'Please select an option'
                return false;

            } else {
                this.selectedCertYearError = ''
            }

            return true;
        },
        validateDisplayName() {
            if(this.displayNameModel.value == '') {
                this.displayNameModel.error = "Please select a name be displayed on your public teacher profile"
                return false;
            }

            this.displayNameModel.error = '';
            return true;
        },
        validateFirstName() {
            if(this.firstNameModel.value == '') {
                this.firstNameModel.error = "Please select a name "
                return false;
            }

            this.firstNameModel.error = '';
            return true;
        },
        validateLastName() {
            if(this.lastNameModel.value == '') {
                this.lastNameModel.error = "Please select a name "
                return false;
            }

            this.lastNameModel.error = '';
            return true;
        },
        validateDOB() {
            if(this.dobModel.value == '') {
                this.dobModel.error = "Please provide your date of birth";
                return false;
            }

            this.dobModel.error = '';
            return true;
        },
        
        validateStrAdd() {
            if(this.strAddModel.value == '') {
                this.strAddModel.error = "Please enter your residential address";
                return false;
            }

            this.strAddModel.error = '';
            return true;
        },
        validateCompany() {
            if(this.companyModel.value == '') {
                this.companyModel.error = "Please provide company you work(ed) in";
                return false;
            }

            this.companyModel.error = '';
            return true;
        },
        validatePosition() {
            if(this.positionModel.value == '') {
                this.positionModel.error = `Please provide your role at ${this.companyModel.value}`;
                return false;
            }

            this.positionModel.error = '';
            return true;
        },
        validateCertTitle() {
            if(this.certTitleModel.value == '') {
                this.certTitleModel.error = "Please provide your certificate title.";
                return false;
            }

            this.certTitleModel.error = '';
            return true;
        },
        validateCertInstitution() {
            if(this.certInstitutionModel.value == '') {
                this.certInstitutionModel.error = "Please provide the institution that awarded you the certificate";
                return false;
            }

            this.certInstitutionModel.error = '';
            return true;
        },
        validateCertFile() {
            if(this.certFileModel.value == '') {
                this.certFileModel.error = "Please provide the institution that awarded you the certificate";
                return false;
            }

            this.certFileModel.error = '';
            return true;
        },
        validateAboutMe() {
            if(this.aboutMeModel.value == '') {
                this.aboutMeModel.error = "Please provide more information about you";
                return false;
            }

            this.aboutMeModel.error = '';
            return true;
        },
        validateLessonsDesc() {
            if(this.lessonsDescModel.value == '') {
                this.lessonsDescModel.error = "Please describe your teaching style";
                return false;
            }

            this.lessonsDescModel.error = '';
            return true;
        },
        validateTeachingMaterials() {
            if(this.selectedTeachingMaterials.length === 0) {
                this.selectedTeachingMaterialsError = "Please select at least one of these materials";
                return false;
            }

            this.selectedTeachingMaterialsError = '';
            return true;
        },
        validateIntroVideo() {
            if(this.introVideoModel.value == '') {
                this.introVideoModel.error = "* Please submit your introduction video";
                return false;
            }

            this.introVideoModel.error = '';
            return true;
        },

        showOptions(index) {
            if(!this.optionsVisible[index])
                this.hideAllOptions();
            this.optionsVisible[index] = !this.optionsVisible[index];
        },
        selectOption(selected) {

            this.dropdownSelected[selected.dropdownIndex] = true;
            this.dropdownSelectedIndex[selected.dropdownIndex] = selected.optionIndex;
            
            if(selected.dropdownIndex == 0) {
                this.selectedNativeCountry = this.countries[selected.optionIndex].value;
                this.selectedNativeCountryError = '';
            }
       
            if(selected.dropdownIndex == 1) {
                this.selectedResidentCountry = this.countries[selected.optionIndex].value;
                this.selectedResidentCountryError = '';
            }
          
            if(selected.dropdownIndex == 2) {
                this.selectedGender = this.gender[selected.optionIndex].value;
                this.selectedGenderError = '';
            }
          
            if(selected.dropdownIndex == 3) {
                this.selectedCity = this.cities[selected.optionIndex].value;
                this.selectedCityError = '';
            }
          
            if(selected.dropdownIndex == 4) {
                this.selectedLanguages.push(this.languages[selected.optionIndex].value);
                this.selectedLangaugeError = '';
            }
  
            if(selected.dropdownIndex == 5) {
                this.selectedEduDegreeType = this.degreeTypes[selected.optionIndex].value;
                this.selectedEduYearFromError = '';

                this.validateEduDegreeType();
            }

            if(selected.dropdownIndex == 6) { 
                this.selectedEduYearFrom = this.years[selected.optionIndex].value;
                this.selectedEduYearFromError = '';
            }
    
            if(selected.dropdownIndex == 7) {
                this.selectedEduYearTo = this.years[selected.optionIndex].value;
                this.selectedEduYearToError = '';
            }
            
            if(selected.dropdownIndex == 8) {
                this.selectedWorkCountryFrom = this.countries[selected.optionIndex].value;
                this.selectedWorkCountryFromError = '';
            }

            if(selected.dropdownIndex == 9) {
                this.selectedWorkYearFrom = this.years[selected.optionIndex].value;
                this.selectedWorkYearFromError = '';
            }

            if(selected.dropdownIndex == 10) {
                this.selectedWorkYearTo = this.years[selected.optionIndex].value;
                this.selectedWorkYearToError = '';
            }

            if(selected.dropdownIndex == 11) {
                this.selectedCertYear = this.years[selected.optionIndex].value;
                this.selectedCertYearError = ''
            }


            this.formError = '';
            this.showOptions(selected.dropdownIndex);
        },
        hideAllOptions() {
            this.optionsVisible = [false, false, false, false, false, false];
        },
        increaseLanguageField() {
            this.selectedLanguages.push({
                language: '',
                proficency: ''
            });
        },
        reduceLanguageField(index) {
            this.selectedLanguages.splice(index, 1);
        },
        generateYears(from) {
            return new Promise((resolve, reject)=> {
                var today = new Date(),
                to = {
                    year: from,
                    month: today.getMonth(),
                    day: today.getDate()
                },
                yearRange = parseInt((today - new Date(to.year, to.month, to.day)) / (1000 * 3600 * 24 * 365));

                for(var i=yearRange; i >= 0; i--) {
                    var year = from+i;

                    this.years.push({
                        display_name: year,
                        value: year
                    });

                    if(i == 0) resolve();
                }
            });
        },
        clearFormError () { 
            this.formError = '';
        },
        selectCheckBoxItem(index) { 
            if(index == 0) {
                this.agreementModel.selected = !this.agreementModel.selected;
                this.validateAgreement();
            }
            else {
                const selectedBox = this.allTeachingMaterials[index-1];

                if(this.selectedTeachingMaterials.includes(selectedBox.value)) {
                var indexof = this.selectedTeachingMaterials.indexOf(selectedBox.value);

                this.selectedTeachingMaterials.splice(this.selectedTeachingMaterials.indexOf(selectedBox.value), 1);
                selectedBox.selected = false;

                } else {
                    this.selectedTeachingMaterials.push(selectedBox.value);
                    selectedBox.selected = true;
                }
            }
        },
        introVideoSelected(source) {
            this.introVideoModel.value = source;
            this.validateIntroVideo();
        },
        newPhotoSelected(e){
            this.profilepicModel.fileContent = e.target.files[0];
            if(!this.validateProfilePicture()) return false;

            this.profilepicModel.source = URL.createObjectURL(e.target.files[0]);
        },
        selectCertFile(e) {
            this.certFileModel.value = e.target.files[0];
            this.certFileModel.name = this.certFileModel.value.name;

            this.validateCertFile();
        },
        addLanguage() {
            this.languagesModel.push({
                type: 'text',
                value: '',
                error: '',
            });
        },
        removeLanguage(index) {
            this.languagesModel.splice(index, 1);
        }
    },
    async beforeMount() {
        await this.generateYears(1946);
    }
});
</script>

<style scoped>
.become_tutor_body {
    
}
.become_tutor_page_form {
    width: 90%;
    margin: 0 auto;
}
form {
    margin: 0 auto;
    width: 60%;
}
.form_section {
    box-shadow: 0px 0px 10px 5px rgba(226, 226, 226, 0.685);
    width: 100%;
    margin: 5% 0;

}
.form_section .form {
    width: 80%;
    margin: 0 auto;
    padding: 5% 0;
}
.form .title {
    display: flex;
    align-items: flex-end;
    font-weight: 600;
    margin-bottom: 5%;
}
.title .no {
    font-size: 120%;
    margin-right: 2%;
}

.double_field_equal, 
.double_field_right_lopsided,
.triple_field_equal {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}
.double_field_equal .field {
    width: 48%;
    height: 100%;
}
.double_field_right_lopsided > .field:nth-child(1) {
    width: 70%;
}
.double_field_right_lopsided > .field:nth-child(2) {
    width: 25%;
}

.triple_field_equal > div {
    width: calc((100% / 3) - 2%);
}

.form_field_wrapper {
    width: 95%;
    height: 100%;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
}
.sub_title {
    border-left: 5px solid var(--burgundy-200);
    padding-left: 2%;
    margin-bottom: 5%;
}
.sub_title_main {
    color: grey;
    font-size: 95%;
    font-weight: 500;
}
.sub_title_note {
    color: grey;
    font-size: 90%;
    font-weight: 400;
}
.field {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 1% 0;
}
.field > * {    
    width: 100%;
}
label {
    height: 23px;
    color: var(--paper-grey-600);
}
input, textarea {
    border: 1px solid grey;
    padding: 0% 3%;
    height: 40px;
    font-size: 110%;
    border-radius: 5px;
    outline-color: var(--burgundy-400);
}
.dropdown_wrapper {
    border-radius: 5px;
    height: 40px;
    margin-bottom: 1%;
}

.language_field {
    display: flex;
    align-items: center;
    margin-bottom: 1%;
}
.language_field .input {
    width: 90%;
}
.add_language_btn_wrapper {
    width: 24%;
    height: 40px;
    margin-left: auto;
    margin-top: 5%;
}
.add_language_btn_wrapper button {
    border: none;
    background: rgba(74, 81, 90, 0.056);
    color: rgba(0, 110, 255, 0.891);
    border-radius: 5px;
}
.remove_language_btn_wrapper {
    margin-left: auto;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.remove_language_btn_wrapper button {
    border: 1px solid rgb(208, 75, 75);
    color: rgb(208, 75, 75);
    background: rgba(255, 0, 0, 0.056);
    border-radius: 50%;
}

.profile_picture_section {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.profile_picture_wrapper {
    overflow: hidden;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 4px rgba(226, 226, 226, 0.685);
}
.profile_picture_wrapper img {
    object-fit: cover;
}
.profile_picture_instructions {
    margin-left: 10%;
    width: 35%;
}
.profile_picture_instructions > div {
    display: flex;
    align-items: center;
    margin-bottom: 1%;
}
.extra_instruction {
    border-top: 1px solid lightgrey;
    margin-top: 5%;
    padding: 2% 0;
}
.extra_instruction .section_title{
    margin-bottom: 2%;
}
.circle_icon {
    font-size: 40%;
    color: rgb(163, 163, 163);
}
 span {
    margin-left: 2%;
    font-size: 90%;
    font-weight: 300;
    color: rgb(70, 70, 70);
}

.choose_photo_button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgb(208, 75, 75);
    color: rgb(208, 75, 75);
    background: rgba(231, 154, 154, 0.083);
}
.choose_cert_wrapper {
    width: 30%;
}
.instructions {
    margin-top: 10%;
}
.agreement {
    border-top: 1px solid lightgrey;
    margin-top: 5%;
    padding: 2% 0;
}
.certificate .choose_photo_wrapper {
    width: 30%;
}

.grid_list {
    display: grid;
    gap: 10px;
}
.col_3 {
    grid-template-columns: calc(100%/3) calc(100%/3) calc(100%/3);
}

.check_boxes input {
    cursor: pointer;
}
.check_boxes > div {
    display: flex;
    align-items: center;
}
.check_boxes .label {
    margin: 5%;
    font-size: 90%;
}
.checkbox_error {
    margin-top: 5%;
}

.error {
    color: rgb(201, 60, 60);
}
.error::selection {
    background: none;
}

.video_upload_section {
    margin-top: 5%;
    text-align: center;
}
.intro_video_error {
    text-align: start;
    padding: 2% 0;
} 

.submit_button_section {
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    background: white;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 5%;
    position: sticky;
    bottom: 0;
}
.submit_btn_wrapper {
    width: 10%;
    height: 80%;
}
.submit_btn_wrapper button {
    border: 1px solid var(--burgundy-100);
    background: var(--burgundy-100);
    color: white;
}
.form_error {
    border-radius: 5px;
    position: sticky;
    bottom: calc(62px + 1%);
    margin-left: auto;
    margin-right: 1%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 20%;
    padding: 1%;
    border: 1px solid rgb(208, 75, 75);
    color: rgb(208, 75, 75);
    background: rgba(231, 154, 154, 0.083);
}
.form_error .icon {
    cursor: pointer;
}
.field_error {
    display: flex;
    align-items: center;
    font-size: 90%;
    color: red;
}

.application_submitted_modal_wrapper {
    height: 80vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.application_submitted_modal {
    box-shadow: var(--shadow-100);
    border-radius: 5px;
    width: 400px;
}

.modal_img_wrapper {
    height: 300px;
}
.modal_img_wrapper img {
    object-fit: contain;
}
.modal_text {
    text-align: center;
    padding: 10% 0;
}
.modal_text .title {
    font-size: 110%;
    font-weight: 600;
    color: var(--paper-grey-800);
}
.modal_text .body {
    color: var(--paper-grey-500);
    width: 70%;
    margin: 0 auto;
}
.finish_btn_wrapper {
    border-top: 1px solid var(--paper-grey-200);
    height: 60px;
}
.finish_btn_wrapper button {
    border: none;
    background: none;
    color: var(--burgundy-200);
} 
</style>