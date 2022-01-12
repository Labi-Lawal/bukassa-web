<template>
    <div class="translator">
        <div id="google_translate_element"></div>
        <font-awesome-icon :icon="['fas', 'caret-right']" class="icon"/>
    </div>
    
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'translator',
    data() {
        return {
          ele: null
        }
    },
    mounted() {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
      
    }
});
</script>

<style scoped>
  .translator {
    width: 90%;
  }
  .icon {
    position: absolute;
    z-index: 100;
    right: 5%;
  }
</style>