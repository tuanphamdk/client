<template>
  <div class="form-container">
    <div class="form-card">
      <h1>Login</h1>
      <form @submit.prevent="onLogin">
        <div class="input-group">
          <label>Email</label>
          <input type="email" placeholder="Email" v-model="email" required />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input type="password" placeholder="Password" v-model="password" required />
        </div>

        <button type="submit" class="submit-btn">Login</button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/helpers/api'; 
import Swal from 'sweetalert2';

export default {
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');

const onLogin = async () => {
  const result = await login(email.value, password.value);
  if (result && result.token) {
    localStorage.setItem('token', result.token);
    await Swal.fire({
      icon: 'success',
      title: 'Login Success!',
      showConfirmButton: false,
      timer: 1500
    });
    router.push('/words');
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Please check your email/password.'
    });
  }
};


    return { email, password, onLogin };
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