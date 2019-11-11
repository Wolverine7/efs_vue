import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
import Auth from '@/components/Auth'
import CustomerList from '@/components/CustomerList'
import CustomerCreate from '@/components/CustomerCreate'
import InvestmentList from '@/components/InvestmentList'
import InvestmentCreate from '@/components/InvestmentCreate'
import StockList from '@/components/StockList'
import StockCreate from '@/components/StockCreate'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/customer-list',
      name: 'CustomerList',
      component: CustomerList
    },
     {
      path: '/customer-list/:msg',
      name: 'CustomerUpdatedList',
      component: CustomerList
    },
    {
      path: '/customer-create',
      name: 'CustomerCreate',
      component: CustomerCreate
    },
    {
      path: '/customer-create/:pk',
      name: 'CustomerUpdate',
      component: CustomerCreate
    },

    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/investment-list',
      name: 'InvestmentList',
      component: InvestmentList
    },
    {
      path: '/investment-list/:msg',
      name: 'InvestmentUpdatedList',
      component: InvestmentList
    },
    {
      path: '/investment-create',
      name: 'InvestmentCreate',
      component: InvestmentCreate
    },
    {
      path: '/investment-create/:pk',
      name: 'InvestmentUpdate',
      component: InvestmentCreate
    },

    {
      path: '/stock-list',
      name: 'StockList',
      component: StockList
    },
    {
      path: '/stock-list/:msg',
      name: 'StockUpdatedList',
      component: StockList
    },
    {
      path: '/stock-create',
      name: 'StockCreate',
      component: StockCreate
    },
    {
      path: '/stock-create/:pk',
      name: 'StockUpdate',
      component: StockCreate
    }
  ]
})

