<template>
    <header>
        <div class="logo">
            <router-link to="/">
                BUKASSA
            </router-link>
        </div>
        <nav>
            <router-link to="/tutors/explore">Explore Tutors</router-link>
            <router-link to="/tutors/register">Become A Tutor</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'AuthPageHeader'
}
</script>

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    header {
        border-bottom: 1px solid lightgrey;
        display: flex;
        align-items: center;
        height: 70px;
        padding: 0% 5%;
    }
    div.logo {
        font-weight: 900;
        font-size: 160%;
    }
    nav {
        margin: 0% 0% 0% auto;
        display: flex;
        justify-content: space-between;
    }
    nav > * {
        padding: 0px 15px 0px 0px;
        font-size: 100%;
        font-weight: 600;
    }

</style>