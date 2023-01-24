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
                        <button type="submit" class="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const category = ref({
    id: '',
    title: '',
    description: ''
});

const id = router.currentRoute.value.params.id;

const getCategory = async () => {
    try {
        const response = await axios.get(`https://localhost:44385/api/Category/Get?id=${id}`);
        if (response.status == 200) {
            category.value = response.data;
        } else {
            alert("Something went wrong");
        }
    }
    catch (error) {
        alert(error);
    }
}

onMounted(async () => {
    await getCategory();
});

const validation = () => {
    if (category.value.title === "") {
        alert("Title is required");
        return false;
    }
    if (category.value.description === "") {
        alert("Description is required");
        return false;
    }
    return true;
}

const editCategory = async () => {
    try {
        const response = await axios.put(`https://localhost:44385/api/Category/Put?id=${category.value.id}`, category.value);
        if (response.status == 200) {
            alert("Category Updated");
        } else {
            alert("Something went wrong");
        }
    } catch (err) {
        alert(err.message);
    }
}

const goBack = () => {
    router.push({ path: '/category' });
}

const onSubmit = async () => {
    if (!validation()) {
        return;
    }
    await editCategory();
    router.push("/category");
}

</script>