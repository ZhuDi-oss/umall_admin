<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名称" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqUserAdd,
  reqUserDetail,
  reqUserUpdate,
} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      width: "100px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      reqRoleList: "role/reqListAction",
      reqUserList: "manage/reqListAction",
      reqTotal: "manage/reqListNum",
    }),

    //弹框消失
    close() {
      !this.info.isAdd && this.empty();
    },

    //点击了取消
    cancel() {
      this.info.isShow = false;
    },

    //数据重置
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },

    //点击了添加按钮
    add() {
      reqUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          alert("添加成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.empty();
          //刷新角色列表的数据
          this.reqUserList();
          this.reqTotal();
        } else {
          alert(res.data.msg);
        }
      });
    },

    //查看详情
    look(id) {
      reqUserDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },

    //修改
    update() {
      reqUserUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          alert("修改成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.empty();
          //刷新角色列表的数据
          this.reqUserList();
        } else {
          alert(res.data.msg);
        }
      });
    },

  },
  mounted() {
    //如果menuList数组是个空的，要发起请求得到
    if (this.roleList.length == 0) {
      this.reqRoleList();
    }
  },
};
</script>

<style>
</style>