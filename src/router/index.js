import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
import componentsRouter from "./modules/components";
import chartsRouter from "./modules/charts";
import tableRouter from "./modules/table";
import nestedRouter from "./modules/nested";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/flowDesign",
    component: () => import("../components/FlowDesign/Index"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index"),
        name: "home",
        meta: { title: "leftbar.home", icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: "/index",
  //   component: Layout,
  //   redirect: "/dashboard",
  //   hidden: true,

  //   children: [
  //     {
  //       path: "dashboard",
  //       component: () => import("@/views/dashboard/index"),
  //       name: "Dashboard",
  //       meta: { title: "leftbar.home", icon: "dashboard", affix: true },
  //     },
  //   ],
  // },

  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/application",
    component: Layout,
    redirect: "/application/page",
    alwaysShow: true, // will always show the root menu
    name: "application",
    meta: {
      title: "leftbar.integration.title",
      icon: "peoples",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/application/index"),
        name: "PagePermission",
        meta: {
          title: "leftbar.integration.subtitle",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "apiManager",
        component: () => import("@/views/apiManager/index"),
        name: "apiManager",
        meta: {
          title: "leftbar.integration.subtitle1",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "newApiServe",
        component: () => import("@/views/apiManager/newApiServe"),
        name: "newApiServe",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "leftbar.integration.subtitle1",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "newApi",
        component: () => import("@/views/apiManager/newApi"),
        name: "newApi",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "manager.title",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "newApiList",
        component: () => import("@/views/apiManager/newApiList"),
        name: "newApiList",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "manager.title1",
          // if do not set roles, means: this page does not require permission
        },
      },
    ],
  },
  {
    path: "/operation",
    component: Layout,
    redirect: "/operation/page",
    alwaysShow: true, // will always show the root menu
    name: "operation",
    meta: {
      title: "leftbar.operation.title",
      icon: "international",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/operation/index"),
        name: "PagePermission",
        meta: {
          title: "leftbar.operation.subtitle",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "dayRecord",
        component: () => import("@/views/operation/dayRecord"),
        name: "dayRecord",
        meta: {
          title: "leftbar.operation.subtitle1",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "alarmPage",
        component: () => import("@/views/operation/alarmPage"),
        name: "alarmPage",
        meta: {
          title: "leftbar.operation.subtitle2",
          // if do not set roles, means: this page does not require permission
        },
      },
    ],
  },
  {
    path: "/permission2",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "manager",
    meta: {
      title: "leftbar.manager.title",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "leftbar.manager.subtitle",
          roles: ["admin"],
        },
      },
      // {
      //   path: "directive4",
      //   component: () => import("@/views/permission/directive"),
      //   name: "DirectivePermission",
      //   meta: {
      //     title: "leftbar.manager.subtitle1",
      //     // if do not set roles, means: this page does not require permission
      //   },
      // },
      {
        path: "config",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "leftbar.manager.subtitle2",
          roles: ["admin"],
        },
      },
    ],
  },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,

  // {
  //   path: "/tab",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/tab/index"),
  //       name: "Tab",
  //       meta: { title: "Tab", icon: "tab" },
  //     },
  //   ],
  // },

  // {
  //   path: "/error",
  //   component: Layout,
  //   redirect: "noRedirect",
  //   name: "ErrorPages",
  //   meta: {
  //     title: "Error Pages",
  //     icon: "404",
  //   },
  //   children: [
  //     {
  //       path: "401",
  //       component: () => import("@/views/error-page/401"),
  //       name: "Page401",
  //       meta: { title: "401", noCache: true },
  //     },
  //     {
  //       path: "404",
  //       component: () => import("@/views/error-page/404"),
  //       name: "Page404",
  //       meta: { title: "404", noCache: true },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
