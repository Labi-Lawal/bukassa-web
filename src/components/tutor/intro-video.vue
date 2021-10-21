<template>
    <div class="video">
        <iframe :src="videoLink"
                allowfullscreen>
        </iframe>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'intro-video',
    props: ['videoLink']
})
</script>

<style scoped>
* {
    width: 100%;
    height: 100%; 
}
iframe {
    border-radius: 5px;
}
</style>

    