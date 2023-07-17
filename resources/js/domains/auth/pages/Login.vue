<script setup>
import {goToDashboardPage} from 'services/router';
import {login} from '../';
import {ref} from 'vue';
import { USER_DOMAIN_NAME } from '../../users';

const credentials = ref({});

const submit = async () => {
    await login(credentials.value);
    goToDashboardPage(USER_DOMAIN_NAME);
};
</script>

<template>
    <h1>Login</h1>

    <form @submit.prevent="submit">
        <div>
            <input
                v-model="credentials.email"
                type="email"
                name="email"
                placeholder="Email address"
            />
        </div>
        
        <div>
            <input
                v-model="credentials.password"
                type="password"
                name="password"
                placeholder="Password"
            />
        </div>

        <div>
            <input id="remember" type="checkbox" name="remember" />
            <label for="remember">&nbsp;Keep me logged in</label>
        </div>

        <div>
            <button>Login</button>
        </div>

        <div>
            <router-link :to="{ name: 'forgotPassword' }">Forgot password</router-link>
            <router-link :to="{ name: 'register' }">Register</router-link>
        </div>
    </form>
</template>
