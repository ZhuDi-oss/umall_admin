<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 数据列表  -->
    <!-- <v-list @emit="emit($event)"></v-list> -->

    <!-- 添加弹框 -->
    <!-- <v-add :info="info" @hide="hide" ref="add"></v-add> -->

    <v-list @emit="emit($event)"></v-list>
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
  methods: {
    willAdd() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    emit(id) {
      this.info = {
        isShow: true,
        title: "修改菜单",
        isAdd: false,
      };
      //父组件调用子组件的方法
      this.$refs.add.look(id);
    },
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "添加菜单",
        isAdd: true,
      },
    };
  },
};
</script>

<style>
</style>