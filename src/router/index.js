import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  useAuthStore
} from '@/stores/auth'
// import Cookie from "js-cookie";
// import axios from "axios";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      redirect: '/login'
    },
    // Public Children
    {
      path: '/login',
      name: 'login',
      children: [{
        path: '',
        name: 'home',
        component: () => import('../views/TheLoginView.vue')
      }]
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'admin-home',
        component: () => import('../views/admin/IndexView.vue')
      }]
    },

    {
      path: '/blank',
      name: 'blank',
      component: () => import('../layouts/BlankLayout.vue'),
      children: [{
        path: '',
        name: 'blank',
        component: () => import('../views/Blank.vue')
      }]
    },
    {
      path: '/admin/book/list',
      name: 'book_list',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'book_list',
        component: () => import('../views/admin/book/List.vue')
      }]
    },
    {
      path: '/admin/book/manage',
      name: 'manage_book',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'book_manage_list',
        component: () => import('../views/admin/book/Manage.vue')
      }]
    },
    {
      path: '/admin/booking/manage',
      name: 'manage_booking',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'booking_manage_list',
        component: () => import('../views/admin/booking/Manage.vue')
      }]
    },
    {
      path: '/admin/booking/create',
      name: 'booking_form_create',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'booking_creates',
        component: () => import('../views/admin/booking/Create.vue')
      }]
    },

    {
      path: '/user',
      name: 'user',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'user-home',
        component: () => import('../views/user/IndexView.vue')
      }]
    },
  ]
})

//   const token = Cookie.get("auth.token");

//   if (to.name === "login" && token) {
//     next({
//       name: "admin-home"
//     });
//   } else if (
//     to.name !== "login" &&
//     to.name !== "home" &&
//     to.name !== "detail" &&
//     !token
//   ) {
//     next({
//       name: "login"
//     });
//   } else {
//     next();
//   }

export default router