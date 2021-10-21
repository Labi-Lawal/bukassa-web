<template>
  <div class="become_tutor">
      <Header />

      <section class="body">

      </section>
      
      <Footer />
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
    name: '',
    components: { Header, Footer },
    data() {
        return { }
    },
    methods: {

    }
});
</script>

<style>

</style>