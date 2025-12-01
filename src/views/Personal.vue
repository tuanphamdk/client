<template>
  <div class="personal-container">
    <div class="personal-card">
      <h1>Personal Info</h1>

      <p class="label">Username:</p>
      <div class="info-box">{{ user.username }}</div>

      <p class="label">Email:</p>
      <div class="info-box">{{ user.email }}</div>

      <button class="logout-btn" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
export default {
  setup() {
    const user = ref({ username: 'N/A', email: 'N/A' });

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        user.value.username = decoded.username || decoded.name || 'N/A';
        user.value.email = decoded.email || 'N/A';
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }

const logout = async () => {
  const result = await Swal.fire({
    title: "Are you sure you want to logout?",
    text: "You will need to login again.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  });

  if (result.isConfirmed) {
    localStorage.removeItem("token");
    window.location.href = '/login';
  }
};


    return { user, logout };
  }
};
</script>

<style scoped>


.personal-card {

  width: 100%;
  text-align: center;
  margin: 2rem auto;      
  font-size: 1rem;          
}


.label {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: left;
}


.info-box {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  text-align: left;
}


.logout-btn {
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 500;
  background-color: #ef4444;
  color: white;
  cursor: pointer;
  margin-top: 2rem;
  transition: 0.2s;
}
.logout-btn:hover {
  background-color: #dc2626;
}
</style>
