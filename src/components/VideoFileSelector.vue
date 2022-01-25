<template>
    <div class="video_file_selector">
        <div class="video_preview_wrapper">
            <video
                class="video"
                :src="source"
                autoplay
                ref="video"
            ></video>

            <div class="controls_overlay" :style="{opacity: (isPause) ?1 :0}">
                <div class="button_toggle_play">
                    <ButtonIcon 
                        :buttonIcon="togglePlayIcon"
                        @buttonAction="togglePlay()"
                    />
                </div>
            </div>
        </div>
        <div class="upload_btn_wrapper">
            <FileSelectorButton
                buttonText="Choose Video" 
                :fileType="'video/*'"
                @input="saveAndPreviewFile"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonIcon from "@/components/buttons/ButtonIcon.vue";
import FileSelectorButton from "@/components/buttons/FileSelectorButton.vue";

export default defineComponent({
    name: 'video-file-selector',
    components: { FileSelectorButton, ButtonIcon },
    props: ['reset'],
    data() {
        return {
            source: '',
            isPause: true,
            togglePlayIcon: 'play'
        }
    },
    methods: {
        saveAndPreviewFile(result) {
            console.log('FILE SELECTED');
            this.source = URL.createObjectURL(result.file);
            URL.revokeObjectURL(result);

            this.$emit('video-saved', result.file);
        },
        togglePlay() {
            const videoRef = this.$refs.video;
            
            if(videoRef.paused){
                videoRef.play();
                this.isPause = false;
                this.togglePlayIcon = 'pause';
            }
            else { 
                videoRef.pause();
                this.isPause = true;
                this.togglePlayIcon = 'play';
            }
        }
    }
});
</script>

<style scoped>
.video_file_selector {
    width: 100%;
    height: 100%;
}
.video_preview_wrapper {
    width: 100%;
    height: 70%;
    margin: 0 auto;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
}
video {
    width: 100%;
    height: 100%;
}

.video_preview_wrapper .controls_overlay {
    opacity: 0;
    transition: 0.4s;
    background: radial-gradient(rgba(0, 0, 0, 0.712), rgba(0, 0, 0, 0.178));
    width: 100%;
    height: 99%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.video_preview_wrapper:hover .controls_overlay {
    opacity: 1 !important;
}

.button_toggle_play {
    width: 50px;
    height: 50px;
}
.button_toggle_play button {
    color: white;
    border-radius: 50%;
    background: none;
    border: none;
    font-size: 250%;
}

.upload_btn_wrapper {
    height: 30px;
    width: 40%;
    margin: 3% auto;
}

</style>