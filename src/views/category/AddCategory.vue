<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-6">
                <h2 class="text-uppercase">Add Category</h2>
            </div>
            <div class="col-6 text-end">
                <button class="btn btn-dark" @click="goBack">Go Back</button>
            </div>
            <hr>
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-2">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Enter Title"
                                v-model="category.title">
                        </div>
                        <div class="mb-2">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" rows="3"
                                v-model="category.description"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const category = ref({
    title: '',
    description: ''
});

const addCategory = async () => {
    try {
        const response = await axios.post("https://localhost:44385/api/Category/Post", category.value);
        if (response.status == 200) {
            alert("Category Added Successfully");
        } else {
            alert("Something went wrong");
        }
    }
    catch (error) {
        alert(error);
    }
}

const checkValidation = () => {
    if (category.value.title == '' || category.value.description == '') {
        alert("Please fill all the fields");
        return false;
    }
    return true;
}

const goBack = () => {
    router.push({ path: '/category' });
}

const onSubmit = async () => {
    if (!checkValidation()) {
        return;
    }
    await addCategory();
    router.push("/category");
}

</script>