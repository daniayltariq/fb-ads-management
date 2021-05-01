import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const prefix = '/admin/manage';
const routes = [

	  {
      path: prefix+'/dashboard',
      name: 'dashboard',
      component: () => import('./views/dashboard.vue')
    },

    {
      path: prefix+'/customers',
      name: 'customer.index',
      component: () => import('./views/Customer/index.vue')
    },

    {
      path: prefix+'/pricing',
      name: 'pricing.index',
      component: () => import('./views/Pricing/index.vue')
    },

    {
      path: prefix+'/coupons',
      name: 'coupons.index',
      component: () => import('./views/Coupon/index.vue')
    },

];

export default new Router({
  mode:"history",
  routes
});