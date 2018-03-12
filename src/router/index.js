import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

/* home */
const Home = _import('home/index')

/* dashboard */
const dashboard = _import('dashboard/index')

/* error page */
const Err404 = _import('404')

/* demo page */
const Form = _import('page/form')
const Table = _import('table/index')

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {path: '/', component: Home, hidden: true},
  {path: '/404', component: Err404, hidden: true},
  {path: '/authredirect', component: _import('login/authredirect'), hidden: true},
  {path: '/page/:pid', component: _import('page/index'), hidden: true, name: '内容页', meta: { title: ''}}
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{path: 'index', component: dashboard, name: '蜻蜓推', meta: {role: ['admin']}}]
  },

  {
    path: '/template',
    component: Layout,
    // redirect: '/list/index',
    name: '模板管理',
    icon: 'tubiao',
    // noDropdown: true,
    children: [
      {path: 'index', component: _import('template/index'), name: '模板列表', meta: {role: ['admin']}},
      {path: 'list', component: _import('template/list'), name: '样式列表', icon: 'zonghe'},
      {path: 'add', component: _import('template/add'), name: '添加模板', icon: 'zonghe', hidden: true},
      {path: 'update/:pid', component: _import('template/update'), name: '更新模板', icon: 'zonghe', hidden: true}
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]
