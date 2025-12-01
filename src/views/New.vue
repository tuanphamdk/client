<template>
  <div class="form-container">
    <div class="form-card">
      <h1>New Word</h1>
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <label><i class="united kingdom flag"></i> English</label>
          <input type="text" required v-model="word.english">
        </div>

        <div class="input-group">
          <label><i class="germany flag"></i> German</label>
          <input type="text" required v-model="word.german">
        </div>

                        <div class="input-group">
          <label><i class="vietnam flag"></i> Vietnamese</label>
          <input type="text" required v-model="word.vietnamese" />
        </div>

        <button class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import { useRouter } from "vue-router";
import { createNewVocab } from "../helpers/api";
import Swal from 'sweetalert2';

export default {
  name: "New",
  setup(){
    const word = ref({});
    const router = useRouter();

    const onSubmit = async () => {
      await createNewVocab(word.value);

      Swal.fire({
        title:"Congratulations",
        text:"You added a new word successfully",
        icon:"success"
      });
      router.push('/words');
    };

    return { word, onSubmit };
  }
};
</script>

<style scoped>





.form-card {
  padding: 2rem;
  max-width: 700px;
  width: 100%;  
  text-align: center;
}


/* Input group */
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

/* Submit button */
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
}

.submit-btn:hover {
  background-color: #15803d;
}


</style>
