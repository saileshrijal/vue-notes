import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";

import CategoryView from "@/views/category/CategoryView.vue";
import AddCategory from "@/views/category/AddCategory.vue";
import EditCategory from "@/views/category/EditCategory.vue";
import NotFound from "@/views/NotFound.vue";
import NoteView from "@/views/note/NoteView.vue";
import AddNote from "@/views/note/AddNote.vue";
import EditNote from "@/views/note/EditNote.vue";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/category",
    name: "category",
    component: CategoryView,
  },
  {
    path: "/category/add",
    name: "addCategory",
    component: AddCategory,
  },
  {
    path: "/category/edit/:id",
    name: "editCategory",
    component: EditCategory,
  },

  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/note",
    name: "note",
    component: NoteView,
  },
  {
    path: "/note/add",
    name: "addNote",
    component: AddNote,
  },
  {
    path: "/note/edit/:id",
    name: "noteCategory",
    component: EditNote,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
