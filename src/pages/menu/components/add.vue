<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close('form')">
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择活动区域" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1" prop='icon'>
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option value="el-icon-setting">
              <i class="el-icon-setting"></i>
            </el-option>
            <el-option value="el-icon-goods">
              <i class="el-icon-goods"></i>
            </el-option>
            <el-option value="el-icon-user">
              <i class="el-icon-user"></i>
            </el-option>
            <el-option value="el-icon-camera">
              <i class="el-icon-camera"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else prop='url'>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqAddMenu,
  reqMenuDetail,
  reqMenuUpdate,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {
      formLabelWidth: "100px",
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      indexRoutes,
      rules: {
        title: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
        ],
        icon:[
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        url:[
          { required: true, message: "请选择分类", trigger: "blur" },
        ],

      },
    };
  },

  methods: {
    ...mapActions({
      reqList: "menu/reqListAction",
    }),
    close(formName) {
      this.$refs[formName].resetFields()
      // 如果是编辑，取消了，就要清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    cancel() {
      this.info.isShow = false;
      
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //修改了pid
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    add(formName) {
      // 登录弹出提示
      this.$refs[formName].validate((valid) => {
        if (valid) {
          reqAddMenu(this.form).then((res) => {
            if (res.data.code == 200) {
              alert("添加成功");

              //添加弹框消失
              this.cancel();
              // 重置数据
              this.empty();
              //列表重新请求
              this.reqList();
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
      reqMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          reqMenuUpdate(this.form).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              alert("修改成功");
              this.cancel();
              this.empty();
              this.reqList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>