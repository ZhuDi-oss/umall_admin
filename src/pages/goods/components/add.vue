<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @closed="close"
      @opened="createEditor"
    >
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" placeholder="请选择活动区域" @change="changeFirstId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!=0">
          <div class="upload-box">
            <h3 class="upload-add">+</h3>
            <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
            <input class="upload-file" @change="selectImg" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" placeholder="请选择活动区域" @change="changeSpecId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsattr" placeholder="请选择活动区域" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in attrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <!-- 富文本编辑器的节点 -->
          <div id="editor" v-if="info.isShow"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      // 分类的列表
      cateList: "cate/list",
      //规格列表
      specList: "spec/list",
    }),
  },
  data() {
    return {
      //二级分类的列表
      secondCateList: [],
      //规格属性的列表
      attrList: [],
      // 图片临时地址
      imgUrl: "",
      formLabelWidth: "100px",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },

  methods: {
    ...mapActions({
      // 获取分类列表
      reqCateList: "cate/reqListAction",
      //获取规格列表
      reqSpecList: "spec/reqListAction",
      //获取商品列表
      reqList: "goods/reqListAction",
    }),
    // 修改了一级分类
    changeFirstId() {
      //找到当前first_cateid对应的那条数据的children，赋值给secondCateList,遍历
      this.secondCateList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;

      //因为更换了一级分类，二级分类重置
      this.form.second_cateid = "";

      // this.form.first_cateid; // id 值
    },

    // 修改二级分类
    changeSpecId() {
      //当商品规格变了，就计算一下商品属性要展示的数组列表
      this.attrList = this.specList.find(
        (item) => item.id == this.form.specsid
      ).attrs;

      //选中的商品属性重置
      this.form.specsattr = [];
    },

    //创建编辑器
    createEditor() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //给富文本编辑器赋值
      this.editor.txt.html(this.form.description);
    },

    //原生上传文件开始
    selectImg(e) {
      var file = e.target.files[0];

      //2M
      if (file.size > 2 * 1024 * 1024) {
        alert("文件格式不能超过2M");
        return;
      }

      //图片类型
      let imgTypeArr = [".jpg", ".jpeg", ".png", ".gif"];
      //获取到后缀名
      var extname = file.name.slice(file.name.lastIndexOf("."));
      //判断文件格式是否正确
      if (!imgTypeArr.includes(extname)) {
        alert("请上传正确的图片格式");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //上传文件结束
    close() {
      // 如果是编辑，取消了，就要清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    cancel() {
      this.info.isShow = false;
    },
    empty() {
      //二级分类的列表
      this.secondCateList = [];
      //规格属性的列表
      this.attrList = [];
      //图片临时地址
      this.imgUrl = "";

      //表单数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    add() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();
      reqGoodsAdd(this.form).then((res) => {
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
    },
    look(id) {
      reqGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(",");
        //计算二级分类的列表
        this.secondCateList = this.cateList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        //计算属性列表
        this.attrList = this.specList.find(
          (item) => item.id == this.form.specsid
        ).attrs;
      });
    },

    // 修改
    update() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();
      reqGoodsUpdate(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          alert("修改成功");
          this.cancel();
          this.empty();
          this.reqList();
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 如果没有分类就请求
    if (this.cateList.length == 0) {
      this.reqCateList();
    }

    // 请求全部的规格
    this.reqSpecList(true);
  },
};
</script>

<style scoped>
.upload-box {
  width: 150px;
  height: 150px;
  border: 1px dashed #cccccc;
  position: relative;
}
.upload-add {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 40px;
  color: #666;
  font-weight: 400;
}
.upload-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.upload-file {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>