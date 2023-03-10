<template>
  <div class="container mt-4">
    <div class="row">
      <TopHeader title="Update Student" :button-link="goBack" />
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
import { onMounted, ref } from "vue";
import router from "@/router";
import swal from "sweetalert2";
import TopHeader from "@/components/TopHeader.vue"
import axiosTokenInstance from "@/services/AxiosTokenInstance";

const category = ref({
  id: "",
  title: "",
  description: "",
});

const id = router.currentRoute.value.params.id;

const getCategory = async () => {
  try {
    const response = await axiosTokenInstance.get(
      `https://localhost:44385/api/Category/Get?id=${id}`
    );
    if (response.status == 200) {
      category.value = response.data;
    } else {
      swal.fire({
        title: "something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    swal.fire({
      title: error.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

onMounted(async () => {
  await getCategory();
});

const validation = () => {
  if (category.value.title === "") {
    swal.fire({
      title: "category title must be selected",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
  if (category.value.description === "") {
    swal.fire({
      title: "category description must be selected",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false;
  }
  return true;
};

const editCategory = async () => {
  try {
    if (validation()) {
      const response = await axiosTokenInstance.put(
        `https://localhost:44385/api/Category/Put?id=${category.value.id}`,
        category.value
      );
      if (response.status == 200) {
        swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Your category has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        swal.fire({
          title: "something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
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
  await editCategory();
  router.push("/category");
};
</script>
