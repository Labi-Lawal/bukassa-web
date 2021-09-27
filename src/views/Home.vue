<template>
  <div class="home">
    <img src="../assets/home-background.jpg" class="background-image">
    <div class="front">
      <section class="hero">
        <Header />
        <div class="hero-content">
          <div class="hero-text">We Are The Bridge Connecting You With The Best Tutors</div>
          <div class="search-form"> 
            <input placeholder="What do you want to learn">
            <button><font-awesome-icon :icon="['fas', 'search']" /></button>
          </div>
        </div>
      </section> 
    </div>
    <Footer />
  </div>
</template>

<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'

  export default {
    name: 'Home',
    components: {
      Header,
      Footer
    }
}
</script>

<style scoped>
    header {
      border-bottom: none;
    }
    img.background-image {
      width: 100%;
      height: 100vh;
      object-fit: cover;
      object-position: top;
    }
    div.front {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
    }
    section.hero {
      background: rgba(0, 0, 0, 0.555);
      color: white;
      height: 100vh;
    }
    section.hero div.drop-down > div.dot {
      display: none !important;
    }
    div.hero-content {
      text-align: center;
      width: 50%;
      margin: 20vh auto 0 auto;
    }
    div.hero-text {
      font-size: 420%;
      font-weight: 800;
    }
    div.search-form{
      width: 85%;
      margin: 3vh auto 0;
      background: white;
      display: flex;
      border-radius: 2px;
      overflow: hidden;
      height: 6vh;
    }
    input {
      height: 100%;
      width: 80%;
      border: none;
      padding: 0% 5%;
      font-size: 110%; 
      outline: none;
      background: none;
      font-weight: 400;
    }
    input::placeholder{
      color: rgba(128, 128, 128, 0.8);
    }
    button {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 110%;
      background: none;
      border: none;
      color: grey;
    }
</style>