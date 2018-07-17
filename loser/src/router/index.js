import Vue from 'vue'
import Router from 'vue-router'
import Loser from '@/components/Loser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Loser',
      component: Loser
    }
  ]
})
