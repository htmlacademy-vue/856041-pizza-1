import { auth, isLoggedIn } from "@/middlewares";
export default [
  {
    path: "/",
    name: "IndexMain",
    component: () => import("@/views/Index.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/login",
        name: "LoginIndex",
        component: () => import("@/views/Login.vue"),
        meta: {
          layout: "AppLayoutDefault",
          middlewares: [isLoggedIn],
        },
      },
    ],
  },
  {
    path: "/cart",
    name: "CartIndex",
    component: () => import("@/views/Cart.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "OrdersIndex",
    component: () => import("@/views/Orders.vue"),
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth],
    },
  },
  {
    path: "/profile",
    name: "ProfileIndex",
    component: () => import("@/views/Profile.vue"),
    meta: {
      layout: "AppLayoutMain",
      middlewares: [auth],
    },
  },
];
