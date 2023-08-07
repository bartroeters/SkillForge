<script setup lang="ts">
import { postRequest } from 'services/http';
import { ref } from 'vue';
import { UserToRegister } from 'domains/users/types';
import { login } from '..';
import { goToRoute } from 'services/router';

const userToRegister = ref<UserToRegister>({
id: 0,
firstName: '',
lastName: '',
email: '',
isAdmin: false,
password: '',
repeatedPassword: '',
createdAt: '',
courseIds: []
});

const registerUser = async () => {
  await postRequest(`register`, userToRegister.value);
  await login({email: userToRegister.value.email, password: userToRegister.value.password});
  goToRoute('courses.overview');
};
</script>

<template>
  <div class="login-container">
    <form class="auth-form" @submit.prevent="registerUser">
      <h1>Register</h1>

      <div class="auth-input">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="userToRegister.firstName" class="input-field" />
      </div>

      <div class="auth-input">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="userToRegister.lastName" class="input-field" />
      </div>

      <div class="auth-input">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="userToRegister.email" class="input-field" />
      </div>

      <div class="auth-input">
        <label for="isAdmin">Is Admin:</label>
        <input type="checkbox" id="isAdmin" v-model="userToRegister.isAdmin" class="checkbox-input" />
      </div>

      <div class="auth-input">
        <label for="password">Password:</label>
        <input v-model="userToRegister.password" type="password" name="password" class="input-field" />
      </div>

      <div class="auth-input">
        <label for="repeatedPassword">Repeat password:</label>
        <input v-model="userToRegister.repeatedPassword" type="password" name="repeatedPassword" class="input-field" />
      </div>

      <div>
        <button class="auth-button">Sign up</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import '../../../../css/auth-form-page.css';
</style>