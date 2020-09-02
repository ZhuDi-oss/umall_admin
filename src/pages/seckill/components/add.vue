<template>
  <div>
    <el-dialog title="活动添加" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-time-select
            placeholder="起始时间"
            v-model="form.begintime"
            :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="form.endtime"
            :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: form.begintime}"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择活动区域">
            <el-option label="--请选择--" :value="0"></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="--请选择--" :value="0"></el-option>
            <!-- <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择活动区域">
            <el-option label="--请选择--" :value="0"></el-option>
            <!-- <el-option v-for="item in specList" :key="item.id" :label="item" :value="item.id"></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="enter" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqKillAdd,
  reqKillDetail,
  reqKillUpdate,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      killList: "seckill/list",
      cateList:"cate/list",
     
    }),
  },
  data() {
    return {
      form: {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      formLabelWidth: "120px",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  methods: {
    ...mapActions({
      reqKillList: "seckill/reqListAction",
    }),
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqKillList(this.form).then((res) => {
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
    },
    close() {
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
      this.info.isShow = false;
    },
    enter() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

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
    this.reqKillList();
  },
};
</script>

<style>
</style>