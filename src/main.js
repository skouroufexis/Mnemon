import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import Login from './components/Login';

import Register from './components/Register'
import Main from './components/Main'





Vue.use(VueRouter);





const routes = [
  {path:'/',component:Main,props:{title:'Main',}},
  {path:'/login',component:Login,props:{title:'Login'}},
  {path:'/register',component:Register,props:{title:'Register'}},
]
const router = new VueRouter({
  routes,
  mode:'history'
})




Vue.config.productionTip = false

new Vue({
  router:router,

  
  render: h => h(App),

  

}).$mount('#app')




