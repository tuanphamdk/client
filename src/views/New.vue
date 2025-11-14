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
import {ref} from "vue";
import { useRouter } from "vue-router";
import { createNewVocab } from "../helpers/api";
import Swal from 'sweetalert2'

export default {
    name: "New",
    setup(){
        const word = ref({});
        const router = useRouter();

        const onSubmit = async () => {
            await createNewVocab(word.value);

            Swal.fire({
                title:"congratulation",
                text:"You added new word successfully",
                icon:"success"
            })
            router.push('/words');

        };

        return{
            word,
            onSubmit,
        };
    }
};
</script>