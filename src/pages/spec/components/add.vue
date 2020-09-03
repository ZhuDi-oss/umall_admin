<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close('form')">
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item label="规格名称" :label-width="width" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item,index) in attrArr"
          :key="index"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
              <el-button type="danger" v-else @click="del(index)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({}),
  },
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "规格名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotal: "spec/reqListNum",
    }),
    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    del(index) {
      this.attrArr.splice(index, 1);
    },

    //弹框关闭完成
    close(formName) {
      this.$refs[formName].resetFields();
      // 如果是编辑，取消了，就要清空
      // if (!this.info.isAdd) {
        this.empty();
      // }
    },
    //点击了取消
    cancel() {
      this.$emit("hide");
    },

    //重置form数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    //添加
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //attrArr=[{value:"1"},{value:"2"},{value:"3"}] -->["1","2","3"]
          this.form.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );

          reqspecsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //添加成功
              successAlert(res.data.msg);
              //弹框消失
              this.$emit("hide");
              //数据重置
              this.empty();
              //重新获取list
              this.reqList();
              this.reqTotal();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    //查看一条数据
    look(id) {
      reqspecsDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        //form.attrs=[64G,128G,256G] -->[{value:"64G"},{value:"128G"},{value:"256G"}]
        this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    //点击了修改
    update() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqspecsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.$emit("hide");
          this.empty();
          this.reqList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang="stylus" scoped>
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

// element-ui上传文件css
.add >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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
}
</style>