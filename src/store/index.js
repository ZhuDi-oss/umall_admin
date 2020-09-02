import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import { state, mutations, getters } from './mutations'
import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import spec from './modules/spec'
import banner from './modules/banner'
import goods from './modules/goods'
import mber from './modules/mber'
import user from './modules/user'
import seckill from './modules/seckill'


export default new Vuex.Store({
    actions,
    state,
    mutations,
    getters,
    modules: {
        menu,
        role,
        manage,
        cate,
        spec,
        banner,
        goods,
        mber,
        user,
        seckill
    }

})