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
  repeatedPassword: ''
});

const registerUser = async () => {
  await postRequest(`register`, userToRegister.value);
  await login({email: userToRegister.value.email, password: userToRegister.value.password});
  goToRoute('courses.overview');
};
</script>

<template>
    <h2>Register</h2>
  
    <div>
      <form @submit.prevent="registerUser">
        <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="userToRegister.firstName">
        </div>
  
        <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="userToRegister.lastName">
        </div>
  
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="userToRegister.email">
        </div>
  
        <div>
          <label for="isAdmin">Is Admin:</label>
          <input type="checkbox" id="isAdmin" v-model="userToRegister.isAdmin">
        </div>

        <div>
            <label for="email">Password:</label>
            <input
              v-model="userToRegister.password"
              type="password"
              name="password"
            
              />
        </div>

        <div>
            <label for="password">Repeat password:</label>
            <input
                v-model="userToRegister.repeatedPassword"
                type="password"
                name="repeatedPassword"
              
            />
        </div>
  
        <div>
          <button>Sign up</button>
        </div>
      </form>
    </div>
  </template>
  