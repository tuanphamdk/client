<template>
<div class="vocab-test-container">
  <div class="vocab-card">
    <div v-if="questions.length === 0">
      <h1 class="text-2xl font-bold mb-4">Vocabulary Test</h1>

      <p>Translation Direction:</p>
<div class="mode-select-wrapper">
  <label class="mode-label">Select Test Mode</label>
  <select v-model="mode" class="mode-dropdown">
    <option value="german-to-english">German → English</option>
    <option value="english-to-german">English → German</option>
    <option value="english-to-vietnamese">English → Vietnamese</option>
    <option value="vietnamese-to-english">Vietnamese → English</option>
    <option value="vietnamese-to-german">Vietnamese → German</option>
    <option value="german-to-vietnamese">German → Vietnamese</option>
  </select>
</div>

      <p>How many words?</p>
      <div class="count-wrapper">
        <button class="count-btn" :class="{ active: limit===5 }" @click="limit=5">5 words</button>
        <button class="count-btn" :class="{ active: limit===10 }" @click="limit=10">10 words</button>
        <button class="count-btn" :class="{ active: limit===15 }" @click="limit=15">15 words</button>
      </div>

      <div class="button-wrapper">
        <button class="start-btn" @click="startTest">▶ Start Test</button>
      </div>
    </div>

    <!-- Test area -->
    <div v-if="questions.length>0 && !finished">
      <p>Question {{ currentIndex+1 }} of {{ questions.length }}</p>
      <div>{{ currentQuestion.question }}</div>
      <input type="text" v-model="userAnswer" @keyup.enter="submitAnswer"/>
      <div class="button-wrapper">
        <button class="submit-btn" @click="submitAnswer" :disabled="!userAnswer">Submit</button>
        <button class="next-btn" :disabled="!answered" @click="nextQuestion">Next</button>
      </div>
      <p class="feedback" :class="correct?'correct':'wrong'" v-if="feedback">{{ feedback }}</p>
    </div>

    <!-- Finished -->
    <div v-if="finished">
      <h2>Test finished!</h2>
      <p>Your score: {{ score }}/{{ questions.length }}</p>
      <button class="start-btn" @click="resetTest">Try Again</button>
    </div>
  </div>
</div>

</template>


<script>
import { ref, computed } from "vue";
import axios from "axios";
import { testVocab } from "@/helpers/api";

export default {
  name: "VocabTest",
  setup() {
    const mode = ref("english-to-german");
    const limit = ref(5);
    const questions = ref([]);
    const currentIndex = ref(0);
    const userAnswer = ref("");
    const score = ref(0);
    const feedback = ref("");
    const correct = ref(false);
    const answered = ref(false);
    const finished = ref(false);

    const currentQuestion = computed(() => {
      return questions.value[currentIndex.value] || {};
    });

const startTest = async () => {
  const res = await testVocab(mode.value, limit.value);

  if (!res) {
    alert("Failed to load test words");
    return;
  }

  questions.value = res.vocabs.map(v => ({ ...v }));
  currentIndex.value = 0;
  userAnswer.value = "";
  score.value = 0;
  feedback.value = "";
  answered.value = false;
  finished.value = false;
};
;

    const submitAnswer = () => {
      if (answered.value) return;

      const correctAnswer = currentQuestion.value.answer.trim().toLowerCase();
      const userAns = userAnswer.value.trim().toLowerCase();

      if (userAns === correctAnswer) {
        score.value++;
        feedback.value = "Correct!";
        correct.value = true;
      } else {
        feedback.value = `Wrong! Correct answer: ${currentQuestion.value.answer}`;
        correct.value = false;
      }

      answered.value = true;
    };

    const nextQuestion = () => {
      if (!answered.value) return;

      userAnswer.value = "";
      feedback.value = "";
      answered.value = false;
      currentIndex.value++;

      if (currentIndex.value >= questions.value.length) {
        finished.value = true;
      }
    };

    const resetTest = () => {
      questions.value = [];
      currentIndex.value = 0;
      userAnswer.value = "";
      score.value = 0;
      feedback.value = "";
      answered.value = false;
      finished.value = false;
    };

    return {
      mode,
      limit,
      questions,
      currentIndex,
      currentQuestion,
      userAnswer,
      score,
      feedback,
      correct,
      answered,
      finished,
      startTest,
      submitAnswer,
      nextQuestion,
      resetTest,
    };
  },
};
</script>

<style scoped>


::v-deep(.vocab-test-container) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  min-height: 100vh !important; 
  background-color: #f3f4f6 !important; 
}



/* Toggle và count buttons */
::v-deep(.toggle-wrapper),
::v-deep(.count-wrapper),
::v-deep(.button-wrapper) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 12px !important;
  margin-bottom: 1rem !important;
}


::v-deep(.toggle-btn),
::v-deep(.count-btn),
::v-deep(.start-btn),
::v-deep(.submit-btn),
::v-deep(.next-btn) {
  padding: 10px 18px !important;
  border-radius: 12px !important;
  font-weight: 500 !important;
  transition: 0.2s !important;
  cursor: pointer !important;
}


::v-deep(.toggle-btn.active) {
  background: #2563eb !important;
  color: white !important;
  box-shadow: 0 2px 8px rgba(37,99,235,0.4) !important;
}

::v-deep(.count-btn.active) {
  background: #2563eb !important;
  color: white !important;
}


::v-deep(.start-btn) {
  background: #16a34a !important;
  color: white !important;
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  margin-top: 1rem !important;
}

::v-deep(.start-btn:hover) {
  background: #15803d !important;
}



::v-deep(.next-btn) {
  background: #6b7280 !important;
  color: white !important;
}

::v-deep(.next-btn:disabled) {
  background: #9ca3af !important;
}

::v-deep(input[type="text"]) {
  width: 100% !important;
  padding: 0.75rem !important;
  border: 2px solid #d1d5db !important;
  border-radius: 0.75rem !important;
  margin-bottom: 1rem !important;
  text-align: center !important;
}

::v-deep(.feedback) {
  margin-top: 0.5rem !important;
  font-weight: 500 !important;
}
::v-deep(.feedback.correct) {
  color: #16a34a !important;
}
::v-deep(.feedback.wrong) {
  color: #dc2626 !important;
}




.mode-select-wrapper {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mode-label {
  font-weight: 600;
  font-size: 16px;
}

.mode-dropdown {
  padding: 10px 12px;
  border-radius: 12px;
  border: 2px solid #d0d0d0;
  background: white;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;     
  text-align-last: center; 
}

.mode-dropdown:focus {
  border-color: #6c63ff;
  outline: none;
}
</style>



