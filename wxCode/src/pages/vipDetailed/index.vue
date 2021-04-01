// 会员明细
<template>
  <div class="indexContatiner">
    <div class="detailed_item" v-for="(item, index) in vipList" :key="index">
      <div class="detailed_top">
        <div class="clearfix">
          <div class="lside_price fl">
            {{item.name}}
            <span class="price" v-if="item.money">￥{{item.money}}</span>
          </div>
          <div class="buy fr" @click="handleClickBuy(item.id)">{{ item.money ? '购买' : '咨询'}}</div>
        </div>
        <div>
          <h5 class="cp_fwq">产品服务期：{{item.service ? item.service : '无' }}</h5>
        </div>
      </div>
      <ul class="right_wrapper clearfix">
        <li class="right_item">精英简历 {{item.down ? item.down : 0}}份</li>
        <li class="right_item">应聘邀请 {{item.yaoqing ? item.yaoqing : 0 }}次</li>
        <li class="right_item">精准推送 {{item.tuisong ? item.tuisong : 0 }}次</li>
        <li class="right_item">职位置顶 {{item.top ? item.top : 0 }}次</li>
        <li class="right_item">
          急聘服务
          <img
            src="https://files.apex.link/apexlink/2020112514400660091304.png"
            class="duihao_icon"
          />
        </li>
        <li class="right_item">
          招聘顾问
          <img
            src="https://files.apex.link/apexlink/2020112514400660091304.png"
            class="duihao_icon"
          />
        </li>
        <li class="right_item">
          发布职位
          <img
            src="https://files.apex.link/apexlink/2020112514400660091304.png"
            class="duihao_icon"
          />
        </li>
      </ul>
    </div>
    <h5 class="buy_tips">购买须知</h5>
    <p class="tel">24小时客服电话:17801160565</p>
    <van-dialog id="van-dialog" />
    <van-notify id="van-notify" class="van-notify" />
  </div>
</template>

<script>
import Dialog from "@/../static/vant/dialog/dialog";
import Notify from "@/../static/vant/notify/notify";
export default {
  data() {
    return {
      vipList: [],
    };
  },

  components: {},

  methods: {
    // 获取会员列表
    async getMemberList() {
      let TOKEN = wx.getStorageSync("token");
      let res = await this.$httpWX.post({
        url: "/api/company/getVipList",
        data: {
          token: TOKEN,
        },
      });
      if (res.code == 200) {
        this.vipList = res.data;
      } else {
        Notify({ type: "warning", message: res.msg });
      }
    },
    // 购买
    handleClickBuy(id) {
      Dialog.confirm({
        title: "办理会员",
        message: "您的申请已提交，客服24小时内会与您联系，为您办理会员",
      })
        .then(() => {
          let TOKEN = wx.getStorageSync("token");
          this.$httpWX
            .post({
              url: "/api/company/vip/buy",
              data: {
                token: TOKEN,
                vip_id: id,
              },
            })
            .then((res) => {
              if (res.code == 200) {
                console.log("成功");
              } else {
                Notify({ type: "warning", message: res.msg });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  beforeMount() {},
  onShow() {
    Object.assign(this.$data, this.$options.data());
    this.getMemberList();
  },
  onLoad(options) {},
  onUnload() {},
};
</script>
<style>
page {
  background: #fff;
}
button::after {
  border: none;
}
</style>
<style scoped>
.indexContatiner {
  padding-top: 12px;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.fl {
  float: left !important;
}

.fr {
  float: right !important;
}
.detailed_item {
  margin: 0 auto 24px auto;
  width: 92%;
  background: #f8f8f8;
  border-radius: 8px;
}
.detailed_top {
  height: 77px;
  line-height: 49px;
  background: #f8f8f8;
  border-bottom: 0.5px solid #dddddd;
}
.detailed_top .lside_price {
  margin-left: 16px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #0f0c19;
}
.detailed_top .price {
  color: #ff6010;
}
.detailed_top .buy {
  margin-top: 4%;
  margin-right: 16px;
  width: 52px;
  height: 24px;
  background: #0f0c19;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffcea4;
  line-height: 24px;
  text-align: center;
}
.right_wrapper {
  padding: 16px 30px 16px 16px;
}
.right_wrapper .right_item {
  margin: 0 14px 12px 0;
  float: left;
  width: 84px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.duihao_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.buy_tips {
  margin-left: 16px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.tel {
  margin: 8px 0 16px 16px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  letter-spacing: 1px;
}
.van-notify {
  width: 100%;
}
.cp_fwq{
    margin-left: 16px;
    line-height: 16px;
    font-size: 14px;
}
</style>
