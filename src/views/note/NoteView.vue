<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-6">
        <h2 class="text-uppercase">List Of Notes</h2>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-dark" @click="addClicked">Add Notes</button>
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
                <th scope="col">Category</th>
                <th scope="col">Created On</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(note, index) in notes" :key="note.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ note.title }}</td>
                <td>{{ note.description }}</td>
                <td>{{ note.category.title }}</td>
                <td>{{ note.createdOn }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="onEdit(note.id)"
                  >
                    Edit
                  </button>
                  |
                  <button
                    class="btn btn-sm btn-danger"
                    @click="onDelete(note.id)"
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
const notes = ref([]);

const getNotes = async () => {
  try {
    const response = await axios.get("https://localhost:44385/api/Note/GetAll");
    if (response.status === 200) {
      notes.value = response.data;
      // console.log(response.data);
    } else {
      swal.fire({
        title: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (err) {
    swal.fire({
      title: err.messsage,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

const addClicked = () => {
  router.push({ path: "note/add" });
};

const onDelete = async (id) => {
  try {
    const response = await axios.delete(
      `https://localhost:44385/api/Note/Delete?id=${id}`
    );
    if (response.status === 200) {
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your note has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      await getNotes();
    } else {
      swal.fire({
        title: "something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (err) {
    swal.fire({
      title: err.messsage,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

const onEdit = (id) => {
  router.push({ path: `note/edit/${id}` });
};

onMounted(async () => {
  await getNotes();
});
</script>
