<template>
  <div class="form-container">
    <div class="form-card">
      <h1>Register</h1>
      <form @submit.prevent="onRegister">
        <div class="input-group">
          <label>Username</label>
          <input v-model="username" placeholder="Username" required />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" placeholder="Email" required />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Password" required />
        </div>

        <button type="submit" class="submit-btn">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/helpers/api'; 

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const onRegister = async () => {
      const result = await register(username.value, email.value, password.value);
      if (result) {
        alert('Register success! Please login.');
        router.push('/login');
      } else {
        alert('Register failed! Please try again.');
      }
    };

    return { username, email, password, onRegister };
  }
};
</script>

<style scoped>


.form-card {
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.input-group input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  width: 100%;
  box-sizing: border-box;
}

.submit-btn {
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 500;
  background-color: #16a34a;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  transition: 0.2s;
  border: none;
}

.submit-btn:hover {
  background-color: #15803d;
}
</style>