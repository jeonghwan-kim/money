import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home.vue'
import Add from './Add.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Home},
    {path: '/add', component: Add}
  ]
})
new Vue({
  router,
}).$mount('#app')
