<template>
  <div>
    <div class="pagination_div">
      <el-pagination
        layout="prev, pager, next"
        :current-page="this.page"
        :page-count="count"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: ["count", "currentPage"],
  data() {
    return {
      page: 1
    };
  },
  created() {
    this.page = Number(this.currentPage);
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.$emit("activePage", this.page);
    }
  }
};
</script>
<style scoped>
.pagination_div {
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 52px;
  text-align: right;
}

/deep/ .pagination_div .el-pagination .btn-prev {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .btn-next {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .el-icon {
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
  padding: 0;
  text-align: center;
}

/deep/ .pagination_div .el-pagination .more {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .el-pager .number {
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgba(221, 221, 221, 1);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
}

/deep/ .pagination_div .el-pagination .el-pager .number:not(.disabled).active {
  background-color: rgba(7, 140, 169, 1);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-left: 8px;
  font-size: 14px;
  line-height: 32px;
}
</style>
