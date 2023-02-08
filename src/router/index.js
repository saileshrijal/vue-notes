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
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/authStore'

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
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  const authStore = useAuthStore()
  authStore.isAuthenticated = loggedIn == null ? false : true
  if (authStore.isAuthenticated) {
    authStore.getLoggedInUser()
  }
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
  if (authRequired) {
    next('/login');
  } else {
    next();
  }
  if (loggedIn != null) {
    if (to.path == '/login' || to.path == '/register') {
      router.push('/note');
    }
  } else {
    next()
  }
})

export default router;
