<template>
    <div class="editprofile">
        <div class="section-title">Edit Profile</div>
        <div class="section-main">
            <div class="form">
                <div class="field">
                    <div class="label">First Name</div>
                    <input v-model="firstname" @keyup="determineButtonState" type="text" placeholder="First Name" required>
                </div>
                <div class="field">
                    <div class="label">First Name</div>
                    <input v-model="firstname" @keyup="determineButtonState" type="text" placeholder="First Name" required>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditProfile'
    }
</script>

<style scoped>
    div.editprofile {
        width: 100%;
    }
    div.section-title {
        border-bottom: 1px solid lightgrey;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
        font-size: 150%;
        font-weight: 600;
    }
    div.section-main {
        display: flex;
        justify-content: center;
    }
    div.form {
        width: 60%;
        margin-top: 5%;
    }
    div.field {  }
    div.field div.label {
        font-weight: 600;
    }
    input {
        width: 80%;
        height: 40px;
        font-weight: 500;
        padding: 1% 5%;
        font-size: 110%;
        border: 1px solid lightgrey;
        color: rgb(83, 83, 83);
        outline: none;
        margin-top: 10px;
        border-radius: 5px;
    }

</style>