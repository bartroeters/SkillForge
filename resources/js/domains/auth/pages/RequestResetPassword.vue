<script setup>
import {goToLoginPage} from '..';
import {postRequest} from 'services/http';
import {ref} from 'vue';
import {successToast} from 'services/toast';
import BaseFormError from 'components/FormError.vue';

const email = ref('');

const sendEmailResetPassword = async () => {
  await postRequest('send-email-reset-password', {email: email.value});
  successToast('Password reset email has been sent. Please check your inbox.');
  goToLoginPage();
};
</script>

<template>
  <div class="forgot-password-container">
    <form class="forgot-password-form" @submit.prevent="sendEmailResetPassword">
      <h1>Forgot password</h1>
    
      <p>
        Please enter your email address below. You will receive instructions to reset your password.
      </p>
    
      <div class="forgot-password-input">
        <label for="email">Email</label>
        <input v-model="email" type="email" name="email" placeholder="Email address" class="input-field" />
        <BaseFormError name="email" />
      </div>
    
      <div>
        <button type="submit" class="forgot-password-button">Send</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import '../../../../css/forgot-password-form.css';
</style>