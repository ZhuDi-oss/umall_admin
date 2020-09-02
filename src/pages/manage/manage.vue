<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willadd">添加</el-button>

    <!-- 列表 -->
    <v-list @edit="edit"></v-list>

    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //控制add的状态
      info: {
        isShow: false,
        title: "添加管理员",
        isAdd: true,
      },
    };
  },
  methods: {
    //点击了添加按钮
    willadd() {
      this.info = {
        isShow: true,
        title: "添加管理员",
        isAdd: true,
      };
    },
    //编辑
    edit(id) {
      this.info = {
        isShow: true,
        title: "修改角色",
        isAdd: false,
      };
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>