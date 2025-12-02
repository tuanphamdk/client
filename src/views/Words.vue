<template>
  
  <div class="words-container">
    <div class="words-card">
      <h1>Word List</h1>

      <table class="ui celled compact table" v-show="words.length > 0">
        <thead>
          <tr>
            <th>English</th>
            <th>German</th>
            <th>Vietnamese</th>
            <th colspan="2">Menu</th>
            <th>
              <a @click.prevent="onDeleteMany()" class="ui blue button"> Delete All</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word,index) in paginatedWords" :key="word._id">
            <td>{{ word.english }}</td>
            <td>{{ word.german }}</td>
            <td>{{ word.vietnamese }}</td>
            <td width="75">
              <router-link class="ui button green" :to="{name: 'Show', params:{id:word._id}}">Show</router-link>
            </td>
            <td width="75">
              <router-link class="ui button blue" :to="{name: 'Edit', params:{id:word._id}}">Edit</router-link>
            </td>
            <td width="75">
              <a @click.prevent="onDelete(word._id)" class="ui red button">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-show="words.length === 0">No words found.</p>

      <div v-if="totalPages > 1" class="ui pagination menu">
        <a
          class="item"
          :class="{ disabled: currentPage === 1 }"
          @click.prevent="prevPage"
        >
          Prev
        </a>

        <span class="item">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <a
          class="item"
          :class="{ disabled: currentPage === totalPages }"
          @click.prevent="nextPage"
        >
          Next
        </a>
      </div>
    </div>
  </div>
</template>
 
<script>
import { ref, onMounted, computed } from "vue";
import { viewAllVocabs, deleteVocabById, deleteAllVocab } from "@/helpers/api";
import Swal from "sweetalert2";

export default {
  name: "Words",
  setup() {
    const words = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(7);

    onMounted(async () => {
      words.value = (await viewAllVocabs()) || [];
    });


    const paginatedWords = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return words.value.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(words.value.length / pageSize.value));


    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const onDelete = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteVocabById(id);
        words.value = words.value.filter((word) => word._id !== id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        if (currentPage.value > totalPages.value) currentPage.value = totalPages.value || 1;
      }
    };

    const onDeleteMany = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteAllVocab();
        words.value = [];
        currentPage.value = 1;
        Swal.fire({
          title: "Deleted!",
          text: "All words have been deleted.",
          icon: "success",
        });
      }
    };

    return {
      words,
      paginatedWords,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
      onDelete,
      onDeleteMany,
    };
  },
};
</script>

<style scoped>


.words-card {
  padding: 2rem;
  max-width: 900px; 
  width: 100%;
  overflow-x: auto; 
  text-align: center;
}


.words-card table {
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
}


.words-card .ui.pagination.menu {
  justify-content: center;
}
</style>
