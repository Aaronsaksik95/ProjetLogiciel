import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Compte from '../views/Compte.vue'
import Logout from '../components/Logout.vue'
import Avancement from '../components/Avancement.vue'
import Redirect from '../components/redirect.vue'
import Instruction from '../views/Instruction.vue'
import Niveau from '../views/Niveau.vue'
import Admin from '../views/Admin.vue'
import Users from '../views/Users.vue'
import UpdateNiveau from '../views/UpdateNiveau.vue'
import UpdateUser from '../views/UpdateUser.vue'
import AddNiveau from '../views/AddNiveau.vue'
import Authentication from '../views/Authentication.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: Game
  },
  {
    path: '/redirect/:id',
    name: 'Redirect',
    component: Redirect
  },
  {
    path: '/niveau',
    name: 'Niveau',
    component: Niveau
  },
  {
    path: '/instruction',
    name: 'Instruction',
    component: Instruction
  },
  {
    path: '/compte/:id',
    name: 'Compte',
    component: Compte
  },
  {
    path: '/avancement/:id',
    name: 'Avancement',
    component: Avancement
  },
  {
    path: '/addNiveau',
    name: 'AddNiveau',
    component: AddNiveau
  },
  {
    path: '/updateNiveau/:id',
    name: 'UpdateNiveau',
    component: UpdateNiveau
  },
  {
    path: '/updateUser/:id',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
