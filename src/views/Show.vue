
<template>
  <div class="form-container">
    <div class="form-card">
      <h1>Show Word</h1>

      <p class="label">German:</p>
      <div class="info-box">{{ word.german }}</div>

      <p class="label">English:</p>
      <div class="info-box">{{ word.english }}</div>

      <div class="actions">
        <router-link :to="{ name: 'Edit', params: { id: $route.params.id }}">
          Edit word
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAllVocabById } from '../helpers/api';

export default {
  name: 'ShowWord',
  setup() {
    const route = useRoute();
    const word = ref({ german: '', english: '' });

    onMounted(async () => {
      const result = await getAllVocabById(route.params.id);
      if (result) {
        word.value = result;
      }
    });

    return { word };
  }
};
</script>

<style scoped>

/* Card */
.form-card {
  background: white;
  border: 2px solid #d1d5db;
  border-radius: 1.25rem;
  box-shadow: 0 6px 24px rgba(0,0,0,0.15);
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

/* Title */
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

/* Label */
.label {
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: 1.1rem;
}

/* Info box (read-only) */
.info-box {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

/* Actions */
.actions {
  margin-top: 2rem;
}

.actions a {
  display: inline-block;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: #16a34a;
  color: white;
  padding: 12px 24px;
  border-radius: 0.75rem;
  transition: 0.2s;
}

.actions a:hover {
  background-color: #15803d;
}
</style>
