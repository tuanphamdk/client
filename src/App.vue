<template>
  <div>
    <!-- Navbar -->
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">


          <router-link v-if="isLoggedIn"  to="/words" class="item" >
            <i class="list icon"></i> Words
          </router-link>
          <router-link to="/words/new" class="item" v-if="isLoggedIn">
            <i class="plus icon"></i> New
          </router-link>
          <router-link v-if="!isLoggedIn" to="/about" class="item">
            <i class="info circle icon"></i> About
          </router-link>


          <router-link v-if="!isLoggedIn" to="/login" class="item">
            <i class="sign-in icon"></i> Login
          </router-link>
          <router-link v-if="!isLoggedIn" to="/register" class="item">
            <i class="user plus icon"></i> Register
          </router-link>

          <router-link to="/test" class="item" v-if="isLoggedIn">
            <i class="edit icon"></i> Test
          </router-link>

          <router-link to="/testMC" class="item" v-if="isLoggedIn">
            <i class="question circle outline icon"></i> Multi
          </router-link>
          <router-link v-if="isLoggedIn" to="/personal" class="item">
            <i class="user icon"></i> {{ username }}
          </router-link>

        </div>
      </div>
    </div>

    <!-- Router View -->
    <div class="ui container" style="display: flex; justify-content: center">
      <div class="form-container">
        <div class="form-card">
              <router-view></router-view>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
  name: "App",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("token"),
      username: '' 
    };
  },
  created() {
    this.updateUserName();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.isLoggedIn = false;
      this.username = '';
      this.$router.push("/login");
    },
    updateUserName() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwt_decode(token);
          this.username = decoded.username || decoded.name || '';
        } catch (err) {
          console.error("Failed to decode token:", err);
          this.username = '';
        }
      } else {
        this.username = '';
      }
    }
  },
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem("token");
      this.updateUserName();
    }
  }
};
</script>

<style scoped>

.ui.inverted.segment.navbar {
  margin-bottom: 20px;
}
.ui.labeled.input .ui.label {
  display: flex;
  align-items: center;
}

.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 700;
}

.form-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  padding: 2rem;
  max-width: 700;
  width: 80%;
  text-align: center;
}

</style>
