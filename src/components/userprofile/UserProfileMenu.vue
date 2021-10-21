<template>
  <div class="user-profile-menu">
    <div class="menu-item">
      <font-awesome-icon :icon="['fas', 'search']"/>
      <label>My Lessons</label>
    </div>
    <div class="menu-item">
      <router-link to="/logout" class="anchor">
        <label>Log Out</label>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "user-profile-menu",
    props: ["hide"],
    data() {
        return { }
    },
    methods: { }
});
</script>

<style scoped> 
  .user-profile-menu {
    position: absolute;
    top: 150%;
    right: 0;
    width: 500%;
    padding: 4% 0%;
    background: white;
    box-shadow: 0px 0px 8px 1px rgb(221, 221, 221);
    border-radius: 2px;
    color: rgb(12, 12, 12) !important;
  }
  .menu-item {
    padding: 6% 5%;
    display: flex;
    align-items: center;
  }
  .menu-item:hover {
    background: rgb(238, 238, 238);
  }
  .menu-item > .anchor {
    width: 100%;
  }
  .menu-item label {
    margin-left: 7%;
    font-weight: 500;
  }

</style>