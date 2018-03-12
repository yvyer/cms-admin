import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { removeToken } from '@/utils/auth' // 验权
import { getTitle } from '@/api/page';

const whiteList = ['/', '/authredirect', '/404']
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else if(to.path.slice(0,6) === '/page/') {
      getTitle(to.params.pid).then(response => {
        document.title = response.data.data.title;
      })
      next()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.role
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to })
          })
        }, error => {
          removeToken()
          next('/')
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else if(to.path.slice(0,6) === '/page/') {
      getTitle(to.params.pid).then(response => {
        document.title = response.data.data.title;
      })
      next()
    } else {
      next('/')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
