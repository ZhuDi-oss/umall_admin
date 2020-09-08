<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="编号" sortable></el-table-column>
      <el-table-column prop="goodsname" label="名称" sortable width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$preImg+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del @confirm="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="changeCurrentPage"
    ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../util/request";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size: "goods/size",
      total: "goods/total",
      page: "goods/page",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqListAction",
      reqTotal: "goods/reqListNum",
      changePageAction: "goods/changePageAction",
    }),
    //修改了当前的页码
    changeCurrentPage(p) {
      //修改一下vuex里面的page
      this.changePageAction(p);
    },
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      //点击了确定，发起删除请求
      reqGoodsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          alert("删除成功");
          this.reqTotal();
          this.changePageAction(1);
        } else {
          alert(res.data.msg);
        }
      });
    },
  },

  mounted() {
    //一进来 走请求
    this.reqList();
    this.reqTotal();
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>