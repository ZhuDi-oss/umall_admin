<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="title" label="活动名称" sortable width="150"></el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          <!-- <v-del @click="del(scope.row.id)"></v-del> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqKillDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqListAction",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqKillDel({ id: id }).then((res) => {
          if (res.data.code == 200) {
            alert("删除成功");
            this.reqList();
          } else {
            alert(res.data.msg);
          }
          console.log(res)
        });
      });
    },
  },

  mounted() {
    console.log(this.$store);
    //一进来就请求了角色列表数据
    this.reqList();
  },
};
</script>

<style>
</style>