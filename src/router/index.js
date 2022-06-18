import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserPanel from '../views/UserPanel.vue'
import EditUser from '../views/EditUser.vue'
import AdminPanel from '../views/AdminPanel.vue'
import PuntajePanel1 from '../views/PuntajePanel1.vue'
import PuntajePanel2 from '../views/PuntajePanel2.vue'
import GameOne from '../views/GameOne.vue'
import GameTwo from '../views/GameTwo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Register
  },
  {
    path: '/userPanel',
    name: 'userPanel',
    component: UserPanel
  },
  {
    path: '/puntajePanel1',
    name: 'puntajePanel1',
    component: PuntajePanel1
  },
  {
    path: '/puntajePanel2',
    name: 'puntajePanel2',
    component: PuntajePanel2
  },
  {
    path: '/gameone',
    name: 'gameone',
    component: GameOne
  },
  {
    path: '/gametwo',
    name: 'gametwo',
    component: GameTwo
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: EditUser
  },
  {
    path: '/adminPanel',
    name: 'adminPanel',
    component: AdminPanel
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

