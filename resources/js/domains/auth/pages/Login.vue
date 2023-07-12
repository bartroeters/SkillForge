<script setup>
import {goToOverviewPage} from 'services/router';
import {login} from '../';
import {ref} from 'vue';
import { COURSE_DOMAIN_NAME } from '../../courses';

const credentials = ref({});

const submit = async () => {
    await login(credentials.value);
    goToOverviewPage(COURSE_DOMAIN_NAME);
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
            <label for="remember">&nbsp;Ingelogd blijven</label>
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
