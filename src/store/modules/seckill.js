import { reqKillList } from '../../util/request'

const state = {
    list: []
}

const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}

const actions = {
    // 请求
    reqListAction(context) {
        reqKillList().then(res => {
            let arr = res.data.list ? res.data.list : []
            context.commit("changeList", arr)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}