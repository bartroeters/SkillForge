<script setup lang="ts">
import { ref } from 'vue';
import { noteStore } from 'domains/notes';
import { Note } from 'domains/notes/types';
import Lesson from '../types';
import { getLoggedInUser } from 'domains/auth';
import { resizeTextarea } from 'helpers/resize-text-area';
import { useRoute } from 'vue-router';

const props = defineProps({
  note: { type: Object as () => Note }
})

const lessonId = Number(useRoute().params.id);

const addNote = async () => {
    await noteStore.actions.create(noteData.value);
};

const noteData = ref({
    ...props.note,
    lessonId: lessonId,
    userId: getLoggedInUser.value?.id,
} as Note);
</script>

<template>
  <form @submit.prevent="addNote" class="note-form">
    <div>
      <label for="content" class="note-label">Leave a note:</label>

      <textarea
        name="content"
        id="content"
        @input="resizeTextarea"
        v-model="noteData.content"
        style="width: 600px; resize: vertical;"
        class="note-textarea"
      ></textarea>
    </div>

    <button class="submit-note-button">Submit</button>
  </form>
</template>

<style scoped>
@import '../../../../css/add-note-form.css';
</style>