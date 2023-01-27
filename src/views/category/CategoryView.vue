<template>
  <div class="d-flex justify-content-center">
    <table
      class="table table-bordered table-striped m-5"
      style="max-width: 800px"
    >
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Created On</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.title }}</td>
          <td>{{ category.description }}</td>
          <td>{{ category.createdOn }}</td>
          <td class="text-center">
            <button class="btn btn-danger" @click="deleteItem(category.id)">
              Delete
            </button>
            <button class="btn btn-primary mx-2" @click="editItem(category.id)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
  </div>
  <div class="d-flex justify-content-center">
    <v-pagination
      v-model="page"
      :pages="pageSize"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="getCategories()"
      class="my-3"
    />
  </div>
</template>

<script setup>
import useFetch from "./composables/useFetch";
import { onMounted, ref, watch } from "vue";
import router from "@/router";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import axios from "axios";

const baseUrl = "https://localhost:44385/api/Category/GetAll";
const page = ref(1);
const pageSize = ref(10);
const categories = ref([]);

const getCategories = () => {
  const { data, error, loading } = useFetch(
    `${baseUrl}?page=${page.value}&pageSize=${pageSize.value}`
  );
  // console.log(data.value.pageSize);
  watch(
    () => data.value,
    (newValue) => {
      if (newValue) {
        categories.value = newValue.data;
        // console.log(categories);
      }
    }
  );
  return { error, loading };
};
onMounted(() => {
  getCategories();
});

const editItem = (id) => {
  router.push({ path: `category/edit/${id}` });
};

const deleteItem = (id) => {
  try {
    const response = axios.delete(
      `https://localhost:44385/api/Category/Delete?id=${id}`
    );
    if (response === 200) {
      alert("Category deleted successfully");
    }
  } catch (error) {
    alert(error);
  }
};
</script>
