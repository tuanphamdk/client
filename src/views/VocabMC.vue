<template>
  <div class="mcq-test-container">
  <div v-if="questions.length === 0">
    <h1>Vocabulary Test (MCQ)</h1>

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
        <button class="count-btn" :class="{ active: limit===15 }" @click="limit=15">15 words</button> </br>
      </div>
      <div class="button-wrapper">
        <button class="start-btn" @click="startTest">▶ Start Test</button>
      </div>
    </div>

    <div v-if="questions.length > 0 && !finished"  class="question-box">
      <h3>Question {{ currentIndex + 1 }} / {{ questions.length }}</h3>
      <h2>{{ currentQuestion.question }}</h2>

      <div class="options">
        <button
          v-for="(opt, i) in currentQuestion.options"
          :key="i"
          class="ui button fluid option-btn"
          :class="[getOptionClass(opt), { selected: userAnswer === opt }]"
          @click="selectAnswer(opt)"
          :disabled="answered"
        >
          <span class="option-label">{{ String.fromCharCode(65 + i) }}.</span> {{ opt }}
        </button>
      </div>

        <div class="button-wrapper">
          <button class="submit-btn" @click="submitAnswer" :disabled="!userAnswer">Submit</button>
          <button class="next-btn" @click="nextQuestion" :disabled="!answered">Next</button>
        </div>
      </div>


    <!-- Final Score -->
    <div v-if="finished" class="score-box">
      <h2>🎉 Test Completed!</h2>
      <h3>Your Score: {{ score }} / {{ questions.length }}</h3>

      <button class="ui primary button" @click="restart">
        Try Again
      </button>
    </div>
  </div>
</template>

<script>
import { testMultipleChoice } from '../helpers/api';
import { ref, computed } from "vue";

export default {
  name: "VocabMC",
  setup() {
    const mode =ref("english-to-german");
    const limit = ref(5);
    const questions = ref([]);
    const currentIndex = ref(0);
    const userAnswer = ref("");
    const answered = ref(false);
    const score = ref(0);
    const finished = ref(false);

    const currentQuestion = computed(() => {
      return questions.value[currentIndex.value] || {};
    });

    const startTest = async() =>{
        try{
            const res = await testMultipleChoice(mode.value, limit.value);
            questions.value = res.vocabs;
            currentIndex.value = 0;
            score.value = 0;
            userAnswer.value = "";
            answered.value = false;
            finished.value = false;
        } catch(err) {
            console.error(err);
            alert("cannot start test");
        }
    };

    const selectAnswer = (opt) => {
        if(answered.value){
            return;
        }
        userAnswer.value =opt
    }

    const submitAnswer =(opt) =>{
        if(!userAnswer.value){
            return;
        }
        answered.value = true;

        if(userAnswer.value === currentQuestion.value.answer){
            score.value++;
        }
    };

    const getOptionClass = (opt) => {
        if (!answered.value) return "";
        if (opt === currentQuestion.value.answer) return "correct";
        if (opt === userAnswer.value && opt !== currentQuestion.value.answer) return "wrong";
      return "";
    };

    const nextQuestion = () => {
        if (currentIndex.value + 1 >= questions.value.length) {
            finished.value = true;
        } else {
            currentIndex.value++;
        }
        userAnswer.value = "";
        answered.value = false;
    };

    const restart = () => {
        questions.value = [];
        score.value = 0;
        finished.value = false;
        userAnswer.value = "";
        answered.value = false;
    };

     return {
        mode,
        limit,
        questions,
        currentIndex,
        currentQuestion,
        userAnswer,
        answered,
        score,
        finished,
        startTest,
        selectAnswer,
        submitAnswer,
        getOptionClass,
        nextQuestion,
        restart,
    };


  },
};



</script>


<style scoped>
::v-deep(.mcq-test-container) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  min-height: 100vh !important; 
  background-color: #f3f4f6 !important; 
}

.question-box {
  margin-top: 20px;
}


.score-box {
  margin-top: 30px;
}

::v-deep(.options){
  display: flex;
  flex-direction: column; 
  gap: 12px;
  margin-top: 15px;
}

::v-deep(.option-btn) {
  padding: 16px 24px !important;
  font-size: 16px !important;
  border-radius: 16px;
  border: 2px solid #d1d5db ;
  cursor: pointer;
  transition: 0.2s;
  background-color: white;
  text-align: center;
}

::v-deep(.option-btn.selected) {
  background-color: #2563eb !important; 
  color: white !important;              
  border-color: #1d4ed8 !important;     
  transform: scale(1.03);               
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}


::v-deep(.option-btn:hover) {
  background-color: #0055ff !important; 
  transform: scale(1.03); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  border-color: #a1a1aa !important;
}


::v-deep(.option-btn.correct) {
  background-color: #16a34a !important;
  color: white;
}

::v-deep(.option-btn.wrong) {
  background-color: #dc2626 !important;
  color: white;
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


::v-deep(.button-wrapper),
::v-deep(.count-wrapper){
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 12px !important;
  margin-bottom: 1rem !important;
  margin-top: 20px; 
}

::v-deep(.count-btn.active)
{
  background: #2563eb !important;
  color: white !important;
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




</style>
