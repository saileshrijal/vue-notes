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
          <div class="container-fluid my-1 bg-dark p-2 rounded text-white" v-for="(note) in notes" :key="note.id">
            <div class="row">
              <div class="col-8 d-flex flex-column align-items-start justify-content-center">
                <h4>{{ note.title }}</h4>
                <p>{{ note.description }}</p>
              </div>
              <div class="col-4 d-flex flex-column align-items-end justify-content-center gap-2">
                <div>
                  <li style="font-size: 10px;"
                    class="text-uppercase fw-bold bg-white d-inline-block rounded text-black px-2 py-1">{{
                      note.category.title
                    }}</li>
                </div>
                <div class="">
                  <button class="btn btn-sm btn-primary" @click="onEdit(note.id)">
                    Edit
                  </button>
                  |
                  <button class="btn btn-sm btn-danger" @click="onDelete(note.id)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
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
