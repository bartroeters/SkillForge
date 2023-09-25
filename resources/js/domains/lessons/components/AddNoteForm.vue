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
.note-form {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 20px;
  margin: 0 20px 20px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.note-label {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.note-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.submit-note-button {
  background-color: #f6f8fa;
  color: #000000;
  width: fit-content;
  border: solid 1px #ccc;
  border-radius: 4px;
  margin: 10px 0 0 0;
  padding: 8px 16px;
  font-size: 15.5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  letter-spacing: 1.9px;
  opacity: .9;
}
</style>