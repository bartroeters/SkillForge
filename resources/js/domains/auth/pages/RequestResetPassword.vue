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
    <form @submit.prevent="resetPassword">
        <h1>Forgot password</h1>
    
        <p>
            Please enter your email address below. You will receive instructions to reset your password.
        </p>
    
        <div>
            <label for="email">Email</label>
            <input v-model="email" type="email" name="email" placeholder="Email address" />
            <BaseFormError name="email" />
        </div>
    
        <div>
            <button @click="sendEmailResetPassword">Send</button>
            <router-link :to="{ name: 'Login' }">Go back</router-link>
        </div>
    </form>
</template>