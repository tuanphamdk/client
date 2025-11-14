<template>
    <div>
        <h1>Show Word</h1>

        <div class="ui form">
            <div class="ui labeled input fluid">
                <div class="ui label">
                    <i class="germany flag"></i> German
                </div>
                <input type="text" readonly :value="word.german" style="width:100% !important"/>
            </div>

            <div class="ui labeled input fluid" style="margin-top: 10px;">
                <div class="ui label">
                    <i class="united kingdom flag"></i> English
                </div>
                <input type="text" readonly :value="word.english" style="width:100% !important" />
            </div>

                        <div class="ui labeled input fluid" style="margin-top: 10px;">
                <div class="ui label">
                    <i class="vietnam flag"></i> Vietnamese
                </div>
                <input type="text" readonly :value="word.vietnamese" style="width:100% !important" />
            </div>
        </div>



        <div class="actions">
            <router-link :to="{ name: 'Edit', params: { id: $route.params.id }}">
                Edit word
            </router-link>
        </div>
    </div>
</template>


<script>
import { getAllVocabById } from '../helpers/api';

export default {
    name: 'show',
    data() {
        return {
            word: ''
        };
    },

    async mounted() {
        this.word = await getAllVocabById(this.$route.params.id);
    }   
};
</script>

<style scoped>
.actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
}

.ui.labeled.input .ui.label {
    display: flex;
    align-items: center; /* căn giữa dọc */
}

</style>

