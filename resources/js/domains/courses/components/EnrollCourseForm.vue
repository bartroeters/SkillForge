  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import Course from '../types';
  import PageTitle from 'components/PageTitle.vue';

  const pageTitle = computed(() => course?.title);

  const {course} = defineProps({
    course: { type: Object as () => Course }
  })

  defineEmits(['enrollUser']);
  </script>

  <template>
    <page-title :text="`${pageTitle}`" />

    <div class="enroll-container">
    <form class="enroll-form" @submit.prevent="$emit('enrollUser')">
      <h2>Enroll in {{ course?.title }}</h2>
      <p>Course Description: {{ course?.description }}</p>
      <button type="submit" class="enroll-button">Enroll</button>
    </form>
  </div>
  </template>

  <style scoped>
  @import '../../../../css/enroll-course-form.css';

  
  </style>