import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import firebase from 'firebase';

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  //Check if route requires auth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //Check if not logged in
    if(!firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    //Is logged
    } else {
      //Proceed to route
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
     //Check if logged in
     if(firebase.auth().currentUser) {
      //Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      //Proceed to route
      next();
    }
  } else {
    //Proceed to route
    next();
  }
})

export default router;