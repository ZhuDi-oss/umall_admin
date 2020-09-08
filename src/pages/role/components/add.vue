<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="info.isShow" @closed="close('form')">
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth" prop="menus">
          <el-tree ref="tree" :data="menuList" show-checkbox node-key="id" :props="defaultProps"></el-tree>
        </el-form-item>
        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="enter('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (this.$refs.tree.getCheckedKeys().length <= 0) {
        return callback(new Error("选项不能为空"));
      } else {
        callback();
      }
    };
    return {
      adb: false,
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        rolename: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        menus: [
          {
            required: true,
            validator: validatePass,

            // message: "角色名称不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqListAction",
      reqRoleList: "role/reqListAction",
    }),
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          reqRoleUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              alert("修改成功");
              //弹框消失
              this.cancel();
              //数据重置
              this.reset();
              //刷新角色列表的数据
              this.reqRoleList();
            } else {
              alert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    close(formName) {
      this.$refs[formName].resetFields();
      !this.info.isAdd && this.reset();
    },
    reset() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      //重置树形控件
      this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      // console.log(this.$refs.tree.getCheckedKeys());
      this.info.isShow = false;
    },
    enter(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          console.log(this.form.menus);
          reqRoleAdd(this.form).then((res) => {
            if (res.data.code === 200) {
              alert("添加成功");
              this.reset();
              this.cancel();
              this.reqRoleList();
            } else {
              alert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    look(id) {
      reqRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.reqMenuList();
    }
  },
};
</script>

<style>
</style>