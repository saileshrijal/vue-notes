<template>
    <nav class="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Vue Notes</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active" aria-current="page" href="#">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/about" class="nav-link" href="#">About</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/category" class="nav-link" href="#">Category</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/note" class="nav-link" href="#">Note</RouterLink>
                    </li>
                </ul>
                <!-- //if authenticated/logged in -->
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-if="authStore.isAuthenticated">
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link">Hi! {{ authStore.user.firstName }}
                            {{ authStore.user.lastName }}</router-link>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-secondary" @click="logOut">Log Out</button>
                    </li>
                </ul>
                <!-- if not loggedin -->
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-if="!authStore.isAuthenticated">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">Register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

const logOut = () => {
    localStorage.removeItem('token');
    authStore.isAuthenticated = false;
    authStore.user = {}
    router.push('/')
}
</script>