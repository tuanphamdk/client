<template>
  <div class="ui inverted segment navbar">
    <div class="ui center aligned container">
      <div class="ui large secondary inverted pointing menu compact">
        <router-link to="/words" class="item">
          <i class="list icon"></i> Words
        </router-link>

        <router-link to="/words/new" class="item">
          <i class="plus icon"></i> New
        </router-link>

        <router-link to="/about" class="item">
          <i class="wheelchair icon"></i> About
        </router-link>

        <router-link to="/login" class="item">
          <i class="wheelchair icon"></i> Login
        </router-link>

      </div>
    </div>
  </div>

  <div class="ui container">
    <div class="ui grid">
      <div class="row">
        <div class="twelve wide columns">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

