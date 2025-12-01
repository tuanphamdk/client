<template>
  <section class="ui container" style="padding: 2rem 0;">
    <div class="ui stackable grid middle aligned">
      <div class="six wide column">
        <img
          class="ui rounded  image about-logo"
          :src="require('@/assets/logo2.jpg')"
          alt="Vocab Builder illustration"
        />
      </div>

      <div class="ten wide column">
        <h1 class="ui header">Welcome to Vocab Builder</h1>
        <p class="ui text">
          Our website is designed to help you learn your vocabulary more quickly and efficiently. 
          Create a new word and organize your personal word sets across three languages 
          (Vietnam, Germany, and English). You can practice with a test. Everything is built
           to help you learn a language more easily.
        </p>

        <div class="ui buttons" style="margin-top: 1rem;">
          <router-link to="/login" class="ui primary button">Login</router-link>
          <div class="or"></div>
          <router-link to="/register" class="ui button">Register</router-link>
        </div>
      </div>
    </div>

    <div class="ui divider" style="margin: 2rem 0;"></div>

    <div class="ui three stackable cards">
<div class="ui card">
  <div class="content">
    <div class="header">Create Words</div>
    <div class="description">
      Add new words to your vocabulary to expand your learning.
    </div>
  </div>
</div>

      <div class="ui card">
        <div class="content">
          <div class="header">Interactive Tests</div>
          <div class="description">
            Practice with multiple-choice quizzes, fill-in-the-blank
          </div>
        </div>
      </div>

<div class="ui card">
  <div class="content">
    <div class="header">Manage Words</div>
    <div class="description">
      Edit and delete your words to keep your vocabulary set up to date.
    </div>
  </div>
</div>
    </div>

    <div class="ui segment" style="margin-top: 2rem; text-align: center;">
      <p>To access full features of our websites, please log in or register.</p>
      <div class="ui buttons" style="margin-top: 1rem;">
        <router-link to="/register" class="ui primary button">Get Started Free</router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
section {
  font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.about-logo {
  width: 200px;
  height: auto; /* giữ đúng tỉ lệ */
}

</style>