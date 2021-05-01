import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [

	  {
      path: '/app/dashboard',
      name: 'dashboard',
      component: () => import('./Views/dashboard.vue')
    },

    {
      path: '/app/comming-soon',
      name: 'comingsoon',
      component: () => import('./Views/coming-soon.vue')
    },

    {
      path: '/app/user/setting',
      name: 'user.setting',
      component: () => import('./Views/User/settings.vue')
    },
  
    {
      path: '/app/integration',
      name: 'user.integration',
      component: () => import('./Views/User/integration.vue')
    },

    {
      path: '/app/integration/facebook',
      name: 'user.integration.facebook',
      component: () => import('./Views/User/facebook.vue')
    },

    {
      path: '/app/automation/accounts',
      name: 'automation.accounts',
      component: () => import('./Views/Account/index.vue')
    },

    {
      path: '/app/automation/adaccounts',
      name: 'automation.adaccounts',
      component: () => import('./Views/AdAccount/adaccount.vue')
    },

    {
      path: '/app/automation/ad_compaigns',
      name: 'automation.ad_compaigns',
       props: true,
      component: () => import('./Views/Campaign/campaigns.vue')
    },

    {
       path: '/app/automation/rules',
       name: 'automation.rules',
       props: true,
      component: () => import('./Views/Rules/Index.vue')
    },

    {
      path: '/app/automation/rule_setting',
      name: 'automation.rule_setting',
      component: () => import('./Views/Rules/rule_form.vue')
    },

    {
      path: '/app/automation/:campaign/adsets',
      name: 'automation.adsets',
      component: () => import('./Views/Adset/adsets.vue')
    },

    {
      path: '/app/billing/plans',
      name: 'billing.plans',
      component: () => import('./Views/Billing/plans.vue')
    },

    {
      path: '/app/helpcenter',
      name: 'helpcenter.index',
      component: () => import('./Views/HelpCenter/index.vue')
    },


    // Team
    {
      path: '/app/team/index',
      name: 'team.index',
      props: true,
      component: () => import('./Views/Team/index.vue')
    },
];

export default new Router({
  mode:"history",
  routes
})