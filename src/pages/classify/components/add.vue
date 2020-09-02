<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth" v-if="form.pid!=0">
          <div class="upload-box">
            <h3 class="upload-add">+</h3>
            <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
            <input class="upload-file" @change="selectImg" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      imgUrl: "",
      formLabelWidth: "100px",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },

  methods: {
    ...mapActions({
      reqList: "cate/reqListAction",
    }),

    //element-ui 上传文件
    // changeImg(e) {
    //   var file = e.raw;
    //   this.imgUrl = URL.createObjectURL(file);
    //   this.form.img = file;
    // },

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
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    add() {
      reqCateAdd(this.form).then((res) => {
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
      reqCateDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
         this.imgUrl=this.$preImg+ res.data.list.img
      });
    },
    update() {
      reqCateUpdate(this.form).then((res) => {
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

/* // element-ui上传文件css
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
</style>