<template>
<div>
    <h1>Word List</h1>

    <!-- Table chỉ hiển thị khi words có dữ liệu -->
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
            <tr v-for="(word,index) in words" :key="index">
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
</div>

</template>

<script>
import {ref, onMounted} from "vue";
import {viewAllVocabs, deleteVocabById, deleteAllVocab} from "@/helpers/api";
import Swal from "sweetalert2";


export default{
    name:"Words",
    setup(){
        const words = ref([]);

        onMounted(async ()=>{
            words.value = (await viewAllVocabs()) || [];
        })

        const onDelete = async (id) =>{
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await deleteVocabById(id)
                words.value = words.value.filter((word) => word._id !== id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        };

        const onDeleteMany = async () =>{
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await deleteAllVocab()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
            };
        return {
            words,
            onDelete,
            onDeleteMany
        }
    }
}
</script>