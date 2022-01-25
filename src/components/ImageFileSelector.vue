<template>
    <div class="image_file_selector">
        <label for="profile_picture" class="choose_photo_wrapper">
            
            <div class="photo_button_choosen" v-if="source !== ''">
                <img 
                    :src="(reset) ?'' :source"
                />
            </div>

            <div class="choose_photo_button" v-else>
                <div class="child">
                    <font-awesome-icon :icon="['fas', 'image']" class="icon" />
                    <div class="text">Choose image from local storage</div>
                </div>
            </div>
        
        </label>
        
        <input 
            type="file"
            id="profile_picture"
            accept="image/*"
            @change="saveAndPreviewFile"
            hidden
        >
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({    
    name: 'image-file-selector',
    components: {  },
    props: ['reset'],
    data() {
        return {
            source: ''
        }
    },
    methods: {
        saveAndPreviewFile(result) {
            this.source = result.target.files[0];
            if(!this.source === '') this.error();

            this.source = URL.createObjectURL(result.target.files[0]);

            this.$emit('image-saved', result.target.files[0]);
        }
    }
});
</script>

<style scoped>
    .image_file_selector {
        height: 300px;
    }
    .choose_photo_button, .photo_button_choosen {
        border: 1px solid var(--paper-grey-300);
        border-style: dashed;
        border-radius: 5px;
        overflow: hidden;
        height: 99%;
        width: 99.5%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .photo_button_choosen img {
        object-fit: cover;
    }
    .child {
        color: var(--paper-grey-600);
    }
    .icon {
        font-size: 300%;
    }
    .text {
        font-size: 150%;
        font-weight: 300;
    }
</style>




