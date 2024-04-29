import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '../components/MainMenu.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainMenu,
  },
]

const router = new Router({
  routes,
});

export default router