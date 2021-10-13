import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import About from '../views/About.vue'
import Notifications from '../views/Notifications.vue'
import Configuration from '../views/Configuration'
import MyProfile from '../views/MyProfile.vue'
import Messages from '../views/Messages.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: Configuration
  },
  {
    path: '/user-page',
    name: 'My Profile',
    component: MyProfile
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  }
]

/*
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" '../views/About.vue')*/ 


const router = new VueRouter({
  routes
})

export default router
