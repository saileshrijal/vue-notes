<template>
  <div class="container mt-4">
    <h2 class="text-uppercase mb-4">List Of Categories</h2>
    <button class="btn btn-dark mb-4" @click="addClicked">Add Category</button>
    <div class="d-flex justify-content-center" v-if="data.length">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Category title</th>
            <th>Description</th>
            <th>Created On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in currentPageData" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.createdOn }}</td>
            <td>
              <button class="btn btn-danger" @click="deleteItem(item.id)">
                Delete
              </button>
              <button class="btn btn-primary mx-2" @click="editItem(item.id)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-center" v-else>No data available</div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-secondary mr-2" @click="prevPage">Previous</button>
      <span class="mx-2">
        Showing page {{ currentPage }} of {{ totalPages }}
      </span>
      <button class="btn btn-secondary ml-2" @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import router from "@/router";
import swal from "sweetalert2";
export default {
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      data: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    currentPageData() {
      let start = (this.currentPage - 1) * this.itemsPerPage;
      let end = start + this.itemsPerPage;
      return this.data.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.data.length / this.itemsPerPage);
    },
  },
  methods: {
    fetchData() {
      axios
        .get("https://localhost:44385/api/Category/GetAll")
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          swal.fire({
            title: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    },
    deleteItem(id) {
      axios
        .delete(`https://localhost:44385/api/Category/Delete?id=${id}`)
        .then((response) => {
          this.fetchData();
          swal.fire({
            position: "bottom-end",
            icon: "success",
            title: "Your category has been deleted",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          swal.fire({
            title: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    },
    editItem(id) {
      router.push({ path: `category/edit/${id}` });
    },
    addClicked() {
      router.push({ path: "category/add" });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>
