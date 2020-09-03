<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-form :model="user" :rules="rules" status-icon ref="user">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="请输入帐号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="输入密码" clearable show-password></el-input>
        </el-form-item>
      </el-form>

      <div class="btn-box">
        <el-button type="primary" @click="login('user')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUserLogin } from "../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      changeInfoAction: "user/changeInfoAction",
    }),
    login(formName) {
      // 登录弹出提示
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$router.push("/");
          reqUserLogin(this.user).then((res) => {
            // 弹成功
            if (res.data.code == 200) {
              alert("登录成功");
              // 将用户信息保存到vuex中
              this.changeInfoAction(res.data.list);
              // 跳转页面
              this.$router.push("/");
            } else {
              alert(res.data.msg);
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

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #5b3243, #2b3d5f);
  position: fixed;
  left: 0;
  top: 0;
}
.con {
  width: 380px;
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  text-align: center;
  line-height: 60px;
}
.el-input {
  margin-bottom: 15px;
}
.btn-box {
  text-align: center;
}
</style>