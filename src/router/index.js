import Vue from 'vue'
import Router from 'vue-router'
import store from "../store"

const login = () => import("../pages/login/login.vue")
const index = () => import("../pages/index/index.vue")
const home = () => import("../pages/home/home")
const menu = () => import("../pages/menu/menu")
const role = () => import("../pages/role/role")
const manage = () => import("../pages/manage/manage")
const classify = () => import("../pages/classify/classify")
const spec = () => import("../pages/spec/spec")
const goods = () => import("../pages/goods/goods")
const banner = () => import("../pages/banner/banner")
const member = () => import("../pages/member/member")
const seckill = () => import("../pages/seckill/seckill")

//路由独享守卫判断
function beforeEnter(url, next) {
  store.state.user.info.menus_url.some(item => item == url) ? next() : next("/")
}


//首页下面的二级路由规则
export const indexRoutes = [
  {
    path: "menu",
    component: menu,
    name: "菜单管理",
    beforeEnter(to, from, next) {
      beforeEnter("/menu", next)
    }
  },
  {
    path: "role",
    component: role,
    name: "角色管理",
    beforeEnter(to, from, next) {
      beforeEnter("/role", next)
    }
  },
  {
    path: "manage",
    component: manage,
    name: "管理员管理",
    beforeEnter(to, from, next) {
      beforeEnter("/manage", next)
    }
  },
  {
    path: "classify",
    component: classify,
    name: "商品分类",
    beforeEnter(to, from, next) {
      beforeEnter("/classify", next)
    }
  },
  {
    path: "spec",
    component: spec,
    name: "商品规格",
    beforeEnter(to, from, next) {
      beforeEnter("/spec", next)
    }
  },
  {
    path: "goods",
    component: goods,
    name: "商品管理",
    beforeEnter(to, from, next) {
      beforeEnter("/goods", next)
    }
  },
  {
    path: "banner",
    component: banner,
    name: "轮播图管理",
    beforeEnter(to, from, next) {
      beforeEnter("/banner", next)
    }
  },
  {
    path: "member",
    component: member,
    name: "会员管理",
    beforeEnter(to, from, next) {
      beforeEnter("/member", next)
    }
  },
  {
    path: "seckill",
    component: seckill,
    name: "秒杀活动",
    beforeEnter(to, from, next) {
      beforeEnter("/seckill", next)
    }
  },

]


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: login },
    {
      path: '/', component: index,
      children: [
        { path: '', component: home },
        ...indexRoutes
      ]


    },

  ]
})

// 登录拦截
router.beforeEach((to, from, next) => {
  // 如果去的是登录就进去
  if (to.path == '/login') {
    next();
    return;
  }
  // 判断是否登录过，登录过了就next
  if (store.state.user.info.id) {
    next()
    return
  }

  //去的不是登录，也没有登录过
  next('/login')
})

export default router
