<template>
  <div class="translator">
    <div id="google_translate_element"></div>
    <font-awesome-icon :icon="['fas', 'circle']" class="dot"/>
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
      // const script = document.createElement("script");
      // script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      // document.body.appendChild(script);

      // new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    }
});
</script>

<style scoped>
  .translator {
    display: flex;
  }
  #google_translate_element {
    width: 97%;
  }
  .dot {
    width: 3%;
    font-size: 5px;
    font-weight: 400 !important;
    margin-top: auto;
    margin-bottom: 15px;
    color: var(--paper-grey-700);
  }
</style>