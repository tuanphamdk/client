  import { createRouter, createWebHistory } from "vue-router";

  import Words from "./views/Words.vue";
  import Show from "./views/Show.vue";
  import New from "./views/New.vue";
  import Edit from "./views/Edit.vue";
  import About from "./views/About.vue";
  import Login from "./views/Login.vue";
  import Register from "./views/Register.vue";
  import Personal from "./views/Personal.vue";
  import VocabTest from "@/views/Vocabtest.vue";
  import VocabMC from  "@/views/VocabMC.vue";






  const routes = [
    { path: '/', redirect: '/About' },

    { path: '/words', name: 'Words', component: Words },
    { path: '/words/new', name: 'New', component: New },
    { path: '/words/show/:id', name: 'Show', component: Show },
    { path: '/words/edit/:id', name: 'Edit', component: Edit },

    { path: '/about', name: 'About', component: About },

    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/personal', name: 'Personal', component: Personal },
    { path: "/test", name: "Test", component: VocabTest },
    { path: "/testMC", name: "TestMC", component: VocabMC }

  ];

  const router = createRouter({
    history: createWebHistory(),
    routes
  });

  // ===== Route Guard =====
  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const protectedRoutes = ['/words', '/words/new', '/words/show', '/words/edit', '/personal'];

    if (protectedRoutes.some(path => to.path.startsWith(path)) && !token) {
      next('/login'); // chưa login → chuyển hướng login
    } else {
      next(); // đã login hoặc route không protected
    }
  });




  export default router;
