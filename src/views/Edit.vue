<template>
  <div class="form-container">
    <div class="form-card">
      <h1>Edit Word</h1>

      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label><i class="united kingdom flag"></i> English</label>
          <input type="text" required v-model="word.english" />
        </div>

        <div class="input-group">
          <label><i class="germany flag"></i> German</label>
          <input type="text" required v-model="word.german" />
        </div>

        <!-- Uncomment if needed
        <div class="input-group">
          <label><i class="vietnam flag"></i> Vietnamese</label>
          <input type="text" v-model="word.vietnamese" />
        </div>
        -->

        <button type="submit" class="submit-btn">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAllVocabById, updateVocab } from '../helpers/api';

export default {
  name: 'Edit',
  setup() {
    const word = ref({});
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const result = await getAllVocabById(route.params.id);
      if (!result) {
        alert('Failed to load word data. Please try again later.');
        word.value = {};
        return;
      }
      word.value = result;
    });

    const onSubmit = async () => {
      const result = await updateVocab(route.params.id, word.value);
      if (!result) {
        alert('Failed to update word. Please try again later.');
        return;
      }
      router.push('/words');
    };

    return { word, onSubmit };
  }
};
</script>

<style scoped>
/* Container căn giữa */

/* Card */
.form-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 1.25rem;
  box-shadow: 0 6px 24px rgba(0,0,0,0.15);
  padding: 2.5rem;
  max-width: 1000px;
  width: 100%;
  text-align: center;
}

/* Title */
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

/* Input group */
.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  text-align: left;
}

.input-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.input-group input {
  padding: 1rem 1.25rem;
  border: 1.5px solid #d1d5db;
  border-radius: 0.75rem;
  width: 100%;
  font-size: 1.1rem;
  box-sizing: border-box;
}

/* Submit button */
.submit-btn {
  padding: 14px 0;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  background-color: #16a34a;
  color: white;
  cursor: pointer;
  margin-top: 1.5rem;
  width: 100%;
  transition: 0.2s;
  border: none;
}

.submit-btn:hover {
  background-color: #15803d;
}
</style>