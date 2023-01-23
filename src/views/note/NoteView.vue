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
                <th scope="col">Category Id</th>
                <th scope="col">Created On</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(note, index) in notes" :key="note.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ note.title }}</td>
                <td>{{ note.description }}</td>
                <td>{{ note.categoryId }}</td>
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
const notes = ref([]);

const getNotes = async () => {
  const response = await axios.get("https://localhost:44385/api/Note/GetAll");
  console.log(response);
  notes.value = response.data;
};

const addClicked = () => {
  router.push({ path: "note/add" });
};

const onDelete = async (id) => {
  const response = await axios.delete(
    `https://localhost:44385/api/Note/Delete?id=${id}`
  );
  if (response.status === 200) {
    await getNotes();
  }
};

const onEdit = (id) => {
  router.push({ path: `note/edit/${id}` });
};

onMounted(async () => {
  await getNotes();
});
</script>
