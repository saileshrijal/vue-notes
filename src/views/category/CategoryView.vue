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
              <transition-group name="list">
                <tr v-for="(category, index) in categories.data" :key="category.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ category.title }}</td>
                  <td>{{ category.description }}</td>
                  <td>{{ category.createdOn }}</td>
                  <td>
                    <button class="btn btn-sm btn-primary" @click="onEdit(category.id)">
                      Edit
                    </button>
                    |
                    <button class="btn btn-sm btn-danger" @click="onDelete(category.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </transition-group>
            </tbody>
          </table>
          <Pagination v-model="categories.page" :records="categories.totalCount" :per-page="categories.pageSize"
            @paginate="myCallback" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import router from "@/router";
import Pagination from "v-pagination-3";
const categories = ref({
  data: [],
  page: 1,
  pageSize: 2,
  totalPages: 0,
  totalCount: 0,
});

const myCallback = async (page) => {
  categories.value.page = page;
  await getCategories();
};

const getCategories = async () => {
  try {
    const response = await axios.get(
      `https://localhost:44385/api/Category/GetAll?page=${categories.value.page}&pageSize=${categories.value.pageSize}`
    );
    if (response.status === 200) {
      categories.value = response.data;
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    alert(err.message);
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
      alert("Category Deleted");
      await getCategories();
    } else {
      alert("Something went wrong");
    }
  } catch (err) {
    alert(err.message);
  }
};

const onEdit = (id) => {
  router.push({ path: `category/edit/${id}` });
};
onMounted(async () => {
  await getCategories();
});
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.list-leave-active {
  position: absolute;
}
</style>
