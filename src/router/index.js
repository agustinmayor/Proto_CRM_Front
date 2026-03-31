import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "../components/DashboardLayout.vue";

// Este componente lo creo despues
const Sales = () => import("../components/screens/Sales.vue");
const Inventory = () => import("../components/screens/Inventory.vue");
const Messages = () => import("../components/screens/Messages.vue");
const Settings = () => import("../components/screens/Settings.vue");
const Login = () => import("../components/login/Login.vue");

const EmployeeProfile = () => import("../components/screens/EmployeeProfile.vue");

const Help = () => import("../components/screens/Help.vue");

const ForgotPass = () => import("../components/login/ForgotPass.vue");
const EmailSent = () => import("../components/login/EmailSent.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/reset",
      name: "Reset Password",
      component: ForgotPass,
    },
    {
      path: "/reset/sentEmail",
      name: "Email Sent",
      component: EmailSent,
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      // todo lo que pongo en children va a aparecer al lado del sidebar
      children: [
        {
          path: "", // si la ruta es /dashboard cargo el Inventory por defecto
          name: "Inventory",
          component: Inventory,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/sales",
          name: "Sales",
          component: Sales,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/messages",
          name: "Messages",
          component: Messages,
          meta: { requiresAuth: true },
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings,
          meta: { requiresAuth: true },
        },
        {
          path: "/dashboard/sales/employee-profile",
          name: "Employee Profile",
          component: EmployeeProfile,
          meta: { requiresAuth: true },
        },
        {
          path: "/help",
          name: "Help",
          component: Help,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

export default router;
