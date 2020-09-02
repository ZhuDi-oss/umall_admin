<template>
  <div>
    <el-button type="primary" @click="addition">添加</el-button>
    <v-list @edit="edit"></v-list>
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
      info: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  methods: {
    addition() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isAdd = false;
      // this.$refs.add.look(id);
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>