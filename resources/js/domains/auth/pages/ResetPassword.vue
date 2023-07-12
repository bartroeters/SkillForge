<script setup>
import { goToLoginPage } from '..';
import { postRequest } from 'services/http';
import { reactive, ref } from 'vue';
import { successToast } from 'services/toast';
import { useRoute } from 'vue-router';
import BaseFormError from 'components/FormError.vue';

const { email, token } = useRoute().params;

const credentials = reactive({ token, email });

const resetPassword = async () => {
  await postRequest('reset-password', credentials);
  successToast('Your password has been successfully changed. Log in to proceed.');
  goToLoginPage();
};

const resetUrl = ref('');

resetUrl.value = '{{ $resetUrl }}';
</script>

<template>
  <form @submit.prevent="resetPassword">
    <h1>New password</h1>

    <input type="hidden" name="e-mail" :value="email" />

    <div>
      <label for="password">Password</label>

      <input
        v-model="credentials.password"
        placeholder="New password"
        type="password"
        autocomplete="new-password"
      />

      <BaseFormError name="password" />
    </div>

    <div>
      <label for="password_confirmation">Repeat password</label>

      <input
        v-model="credentials.password_confirmation"
        placeholder="Repeat password"
        type="password"
        autocomplete="new-password"
      />

      <BaseFormError name="password_confirmation" />
    </div>

    <div>
      <button @click="resetPassword">Reset password</button>
      
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </form>
</template>
