<template>
  <div class="interview_wrapper">
    <div class="no_message_wrapper" v-if="interviewList.length == 0">
      <img src="../../assets/image/no_message.png" />
      <p>Temporarily no Job invites</p>
    </div>

    <div v-else>
      <ul class="nav_wrapper clearfix">
        <li
          v-for="(nav, index) in navList"
          :key="index"
          :class="activeClass == index ? 'actived' : ''"
          @click="getNavItem(index)"
        >{{ nav.value }}</li>
      </ul>
      <div class="content_wrapper">
        <div class="search_wrapper">
          <div class="clearfix">
            <div class="lside_input_wrapper fl" style="margin-right: 20px">
              <p class="name">Name</p>
              <el-input v-model="schoolName" placeholder="Please enter school name"></el-input>
            </div>
            <div class="rside_input_wrapper fl">
              <p class="name">To choose time</p>
              <el-date-picker
                v-model="startTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="Start time"
                class="fl"
                style="width: 210px"
              ></el-date-picker>
              <span class="fl">TO</span>
              <el-date-picker
                v-model="endTime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="End time"
                class="fl"
                style="width: 210px"
              ></el-date-picker>
            </div>
          </div>
          <div class="right_btn_wrapper clearfix">
            <div class="btn_wrapper fr">
              <div class="lside_btn fl" @click="handleClickSearch">Search</div>
              <div class="rside_btn fl" @click="handleClcikReset">Reset</div>
            </div>
          </div>
        </div>
        <ul class="details_item_wrapper">
          <li class="clearfix" v-for="(item, index) in interviewList" :key="index">
            <img
              :src="
                item.logo_path
                  ? item.logo_path.path
                  : '/static/images/company_logo.png'
              "
              class="lside_img fl"
            />
            <div class="lsdie_con_wraper fl">
              <div class="top_title_wrapper">
                <h5 class="fl">{{ item.company_name }}</h5>
                <p class="time fr">interview time : {{ splitTime[index] }} (GMT+8)</p>
              </div>
              <div class="details_wrapper">
                <h4>{{ item.job_name }}</h4>
                <div class="price">{{ item.pay.split(",").join("-") }} RMB /Month</div>
                <div class="work_details">
                  {{ item.job_city_data.pinyin }} |
                  {{ item.work_type | filterWorkType }} |
                  {{ item.job_year | filterJobWorkYear }}
                </div>
                <div
                  class="right_details_btn"
                  v-if="item.status == 1 || item.status == 2"
                  @click="EnterTheStudio(item.id)"
                >Attend Interview</div>

                <div class="right_btn_group" v-if="item.status == 0">
                  <div class="inter_right_btn_gourp" @click="inert_accept(item.id,1)">Accept</div>
                  <div class="inter_right_btn_gourp" @click="inert_accept(item.id,2)">Decline</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <pagination
          :count="count"
          v-if="this.count != 0"
          @activePage="receivePage"
          style="margin-right: 20px"
        ></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  jobCollectList,
  interviewMy,
  interviewDesc,
  intoRoom,
  inertAccept,
} from "../../apis/baseUrls";
import pagination from "../../components/pagination/pagination";
import jobsItemDetails from "../../components/jobsItemDetails/jobsItemDetails";
import moment from "moment";
export default {
  name: "myInterview",
  components: { pagination, jobsItemDetails },
  data() {
    return {
      token: "",
      page: 1,
      pageSize: 5,
      navList: [
        {
          value: "All",
          id: 1,
        },
        {
          value: "Upcoming Interview",
          id: 2,
        },
        {
          value: "Completed Interview",
          id: 3,
        },
        {
          value: "Others",
          id: 4,
        },
      ],
      activeClass: 0,
      schoolName: "",
      startTime: "",
      endTime: "",
      type: 0,
      interviewList: [],
      splitTime: [],
      count: 0,
      name: "",
    };
  },
  created() {
    this.$emit("passParentNum", 3);
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.getMyInterviewList();
      this.name = sessionStorage.getItem("name");
    }
  },
  computed: {},
  methods: {
    async inert_accept(id, type) {
      if (type == 1) {
        this.$confirm(
          "Would you like to contact customer service to reschedule the interview?",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
          }
        )
          .then(() => {
            inertAccept({
              token: this.token,
              id: id,
              type: 1,
            }).then((res) => {
              this.getMyInterviewList();
              this.$message({
                message:
                  "Your application has been submitted, customer service will contact you soon.",
                type: "success",
              });
            });
          })
          .catch(() => {});
      } else {
        this.$prompt(
          "Please fill up the reason to decline the interview, thanks!",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            // type: "warning",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
          }
        )
          .then((value) => {
            inertAccept({
              token: this.token,
              id: id,
              info: value.value,
              type: 2,
            }).then((res) => {
              this.getMyInterviewList();
              this.$message({
                message:
                  "The interview has been cancelled. Customer service will contact you soon.",
                type: "success",
              });
            });
          })
          .catch(() => {});
      }
      // await inertAccept({
      //   token: this.token,
      //   id: id,
      //   type: type,
      // })
      //   .then((res) => {
      //     if(res.data.code == 200){
      //       this.getMyInterviewList();
      //     }else{
      //       this.$message.error(res.data.msg);
      //     }
      //   })
      //   .catch((res) => {});
    },
    //   导航切换
    getNavItem(index) {
      this.activeClass = index;
      this.type = index;
      this.getMyInterviewList();
    },
    // 获取列表
    async getMyInterviewList() {
      let res = await interviewMy({
        token: this.token,
        page: this.page,
        pageSize: this.pageSize,
        company_name: this.schoolName,
        start_time: this.startTime,
        end_time: this.endTime,
        type: this.type,
      });
      if (res.data.code == 200) {
        this.count = res.data.data.count;
        this.interviewList = res.data.data.list;
        if (this.interviewList) {
          this.splitTime = this.interviewList.map(
            (ele) =>
              (ele.inte_time =
                ele.inte_time.split(" ")[1].slice(0, 5) +
                "，" +
                moment(ele.inte_time.split(" ")[0]).format("DD MMM YYYY"))
          );
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },
    // 搜索
    handleClickSearch() {
      this.getMyInterviewList();
    },
    // 重置
    handleClcikReset() {
      this.company_name = "";
      this.start_time = "";
      this.end_time = "";
      this.getMyInterviewList();
    },
    // 接收分页
    receivePage(page) {
      this.page = page;
      this.getJobList();
    },
    // 进入房间
    async EnterTheStudio(id) {
      let user_id = "3_" + this.name;
      let res = await intoRoom({
        token: this.token,
        inter_id: id,
        type: 3,
        account: user_id,
      });
      if (res.data.code == 200) {
        let sdkId = res.data.data.SDK_APP_ID;
        let userSig = res.data.data.USER_SIGN;
        let roomId = res.data.data.room_id;
        let type = 3;
        let companyMessage = res.data.data.user;
        this.$router.push({
          name: "realTimeCall",
          params: {
            sdkId,
            userSig,
            roomId,
            user_id,
            type,
            companyMessage,
          },
        });
        console.log(companyMessage);
      } else {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>
<style scoped>
/deep/ .el-input__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-textarea__inner:focus {
  border-color: #333;
  outline: 0;
}
/deep/ .el-input__inner {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  border: 1px solid #cccccc;
}
/deep/ .lside_input_wrapper .el-input {
  width: 460px;
  height: 40px;
}
.nav_wrapper li {
  float: left;
  margin-right: 10px;
  padding: 10px 15px;
  height: 40px;
  background: #f2f2f2;
  border-radius: 10px 10px 0px 0px;
  line-height: 40px;
  cursor: pointer;
}
.nav_wrapper li.actived {
  background: #ffffff;
  color: #078ca9;
}
.content_wrapper {
  width: 100%;
  height: 906px;
  background: #ffffff;
  border-radius: 0px 0px 10px 10px;
}
.nav_wrapper li:nth-child(1) {
  padding: 10px 30px;
}
.search_wrapper {
  padding: 20px;
  width: 100%;
  height: 170px;
  background: #ffffff;
  box-shadow: 0px 1px 0px 0px #eeeeee;
  box-sizing: border-box;
}
.search_wrapper .name,
.rside_input_wrapper .name {
  margin-bottom: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.rside_input_wrapper span {
  margin: 0 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 40px;
}
.right_btn_wrapper {
  width: 100%;
  margin-top: 20px;
}
.lside_btn {
  margin-right: 20px;
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
.rside_btn {
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
.details_item_wrapper li {
  padding: 20px;
  width: 980px;
  height: 216px;
  box-shadow: 0px 1px 0px 0px #eeeeee;
  box-sizing: border-box;
}
.details_item_wrapper li .lside_img {
  margin-right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.details_item_wrapper li .top_title_wrapper {
  margin-bottom: 10px;
  width: 880px;
  height: 40px;
  line-height: 40px;
}
.details_item_wrapper .top_title_wrapper h5 {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.details_item_wrapper .top_title_wrapper .time {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.details_item_wrapper .details_wrapper {
  position: relative;
  padding: 20px;
  width: 880px;
  height: 126px;
  background: #f8f8f8;
  border-radius: 4px;
  box-sizing: border-box;
}
.details_wrapper h4 {
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.details_wrapper .price {
  margin: 10px 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
}
.details_wrapper .work_details {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.details_wrapper .right_details_btn {
  position: absolute;
  top: 50%;
  right: 20px;
  margin-top: -20px;
  width: 160px;
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
.right_btn_group {
  position: absolute;
  right: 10px;
  top: 0;
}
.inter_right_btn_gourp {
  margin-top: -20px;
  width: 160px;
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
  margin-top: 16px;
}
</style>
