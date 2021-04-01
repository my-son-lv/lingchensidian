<template>
  <div class="savedJobs_wrapper">
    <div class="no_message_wrapper" v-if="jobList.length == 0">
      <img src="../../assets/image/no_message.png" />
      <p>Temporarily no Saved jobs</p>
    </div>

    <div v-else>
      <div class="search_wrapper">
        <el-input
          v-model="value"
          placeholder="Please Enter Job Titles"
        ></el-input>
        <div class="search_btn" @click="handleClickSearch">Search</div>
        <div class="reset_btn" @click="handleClickReset">Reset</div>
      </div>
      <ul class="job_wrapper">
        <li v-for="(item, index) in jobList" :key="index">
          <h5>{{ item.name }}</h5>
          <p class="job_desc">{{ item.job_info }}</p>
          <div class="con_wrapper">
            <img src="../../assets/image/info_c3_0.png" />
            {{ item.job_year | filterJobYear }}
          </div>
          <div class="con_wrapper" style="margin: 10px 0">
            <img src="../../assets/image/info_c3_1.png" />
            {{ item.pay.split(",").join("-") }}K
          </div>
          <div class="con_wrapper">
            <img src="../../assets/image/info_c3_2.png" />
            {{ item.job_city_data.pinyin }}，{{
              item.job_province_data.pinyin
            }}，China
          </div>
          <div class="right_btn_wrapper">
            <img
              :src="
                item.collect_type == 0
                  ? '/static/images/job_c3_0.png'
                  : '/static/images/job_c3_1.png'
              "
              @click.stop="handleClickCollection(item.id, item.type)"
            />
            <div
              class="apply"
              @click.stop="handleClickApply(item.id, item.cid)"
            >
              APPLY
            </div>
          </div>
        </li>
      </ul>
      <pagination
        :count="count"
        v-if="this.count > 0"
        @activePage="receivePage"
        style="margin-right: 20px"
      ></pagination>
    </div>
  </div>
</template>
<script>
import pagination from "../../components/pagination/pagination";
import {
  jobCollect,
  getInfoByToken,
  jobCollectList
} from "../../apis/baseUrls";
import axios from "../../apis/http";
export default {
  name: "savedJobs",
  components: { pagination },
  data() {
    return {
      value: "",
      token: "",
      page: 1,
      pageSize: 5,
      jobList: [],
      count: 0,
      type: "",
      user_info: {}
    };
  },
  created() {
    this.$emit("passParentNum", 1);
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getUserInfo();
    }
    this.getJobList();
  },
  computed: {},
  methods: {
    // 获取用户信息
    async getUserInfo() {
      let res = await getInfoByToken({
        token: this.token
      });
      if (res.data.code == 200) {
        this.user_info = res.data.data;
      }
    },
    // 获取收藏列表
    async getJobList() {
      let res = await jobCollectList({
        token: this.token,
        page: this.page,
        pageSize: this.pageSize,
        name: this.value
      });
      if (res.data.code == 200) {
        this.jobList = res.data.data.list;
        this.count = res.data.data.count;
      }
    },
    // 接收分页
    receivePage(page) {
      this.page = page;
      this.getJobList();
    },
    // 搜索
    handleClickSearch() {
      this.getJobList();
    },
    // 重置
    handleClickReset() {
      this.value = "";
      this.getJobList();
    },
    // 收藏
    async handleClickCollection(id, type) {
      if (this.token) {
        let res = await jobCollect({
          token: this.token,
          type: 2,
          jid: id
        });
        if (res.data.code == 200) {
          this.$message("取消收藏");
          this.getJobList();
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      } else {
        this.$router.push("/register");
      }
    },
    // 点击apply
    handleClickApply(id, cid) {
      if (this.user_info == null) {
        this.$router.push("/register");
      } else if (this.user_info.status == 0) {
        this.$router.push("/home");
      } else if (this.user_info.status == 1) {
        this.$alert(
          "Your application is awaiting for review, please check your registration status via email and apply the position after approved.",
          {
            confirmButtonText: "OK"
          }
        );
      } else if (this.user_info.status == 2) {
        axios
          .post("/api/index/job/jobApplication", {
            token: this.token,
            cid: cid,
            jid: id
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$alert(
                "You have submitted the job application successfully, the employer will review your application and contact you soon.",
                {
                  confirmButtonText: "OK"
                }
              );
            } else {
              this.$message.error(res.data.msg);
            }
          });
      } else if (this.user_info.status == 3) {
        this.$router.push("/home");
      }
    }
  }
};
</script>
<style scoped>
.savedJobs_wrapper {
  margin-bottom: 20px;
  width: 980px;
  background: #ffffff;
  border-radius: 10px;
}
.search_wrapper {
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 80px;
  border-bottom: 1px solid #eee;
}
/deep/ .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-textarea__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-input {
  width: 440px;
  height: 40px;
}
/deep/ .el-input__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
.search_btn {
  margin: 0 20px;
  width: 80px;
  height: 40px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.reset_btn {
  width: 80px;
  height: 40px;
  background: #f2f2f2;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.job_wrapper li {
  position: relative;
  padding: 20px;
  height: 234px;
  box-shadow: 0px 1px 0px 0px #eeeeee;
  box-sizing: border-box;
}
.job_wrapper li h5 {
  margin-bottom: 20px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 30px;
}
.job_wrapper .job_desc {
  margin-bottom: 20px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.job_wrapper .con_wrapper {
  display: flex;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.job_wrapper .con_wrapper img {
  margin-right: 12px;
  width: 16px;
  height: 16px;
}
.right_btn_wrapper {
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
}
.right_btn_wrapper .apply {
  margin-left: 10px;
  width: 66px;
  height: 30px;
  background: rgba(216, 216, 216, 0);
  border-radius: 4px;
  border: 1px solid #333333;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 30px;
  text-align: center;
}
.no_message_wrapper {
  padding-top: 188px;
  width: 980px;
  height: 880px;
  background: #ffffff;
  border-radius: 10px;
  box-sizing: border-box;
}
.no_message_wrapper img {
  margin: 0 auto 10px auto;
  width: 300px;
  height: 258px;
}
.no_message_wrapper p {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  text-align: center;
}
</style>
