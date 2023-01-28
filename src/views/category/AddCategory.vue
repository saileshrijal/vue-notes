<template>
  <div class="container mt-4">
    <div class="row">
      <TopHeader title="Add Category" buttonText="Go Back" :buttonLink="goBack" buttonIcon="fa fa-arrow-left" />
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-2">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" placeholder="Enter Title" v-model="category.title" />
            </div>
            <div class="mb-2">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3" v-model="category.description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";
import TopHeader from "@/components/TopHeader.vue"

const category = ref({
  title: "",
  description: "",
});

const validation = () => {
  if (category.value.title === "") {
    swal.fire({
      title: "Title is required",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
  if (category.value.description === "") {
    swal.fire({
      title: "Description is required",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
  return true;
};

const addCategory = async () => {
  try {
    const response = await axios.post(
      "https://localhost:44385/api/Category/Post",
      category.value
    );
    if (response.status === 200) {
      swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Your category has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
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

const goBack = () => {
  router.push({ path: "/category" });
};

const onSubmit = async () => {
  if (!validation()) {
    return;
  }
  await addCategory();
  router.push("/category");
};
</script>
