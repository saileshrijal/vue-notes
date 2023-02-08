<template>
    <div class="container mt-4">
        <div class="row">
            <TopHeader title="Register" buttonText="Go Back" :buttonLink="goBack" buttonIcon="fa fa-arrow-left" />
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-2">
                            <label for="firstname" class="form-label">First Name</label>
                            <input v-model="user.firstName" type="text" class="form-control" id="firstname"
                                placeholder="Enter First Name" />
                        </div>
                        <div class="mb-2">
                            <label for="lastname" class="form-label">Last Name</label>
                            <input v-model="user.lastName" type="text" class="form-control" id="lastname"
                                placeholder="Enter Last Name" />
                        </div>
                        <div class="mb-2">
                            <label for="username" class="form-label">Username</label>
                            <input v-model="user.userName" type="text" class="form-control" id="username"
                                placeholder="Enter Username" />
                        </div>
                        <div class="mb-2">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="user.password" type="password" class="form-control" id="password"
                                placeholder="Enter Password" />
                        </div>
                        <div class="mb-2">
                            <label for="password" class="form-label">Confirm Password</label>
                            <input v-model="user.confirmPassword" type="password" class="form-control" id="password"
                                placeholder="Enter Password" />
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import swal from 'sweetalert2';
import router from '@/router';
import TopHeader from '@/components/TopHeader.vue'

const user = ref({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: '',
});

const onSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) return;
    await register();
}

const register = async () => {
    try {
        var response = await axios.post('https://localhost:44385/api/User/Login', user.value);
        var data = response.data
        console.log(data)
        if (response.status == 200) {
            swal.fire({
                title: 'Success',
                text: 'Register Success',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            localStorage.setItem('token', data.token)
            router.push('/note');
        }
        else {
            swal.fire({
                title: 'Error',
                text: 'Register Failed',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const validation = () => {
    if (user.value.firstName == '' || user.value.lastName == '' || user.value.userName == '' || user.value.address == '' || user.value.email == '' || user.value.password == '') {
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all the fields!',
        })
        return false;
    }
    return true
}

const goBack = () => {
    router.go(-1);
}

</script>