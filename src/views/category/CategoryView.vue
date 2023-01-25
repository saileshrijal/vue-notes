<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-6">
        <h2 class="text-uppercase">List Of Categories</h2>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-dark" @click="addClicked">Add Category</button>
      </div>
      <hr />
      <div class="card">
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Created On</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in categories" :key="category.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ category.title }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.createdOn }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="onEdit(category.id)"
                  >
                    Edit
                  </button>
                  |
                  <button
                    class="btn btn-sm btn-danger"
                    @click="onDelete(category.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
const categories = ref([]);

const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://localhost:44385/api/Category/GetAll"
    );
    if (response.status === 200) {
      categories.value = response.data;
    } else {
      swal.fire({
        title: "something went wrong",
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

const addClicked = () => {
  router.push({ path: "category/add" });
};

const onDelete = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44385/api/Category/Delete?id=${id}`
    );
    if (response.status === 200) {
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your category has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      await getCategories();
    } else {
      swal.fire({
        title: "something went wrong",
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

const onEdit = (id) => {
  router.push({ path: `category/edit/${id}` });
};

onMounted(async () => {
  await getCategories();
});
</script>
