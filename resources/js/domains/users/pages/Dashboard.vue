<script setup lang="ts">
import { getLoggedInUser } from '@/domains/auth';

const user = getLoggedInUser
</script>

<template>
    <div>resources\js\domains\users\pages\Dashboard.vue</div>

    {{ user }}
</template>