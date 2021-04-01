import Vue from "vue";
import Router from "vue-router";
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: () =>
        import(/* webpackChunkName:'index'*/ "@/pages/index/index"),
      children: [
        {
          path: "/index",
          name: "info",
          component: () =>
            import(/* webpackChunkName:'info'*/ "@/pages/info/info")
        },
        {
          path: "/jobs",
          name: "jobs",
          component: () =>
            import(/* webpackChunkName:'jobs'*/ "@/pages/jobs/jobs")
        },
        {
          path: "/jobsDetails",
          name: "jobsDetails",
          component: () =>
            import(
              /* webpackChunkName:'jobDetails'*/ "@/pages/jobDetails/jobDetails"
            )
        },
        {
          path: "/blog",
          name: "blog",
          component: () =>
            import(/* webpackChunkName:'blog'*/ "@/pages/blog/blog")
        },
        {
          path: "/service",
          name: "service",
          component: () =>
            import(/* webpackChunkName:'service'*/ "@/pages/service/service")
        },
        {
          path: "/settleInHome",
          name: "settleInHome",
          component: () =>
            import(
              /* webpackChunkName:'settleInHome'*/ "@/pages/settleInHome/settleInHome"
            ),
          children: [
            {
              path: "/myResume",
              name: "myResume",
              component: () =>
                import(
                  /* webpackChunkName:'myResume'*/ "@/pages/myResume/myResume"
                )
            },
            {
              path: "/toExaminePage",
              name: "toExaminePage",
              component: () =>
                import(
                  /* webpackChunkName:'toExaminePage'*/ "@/pages/toExaminePage/toExaminePage"
                )
            },
            {
              path: "/savedJobs",
              name: "savedJobs",
              component: () =>
                import(
                  /* webpackChunkName:'savedJobs'*/ "@/pages/savedJobs/savedJobs"
                )
            },
            {
              path: "/jobInvites",
              name: "jobInvites",
              component: () =>
                import(
                  /* webpackChunkName:'jobInvites'*/ "@/pages/jobInvites/jobInvites"
                )
            },
            {
              path: "/myInterview",
              name: "myInterview",
              component: () =>
                import(
                  /* webpackChunkName:'myInterview'*/ "@/pages/myInterview/myInterview"
                )
            }
          ]
        }
      ]
    },
    {
      path: "/firstStep",
      name: "firstStep",
      component: () =>
        import(/* webpackChunkName:'firstStep'*/ "@/pages/firstStep/firstStep")
    },
    {
      path: "/secondStep",
      name: "secondStep",
      component: () =>
        import(
          /* webpackChunkName:'secondStep'*/ "@/pages/secondStep/secondStep"
        )
    },
    {
      path: "/thirdStep",
      name: "thirdStep",
      component: () =>
        import(/* webpackChunkName:'thirdStep'*/ "@/pages/thirdStep/thirdStep")
    },
    {
      path: "/welcome",
      name: "welcome",
      component: () =>
        import(/* webpackChunkName:'welcome'*/ "@/pages/welcome/welcome")
    },

    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName:'register'*/ "@/pages/register/register.vue")
    },
    {
      path: "/realTimeCall",
      name: "realTimeCall",
      component: () =>
        import(
          /* webpackChunkName:'realTimeCall'*/ "@/pages/realTimeCall/realTimeCall.vue"
        )
    }
  ]
});
