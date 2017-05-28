import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from './App.vue'

Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Home},
    {path: '/foo', component: Foo}
  ]
})
new Vue({
  router,
}).$mount('#app')
