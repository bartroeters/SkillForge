<script setup>
import {goToOverviewPage} from 'services/router';
import {login} from '../';
import {ref} from 'vue';
import { USER_DASHBOARD_DOMAIN_NAME } from '../../users';
import PageTitle from 'components/PageTitle.vue';

const credentials = ref({});

const submit = async () => {
  await login(credentials.value);
  goToOverviewPage(USER_DASHBOARD_DOMAIN_NAME);
};
</script>

<template>
  <page-title text="Login"/>
  
  <div class="login-container">
    <form class="auth-form" @submit.prevent="submit">
      <h1>Login</h1>

      <div class="auth-input">
        <input
          v-model="credentials.email"
          type="email"
          name="email"
          placeholder="Email address"
          class="input-field"
        />
      </div>

      <div class="auth-input">
        <input
          v-model="credentials.password"
          type="password"
          name="password"
          placeholder="Password"
          class="input-field"
        />
      </div>

      <div class="login-checkbox">
        <label for="remember">&nbsp;
          <input id="remember" type="checkbox" name="remember" />
          Keep me logged in
        </label>
        <router-link class="login-link" :to="{ name: 'forgotPassword' }">Forgot password</router-link>
      </div>

      <div>
        <button class="auth-button">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import '../../../../css/auth-form-page.css';
</style>