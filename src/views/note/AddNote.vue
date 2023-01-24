<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-6">
        <h2 class="text-uppercase">Add Note</h2>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-dark" @click="goBack">Go Back</button>
      </div>
      <hr />
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-2">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" placeholder="Enter Title" v-model="note.title" />
            </div>
            <div class="mb-2">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3" v-model="note.description"></textarea>
            </div>
            <div class="mb-2">
              <label for="title" class="form-label">Category id</label>
              <select v-model="note.categoryId" class="form-select">
                <option value="" disabled>--Select Category--</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router";

const note = ref({
  title: "",
  description: "",
  categoryId: "",
});

const categories = ref([]);

onMounted(async () => {
  await getCategories();
});

const getCategories = async () => {
  const response = await axios.get(
    "https://localhost:44385/api/Category/GetAll"
  );
  categories.value = response.data;
};

const addNote = async () => {
  const response = await axios.post(
    "https://localhost:44385/api/Note/Post",
    note.value
  );
  console.log(response);
};

/* eslint-disable */
const goBack = () => {
  router.push({ path: "/note" });
};

/* eslint-disable */
const onSubmit = async () => {
  await addNote();
  router.push("/note");
};

</script>
