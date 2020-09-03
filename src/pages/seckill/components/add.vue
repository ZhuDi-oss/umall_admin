<template>
  <div>
    <el-dialog title="活动添加" :visible.sync="info.isShow" @closed="close('form')">
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth" prop="begintime">
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
        <el-form-item label="一级分类" :label-width="formLabelWidth" prop="first_cateid">
          <el-select v-model="form.first_cateid" placeholder="请选择活动区域" @change="changeFirstId">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth" prop="second_cateid">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域" @change="changeSecond">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth" prop="goodsid">
          <el-select v-model="form.goodsid" placeholder="请选择活动区域">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in attrList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="enter('form')" v-if="info.isAdd">添 加</el-button>
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
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      //二级分类的列表
      secondCateList: [],
      //规格属性的列表
      attrList: [],
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
      rules: {
        title: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        goodsid: [
          { required: true, message: "请选择商品", trigger: "blur" },
        ],
        begintime: [
          { required: true, message: "请选择起始时间", trigger: "blur" },
        ],
      
        
      },
    };
  },
  methods: {
    ...mapActions({
      reqKillList: "seckill/reqListAction",
      reqCateList: "cate/reqListAction",
      //获取规格列表
      // reqSpecList: "spec/reqListAction",
      reqGoodsList: "goods/reqListAction",
    }),
    // 修改了一级分类二级分类发生对应的变化
    changeFirstId() {
      //找到当前first_cateid对应的那条数据的children，赋值给secondCateList,遍历
      this.secondCateList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;

      //因为更换了一级分类，二级分类重置
      this.form.second_cateid = "";
    },

    // 商品
    changeSecond() {
      this.attrList = this.goodsList.filter(
        (item) => item.second_cateid == this.form.second_cateid
      );
      this.form.goodsid = "";
    },

    update() {
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqKillUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          alert("修改成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.reset();
          //刷新角色列表的数据
          this.reqKillList();
        } else {
          alert(res.data.msg);
        }
      });
    },
    close(formName) {
      this.$refs[formName].resetFields();
      !this.info.isAdd && this.reset();
    },
    reset() {
      this.form = {
        id: "",
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //重置树形控件
      // this.$refs.tree.setCheckedKeys([]);
    },
    cancel() {
      this.info.isShow = false;
    },
    enter(formName) {
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.$refs[formName].validate((valid) => {
        if (valid) {
          reqKillAdd(this.form).then((res) => {
            if (res.data.code === 200) {
              alert("添加成功");
              this.reset();
              this.cancel();
              this.reqKillList();
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
      reqKillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.secondCateList = this.cateList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        this.attrList = this.goodsList.filter(
          (item) => item.second_cateid == this.form.second_cateid
        );
        // this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
  },
  mounted() {
    this.reqKillList();
    if (this.cateList.length == 0) {
      this.reqCateList();
    }

    this.reqGoodsList(true);
  },
};
</script>

<style>
</style>