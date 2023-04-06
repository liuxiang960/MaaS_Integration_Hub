import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/* Layout */
import Layout from "@/layout"

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
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true
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
        meta: { title: "leftbar.home", icon: "home", affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: "/application",
    component: Layout,
    redirect: "/application/page",
    alwaysShow: true, // will always show the root menu
    name: "application",
    meta: {
      title: "leftbar.integration.title",
      icon: "app",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/appManager/index"),
        name: "PagePermiss",
        meta: {
          title: "leftbar.integration.subtitle",

          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "newApp",
        component: () => import("@/views/appManager/newApp"),
        name: "newApp",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "leftbar.operation.subtitle7"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "integrationFlow",
        component: () => import("@/views/apiManager/integration"),
        name: "integrationFlow",
        alwaysShow: false, // will always show the root menu

        meta: {
          title: "leftbar.operation.subtitle6"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "newIntegration",
        component: () => import("@/views/apiManager/newIntegration"),
        name: "newIntegration",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "leftbar.operation.subtitle6"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "process",
        component: () => import("@/views/apiManager/process"),
        name: "process",
        alwaysShow: false, // will always show the root menu
        hidden: true,
        meta: {
          title: "leftbar.operation.subtitle6"
          // if do not set roles, means: this page does not require permission
        }
      },

      {
        path: "apiManager",
        component: () => import("@/views/apiManager/index"),
        name: "apiManager",
        meta: {
          title: "leftbar.integration.subtitle1"
          // if do not set roles, means: this page does not require permission
        }
      },

      {
        path: "newApiServe",
        component: () => import("@/views/apiManager/newApiServe"),
        name: "newApiServe",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "leftbar.integration.subtitle1"
          // if do not set roles, means: this page does not require permission
        }
      },

      {
        path: "newApi",
        component: () => import("@/views/apiManager/newApi"),
        name: "newApi",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "manager.title"
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: "newApiList",
        component: () => import("@/views/apiManager/newApiList"),
        name: "newApiList",
        alwaysShow: false, // will always show the root menu
        hidden: true,

        meta: {
          title: "manager.title1"
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: "/operation",
    component: Layout,
    redirect: "/operation/page",
    alwaysShow: true, // will always show the root menu
    name: "operation",
    meta: {
      title: "leftbar.operation.title",
      icon: "monitoring_center",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "monitoring",
        component: () => import("@/views/dashboard/index"),
        name: "monitoring",
        meta: {
          title: "leftbar.operation.subtitle" // if do not set roles, means: this page does not require permission
        }
      },

      {
        path: "dayRecorDetail",
        component: () => import("@/views/operation/dayRecorDetail"),
        name: "dayRecorDetail",
        hidden: true,
        meta: {
          title: "leftbar.operation.subtitle",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },
      {
        path: "strategy",
        component: () => import("@/views/operation/strategy"),
        name: "strategy",
        meta: {
          title: "leftbar.operation.subtitle5",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      },

      {
        path: "dayRecord",
        component: () => import("@/views/operation/dayRecord"),
        name: "dayRecord",
        meta: {
          title: "leftbar.operation.subtitle4"
          // if do not set roles, means: this page does not require permission
        }
      },
      // {
      //   path: "page",
      //   component: () => import("@/views/operation/index"),
      //   name: "PagePermission",

      //   meta: {
      //     title: "告警历史",
      //     roles: ["admin"], // or you can only set roles in sub nav
      //   },
      // },

      {
        path: "newStrategy",
        component: () => import("@/views/operation/newStrategy"),
        hidden: true,
        name: "newStrategy",
        meta: {
          title: "leftbar.operation.subtitle3",

          roles: ["admin"] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "manager",
    meta: {
      title: "leftbar.manager.title",
      icon: "manager",
      roles: ["admin", "editor"] // you can set roles in root nav
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/manager/index"),
        name: "user",
        meta: {
          title: "leftbar.manager.subtitle"
        }
      },

      {
        path: "config",
        component: () => import("@/views/manager/config"),
        name: "config",
        meta: {
          title: "leftbar.manager.subtitle2"
        }
      },
      {
        path: "log",
        component: () => import("@/views/manager/logManager"),
        name: "log",
        meta: {
          title: "leftbar.operation.subtitle8",
          roles: ["admin"] // or you can only set roles in sub nav
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
