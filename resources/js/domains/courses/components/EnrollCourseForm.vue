<script setup lang="ts">
import Course from '../types';

const props = defineProps({
  course: { type: Object as () => Course }
})
</script>

<template>
  <div>resources\js\domains\courses\components\EnrollForm.vue</div>
  <div>{{ props.course?.title }}</div>
</template>