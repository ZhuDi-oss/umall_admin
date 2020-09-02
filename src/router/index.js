import Vue from 'vue'
import Router from 'vue-router'

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

//首页下面的二级路由规则
export const indexRoutes = [
  {
    path:"menu",
    component:menu,
    name:"菜单管理"
  },
  {
    path:"role",
    component:role,
    name:"角色管理"
  },
  {
    path:"manage",
    component:manage,
    name:"管理员管理"
  },
  {
    path:"classify",
    component:classify,
    name:"商品分类"
  },
  {
    path:"spec",
    component:spec,
    name:"商品规格"
  },
  {
    path:"goods",
    component:goods,
    name:"商品管理"
  },
  {
    path:"banner",
    component:banner,
    name:"轮播图管理"
  },
  {
    path:"member",
    component:member,
    name:"会员管理"
  },
  {
    path:"seckill",
    component:seckill,
    name:"秒杀活动"
  },

]


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', component: login },
    {
      path: '/', component: index,
     children:[
       {path:'',component:home},
       ...indexRoutes
     ]


    },

  ]
})
