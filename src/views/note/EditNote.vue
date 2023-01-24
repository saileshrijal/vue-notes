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
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter Title"
                v-model="note.title"
              />
            </div>
            <div class="mb-2">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="note.description"
              ></textarea>
            </div>
            <div class="mb-2">
              <label for="categoryId" class="form-label">Category Id</label>
              <select v-model="note.categoryId" class="form-select">
                <option value="" disabled>--Select Category--</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
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
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

const note = ref({
  id: "",
  title: "",
  description: "",
  categoryId: "",
});

const categories = ref([]);

const id = router.currentRoute.value.params.id;

const getNote = async () => {
  try {
    const response = await axios.get(
      `https://localhost:44385/api/Note/GetById?id=${id}`
    );
    if (response.status === 200) {
      note.value = response.data;
      // console.log(response);
    } else {
      alert("something went wrong");
    }
  } catch (err) {
    alert(err.message);
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://localhost:44385/api/Category/GetAll"
    );
    if (response.status === 200) {
      categories.value = response.data;
    } else {
      alert("something went wrong");
    }
  } catch (err) {
    alert(err.message);
  }
};

onMounted(async () => {
  await getNote();
  await getCategories();
});

const editNote = async () => {
  try {
    /* eslint-disable */
    const response = await axios.put(
      `https://localhost:44385/api/Note/Put?id=${note.value.id}`,
      note.value
    );
  } catch (err) {
    alert(err.message);
  }
};

const goBack = () => {
  router.push({ path: "/note" });
};

const onSubmit = async () => {
  await editNote();
  router.push("/note");
};
</script>
