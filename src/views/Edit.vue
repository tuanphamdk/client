<template>
    <div>
        <h1>New Word</h1>
        <form action="" @submit.prevent="onSubmit">
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="united kingdom flag"></i> English</div>
                <input type="text" required v-model="word.english" style="width:100% !important">
            </div>
            <br>
            <div class="ui labeled input fluid">
                <div class="ui label"><i class="germany flag"></i> German</div>
                <input type="text" required v-model="word.german" style="width:100% !important">
            </div>
            <br>
            <!-- <div class="ui labeled input fluid">
                <div class="ui label"><i class="vietnam flag"></i>Vietnamese</div>
                <input type="text" required v-model="word.vietnamese">
            </div> -->
            <br>
            <button class="ui primary button">Submit</button>
        </form>
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
      if (result === null) {
        alert('Failed to load word data. Please try again later.');
        word.value = {};
        return;
      }
      word.value = result;
    });

    const onSubmit = async () => {
      const result = await updateVocab(route.params.id, word.value);
      if (result === null) {
        alert('Failed to update word. Please try again later.');
        return;
      }
      router.push('/words');
    };

    return {
      word,
      onSubmit
    };
  }
};
</script>