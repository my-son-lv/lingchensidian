<template>
  <div class="content">
    <h5>平台通知</h5>
    <div class="message_nav">
      <div class="message_nav_item" v-for="(item,index) in messageNavList" :key="index" :class="activeClass == index ? 'actived' : ''" @click="getItem(index,item.id)">
        {{item.value}}
      </div>
    </div>
    <div class="message_wrapper" v-for="(msg,index) in messageList" :key="index" @click="handleClickjump(msg)">
      <p class="item_con fl">
        {{msg.content}}
      </p>
      <p class="item_time fr">
        {{msg.created_at}}
      </p>
    </div>
    <div class="pagination_div">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-count="count" class="ct" style="position: absolute; right: 20px"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'historicalNews',
  inject: ["reload"],
  data() {
    return {
      messageNavList: [
        {
          value: "全部",
          id: ""
        },
        {
          value: "入驻",
          id: 1
        },
        {
          value: "其他",
          id: 2
        },
        {
          value: "面试",
          id: 3
        }
      ],
      activeClass: 0,
      messageList: [],
      messageType: '',
      count: 0,
      page: 1,
      pageSize: 10
    }
  },
  created() {
    this.getPlatformNews();
  },
  computed: {
  },
  methods: {
    // 导航
    getItem(index, id) {
      this.activeClass = index;
      this.messageType = id;
      this.getPlatformNews();
    },
    // 列表数据
    async getPlatformNews() {
      let res = await this.$fetch("/history", {
        type: this.messageType,
        page: this.page,
        pageSize: this.pageSize
      });
      if (res.code == 200) {
        this.messageList = res.data.list;
        this.count = res.data.count;
      }
    },
    handleClickjump(item) {
      if (item.code == 1001 || item.code == 1003 || item.code == 1007) {
        this.$router.push('/home/checklist');
      } else if (item.code == 1002 || item.code == 1004 || item.code == 1008) {
        this.$router.push('/home/companychecklist');
      } else if (item.code == 1005 || item.code == 1009 || item.code == 2003 || item.code == 2007 || item.code == 2008 || item.code == 2009) {
        this.$router.push('/home/teachlist');
      } else if (item.code == 1006 || item.code == 2001 || item.code == 2004 || item.code == 2010 || item.code == 2011 || item.code == 2012) {
        this.$router.push('/home/companylist');
      } else if (item.code == 2002 || item.code == 2005 || item.code == 2006) {
        this.$router.push('/home/companyPositionList');
      } else if (item.code == 3001 || item.code == 3002 || item.code == 3003 || item.code == 3004 || item.code == 3005 || item.code == 3006 || item.code == 3007 || item.code == 3008 || item.code == 3009 || item.code == 3010 || item.code == 3011) {
        this.$router.push('/home/interviewList');
      }
      this.reload();
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.getPlatformNews();
    },
  },
}
</script>
<style scoped>
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left;
}

.fr {
  float: right;
}
.content {
  margin-top: 10px;
  width: 100%;
  min-height: 600px;
  background: #fff;
  border-radius: 5px;
}
.content h5 {
  margin-bottom: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.message_nav {
  display: flex;
  margin-bottom: 20px;
  padding-left: 20px;
}

.message_nav_item {
  margin-right: 20px;
  width: 70px;
  height: 24px;
  background: #f8f8f8;
  border-radius: 13px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
.actived {
  font-size: 12px !important;
  font-family: PingFangSC-Regular, PingFang SC !important;
  font-weight: 400 !important;
  color: #078ca9 !important;
  background: rgba(7, 140, 169, 0.1) !important;
  border-radius: 13px !important;
  border: 1px solid #078ca9 !important;
}
.message_wrapper {
  margin-bottom: 20px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  padding: 10px 0;
}
.message_wrapper:hover {
  background-color: #daddde;
}
.message_wrapper .item_con {
  margin-left: 20px;
  width: 600px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
}
.message_wrapper .item_time {
  margin-right: 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.pagination_div {
  margin-top: 20px;
  position: relative;
  width: 100%;
  background: white;
  height: 52px;
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
