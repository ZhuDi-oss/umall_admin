import axios from 'axios'
import qs from 'qs'
import store from "../store"
import router from "../router"
let baseUrl = '/api'

//请求拦截
axios.interceptors.request.use(config => {
    //登录
    if (config.url == baseUrl + "/api/userlogin") {
        return config;
    }

    config.headers.authorization = store.state.user.info.token;
    return config;
})


// 响应拦截
axios.interceptors.response.use(res => {
    console.group("====本次请求的地址是：" + res.config.url + "======");
    console.log(res)
    console.groupEnd();
    if (res.data.msg === "登录已过期或访问权限受限") {
        alert("登录已过期或访问权限受限")
        //清空info
        store.dispatch("user/changeInfoAction", {})
        //跳转到登录 
        router.push("/login")
    }
    return res
})



// *************************************menu******************************

// 添加菜单
export const reqAddMenu = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(form)
    })
}

// 菜单列表
export const reqMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}

// 菜单详情
export const reqMenuDetail = (params) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: params
    })
}

// 菜单修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//菜单删除 params={id:1}
export const reqMenuDel = (params) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(params)
    })
}



// **************************************role***********************************

// 角色添加
export const reqRoleAdd = (aa) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "POST",
        data: qs.stringify(aa)
    })
}

// 角色列表
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",

    })
}

//角色详情
export const reqRoleDetail = (params) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: params
    })
}

//角色修改
export const reqRoleUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//角色删除 params={id:1}
export const reqRoleDel = (params) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify(params)
    })
}

// **************************************manage***********************************
//管理员添加
export const reqUserAdd = (form) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(form)
    })
}

//管理员列表
export const reqUserList = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params
    })
}

//管理员详情
export const reqUserDetail = (params) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: params
    })
}

//管理员修改
export const reqUserUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(form)
    })
}

//管理员删除 params={id:1}
export const reqUserDel = (params) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

//用户总数
export const reqUserNum = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}


/*----------------------分类开始---------------------------------*/

//分类添加
export const reqCateAdd = (form) => {
    //{z:1,a:2,v:4,d:file}
    var data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}

//分类列表
export const reqCateList = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params
    })
}

//分类详情
export const reqCateDetail = (params) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: params
    })
}

//分类修改
export const reqCateUpdate = (form) => {
    var data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}

//分类删除 params={id:1}
export const reqCateDel = (params) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(params)
    })
}
/*----------------------分类结束----------------------------------*/

//规格添加
export const reqspecsAdd = (form) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(form)
    })
}

// 规格总数
export const reqspecscount = (params) => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
        params
    })
}

//规格列表
export const reqspecsList = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params
    })
}

//规格详情
export const reqspecsDetail = (params) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: params
    })
}

//规格修改
export const reqspecsUpdate = (form) => {

    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//规格删除 params={id:1}
export const reqspecsDel = (params) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
/*----------------------规格结束----------------------------------*/

/*----------------------轮播开始----------------------------------*/

//轮播添加
export const reqBannerAdd = (form) => {
    var data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}

// 轮播列表
export const reqBannerList = (params) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params: params
    })
}

//轮播图获取（一条）
export const reqBannerDetail = (params) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: params
    })
}

//轮播修改
export const reqBannerUpdate = (form) => {
    var data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}

//轮播删除 params={id:1}
export const reqBannerDel = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

/*----------------------轮播结束----------------------------------*/


/*----------------------商品管理开始----------------------------------*/

//商品添加
export const reqGoodsAdd = (form) => {
    var data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data
    })
}

// 商品列表
export const reqGoodsList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品获取（一条）
export const reqGoodsDetail = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: params
    })
}


//商品修改
export const reqGoodsUpdate = (form) => {
    let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}

//商品删除 params={id:1}
export const reqGoodsDel = (params) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify(params)
    })
}
// 商品总数
export const reqGoodsNum = () => {
    return axios({
        url: baseUrl + '/api/goodscount',
        method: 'get',

    })

}

/*----------------------轮播结束----------------------------------*/

/*----------------------会员管理开始----------------------------------*/
// 会员列表
export const reqMberList = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}

//会员获取（一条）
export const reqMberDetail = (params) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: params
    })
}

//会员修改
export const reqMberUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(form)
    })
}
/*----------------------会员管理结束----------------------------------*/




/*----------------------登录开始----------------------------------*/

// 管理员登录
export const reqUserLogin = (form) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(form)
    })
}

/*----------------------登录结束----------------------------------*/


/*----------------------秒杀开始----------------------------------*/

//秒杀添加
export const reqKillAdd = (form) => {

    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(form)
    })
}

//秒杀列表
export const reqKillList = (params) => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
        params
    })
}

//秒杀详情
export const reqKillDetail = (params) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: params
    })
}

//秒杀修改
export const reqKillUpdate = (form) => {

    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(form)
    })
}

//秒杀删除 params={id:1}
export const reqKillDel = (params) => {
    return axios({
        url: baseUrl + "api/seckdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

/*----------------------秒杀结束----------------------------------*/