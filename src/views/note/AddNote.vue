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
                <option v-for="category in categories.data" :key="category.id" :value="category.id">
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
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";

const note = ref({
  title: "",
  description: "",
  categoryId: "",
});

const validation = () => {
  if (note.value.title === "") {
    swal.fire({
      title: "Note title is required",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }

  if (note.value.description === "") {
    swal.fire({
      title: "Note description is required",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }

  if (note.value.categoryId === "") {
    swal.fire({
      title: "Note category must be selected",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
  return true;
};
const categories = ref([]);

onMounted(async () => {
  await getCategories();
});

const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://localhost:44385/api/Category/GetAll"
    );
    if (response.status === 200) {
      categories.value = response.data;
    } else {
      alert("alert something went wrong");
    }
  } catch (err) {
    alert(err.message);
  }
};

const addNote = async () => {
  try {
    if (validation()) {
      const response = await axios.post(
        "https://localhost:44385/api/Note/Post",
        note.value
      );
      if (response.status === 200) {
        note.value = response.data;
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your note has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log(response);
      }
    } else {
      swal.fire({
        title: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (err) {
    swal.fire({
      title: err.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

/* eslint-disable */
const goBack = () => {
  router.push({ path: "/note" });
};

/* eslint-disable */
const onSubmit = async () => {
  if (!validation()) {
    return;
  }
  await addNote();
  router.push("/note");
};
</script>
