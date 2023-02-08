<template>
    <div class="container mt-4">
        <div class="row">
            <TopHeader title="Login" buttonText="Go Back" :buttonLink="goBack" buttonIcon="fa fa-arrow-left" />
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-2">
                            <label for="username" class="form-label">Username</label>
                            <input v-model="user.username" type="text" class="form-control" id="username"
                                placeholder="Enter Username" />
                        </div>
                        <div class="mb-2">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="user.password" type="password" class="form-control" id="password"
                                placeholder="Enter Password" />
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import swal from 'sweetalert2'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import TopHeader from '@/components/TopHeader.vue'

const user = ref({
    username: '',
    password: ''
})

const onSubmit = async () => {
    await login()
}


const checkValidation = () => {
    if (user.value.email == '' || user.value.password == '') {
        swal.fire({
            title: 'Error',
            text: 'Please fill email and password fields',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return false
    }
    return true
}
const authStore = useAuthStore()

const login = async () => {
    if (!checkValidation()) {
        return;
    }
    try {
        const response = await axios.post(`https://localhost:44385/api/User/Login`, user.value)
        var data = await response.data
        await authStore.getLoggedInUser()
        localStorage.setItem('token', data.token)
        router.push('/note');
    } catch (error) {
        swal.fire({
            icon: 'error',
            title: error.response.data.errors[0],
            text: 'Error'
        })
        console.log(error.response.data.errors)
    }
}

const goBack = () => {
    router.go(-1);
}

</script>