<template>
  <div>
    <div class="top_wrapper">
      <h5>寰球会员 | 助力您找到更优质的外教</h5>
      <div class="top_tips_wrapper">
        <img src="../assets/image/top_icon.png" class="top_img" />
        <p class="top_con">1 对 1 顾问服务，尽享职位曝光特权</p>
      </div>
      <div class="top_con_wrapper" v-if="vipList.length > 0">
        <div class="con_item">
          <h6 class="item_title">{{ vipList[0].name }}</h6>
          <p class="price" v-if="vipList[0].money">
            ￥
            <span style="font-size: 40px">{{ vipList[0].money }}</span>/月
          </p>
          <p class="price_height" v-if="!vipList[0].money"></p>
          <div class="btn_wrapper" @click="nowBuy(vipList[0].id)">{{vipList[0].money ? '立即购买' : '立即咨询'}}</div>
          <div class="line"></div>
          <ul class="li_wrapper">
            <li class="clearfix">
              <p class="lside_title fl">精英简历</p>
              <p class="fr" style="color: #333333">{{ vipList[0].down }}份</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">应聘邀请</p>
              <p class="fr" style="color: #333333">{{ vipList[0].yaoqing ? vipList[0].yaoqing : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">急聘服务</p>
              <p class="fr" style="color: #333333">{{ vipList[0].jiping ? vipList[0].jiping : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">精准推送</p>
              <p class="fr" style="color: #333333">{{ vipList[0].tuisong ? vipList[0].tuisong : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">职位置顶</p>
              <p class="fr" style="color: #333333">{{ vipList[0].top ? vipList[0].top : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">招聘顾问</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
            <li class="clearfix">
              <p class="lside_title fl">发布职位</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
            <li class="clearfix">
              <p class="lside_title fl">线上面试</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
          </ul>
        </div>

        <div class="con_item" v-if="vipList[1]">
          <h6 class="item_title">{{ vipList[1].name }}</h6>
          <p class="price" v-if="vipList[1].money">
            ￥
            <span style="font-size: 40px">{{ vipList[1].money }}</span>/月
          </p>
          <p class="price_height" v-if="!vipList[1].money"></p>
          <div class="btn_wrapper" @click="nowBuy(vipList[1].id)">{{vipList[1].money ? '立即购买' : '立即咨询'}}</div>
          <div class="line"></div>
          <ul class="li_wrapper">
            <li class="clearfix">
              <p class="lside_title fl">精英简历</p>
              <p class="fr" style="color: #333333">{{ vipList[1].down }}份</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">应聘邀请</p>
              <p class="fr" style="color: #333333">{{ vipList[1].yaoqing ? vipList[1].yaoqing : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">急聘服务</p>
              <p class="fr" style="color: #333333">{{ vipList[1].jiping ? vipList[1].jiping : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">精准推送</p>
              <p class="fr" style="color: #333333">{{ vipList[1].tuisong ? vipList[1].tuisong : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">职位置顶</p>
              <p class="fr" style="color: #333333">{{ vipList[1].top ? vipList[1].top : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">招聘顾问</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
            <li class="clearfix">
              <p class="lside_title fl">发布职位</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
            <li class="clearfix">
              <p class="lside_title fl">线上面试</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
          </ul>
        </div>
        <div class="con_item" style="margin-right: 0" v-if="vipList[2]">
          <h6 class="item_title">{{ vipList[2].name }}</h6>
          <p class="price" v-if="vipList[2].money">
            ￥
            <span style="font-size: 40px">{{ vipList[2].money }}</span>/月
          </p>
          <p class="price_height" v-if="!vipList[2].money"></p>
          <div class="btn_wrapper" @click="nowBuy(vipList[2].id)">{{vipList[2].money ? '立即购买' : '立即咨询'}}</div>
          <div class="line"></div>
          <ul class="li_wrapper">
            <li class="clearfix">
              <p class="lside_title fl">精英简历</p>
              <p class="fr" style="color: #333333">{{ vipList[2].down }}份</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">应聘邀请</p>
              <p class="fr" style="color: #333333">{{ vipList[2].yaoqing ? vipList[2].yaoqing : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">急聘服务</p>
              <p class="fr" style="color: #333333">{{ vipList[2].jiping ? vipList[2].jiping : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">精准推送</p>
              <p class="fr" style="color: #333333">{{ vipList[2].tuisong ? vipList[2].tuisong : 0 }}次</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">职位置顶</p>
              <p class="fr" style="color: #333333">{{ vipList[2].top ? vipList[2].top : 0 }}个</p>
            </li>
            <li class="clearfix">
              <p class="lside_title fl">招聘顾问</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
            <li class="clearfix">
              <p class="lside_title fl">发布职位</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
            <li class="clearfix">
              <p class="lside_title fl">线上面试</p>
              <img src="../assets/image/rside_icon.png" class="rside_con fr" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="exclusive_title_wrapper">
      <img src="../assets/image/lside_line.png" alt />
      <h6>会员专属权益</h6>
      <img src="../assets/image/rside_line.png" alt />
    </div>
    <div class="exclusive_wrapper">
      <div class="exclusive_item clearfix" style="margin-right: 0">
        <img src="../assets/image/third.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">精英简历</p>
          <p class="con">优质外教简历海量下载，好外教，随心选</p>
        </div>
      </div>

      <div class="exclusive_item clearfix" style="margin:0 20px">
        <img src="../assets/image/yingpingyaoqing.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">应聘邀请</p>
          <p class="con">自主发送职位应聘邀请，触达心仪候选人，增加职位曝光</p>
        </div>
      </div>

      <div class="exclusive_item clearfix" style="margin-right: 0">
        <img src="../assets/image/jiping.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">急聘服务</p>
          <p class="con">8倍投体量职位曝光，外籍人才流量追踪，广告精准投放</p>
        </div>
      </div>

      <div class="exclusive_item clearfix">
        <img src="../assets/image/fouth.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">招聘顾问</p>
          <p class="con">1V1专属招聘顾问，24小时在线服务</p>
        </div>
      </div>

      <div class="exclusive_item clearfix">
        <img src="../assets/image/first.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">发布职位</p>
          <p class="con">不限次数发布职位，支持多条职位信息同时展示</p>
        </div>
      </div>

      <div class="exclusive_item clearfix" style="margin-right: 0">
        <img src="../assets/image/six.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">精准推送</p>
          <p class="con">AI智能匹配，精准外教送达</p>
        </div>
      </div>

      <div class="exclusive_item clearfix">
        <img src="../assets/image/second.png" class="fl" />
        <div class="rside_con fl">
          <p class="con_title">置顶职位</p>
          <p class="con">外教端广告位置顶，站内资源职位曝光</p>
        </div>
      </div>
    </div>

    <el-dialog title="填写联系方式，客服会在24小时内联系您" :visible.sync="dialogFormVisible" center width="35%">
      <el-form :model="form">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model.trim="form.companyName" autocomplete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model.trim="form.phone" autocomplete="off" placeholder="请输入" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClickSure">确 定</el-button>
      </div>
    </el-dialog>

    <bottomComponent></bottomComponent>
  </div>
</template>
<script>
import bottomComponent from "./bottomComponent";
(function () {
  var bp = document.createElement("script");
  var curProtocol = window.location.protocol.split(":")[0];
  if (curProtocol === "https") {
    bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    bp.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();
export default {
  name: "vipPage",
  components: {
    bottomComponent,
  },
  data() {
    return {
      vipList: [],
      dialogFormVisible: false,
      form: {
        companyName: "",
        phone: "",
      },
      formLabelWidth: "120px",
      buyId: "",
    };
  },
  created() {
    this.getVipList();
  },
  computed: {},
  methods: {
    btn_onClick() {
      this.$confirm("？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getVipList() {
      let res = await this.$post("../company/getVipList");
      if (res.code == 200) {
        console.log(res.data);
        this.vipList = res.data.slice(0, 3);
      }
    },
    // 立即购买
    nowBuy(id) {
      this.dialogFormVisible = true;
      this.buyId = id;
    },
    // 确定购买
    async handleClickSure() {
      let reg = /^1[3-9][0-9]{9}$/;
      if (!reg.test(this.form.phone)) {
        this.$message.error("请输入正确手机号");
      } else if (this.form.phone && this.form.companyName) {
        let res = await this.$post("../company/vip/buy", {
          vip_id: this.buyId,
          company_tel: this.form.phone,
          company_name: this.form.companyName,
        });
        if (res.code == 200) {
          this.$message({
            message: "提交成功",
            type: "success",
          });
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      } else {
        this.$message.error("请填写完整信息");
      }
    },
  },
};
</script>
<style scoped>
li {
  list-style: none;
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
  float: left;
}

.fr {
  float: right;
}
.top_wrapper {
  padding-top: 90px;
  margin-top: 80px;
  width: 100%;
  height: 510px;
  background: #1f2532;
}
.top_wrapper h5 {
  margin: 0 0 30px 0;
  font-size: 40px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fec799;
  text-align: center;
}
.top_tips_wrapper {
  display: flex;
  margin-bottom: 90px;
  width: 100%;
  justify-content: center;
}
.top_tips_wrapper .top_img {
  margin-right: 4px;
  width: 24px;
  height: 24px;
}
.top_tips_wrapper .top_con {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(254, 198, 151, 0.8);
}
.top_con_wrapper {
  display: flex;
  margin: 0 auto;
  width: 1180px;
}
.top_con_wrapper .con_item {
  margin-right: 20px;
  padding: 40px 30px 0 30px;
  flex: 1;
  background: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #eeeeee;
}
.con_item .item_title {
  font-size: 30px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #333333;
  text-align: center;
}
.con_item .price {
  margin: 30px 0;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff6010;
  text-align: center;
}
.con_item .btn_wrapper {
  margin: 0 auto;
  width: 220px;
  height: 50px;
  background: #0f0c19;
  border-radius: 8px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fec799;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.con_item .line {
  margin-top: 53px;
  margin-bottom: 45px;
  width: 320px;
  height: 1px;
  background: #eeeeee;
}
.li_wrapper li {
  margin-bottom: 20px;
}
.li_wrapper li .lside_title {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.li_wrapper li .rside_con {
  width: 22px;
  height: 22px;
}
.exclusive_title_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 390px;
  width: 100%;
  height: 198px;
}
.exclusive_title_wrapper img {
  width: 100px;
  height: 4px;
}
.exclusive_title_wrapper h6 {
  margin: 22px 30px;
  font-size: 34px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #f0ba8d;
}
.exclusive_wrapper {
  margin: 0 auto 90px auto;
  width: 1180px;
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
}
.exclusive_wrapper .exclusive_item {
  flex: 0 0 26%;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 40px 37px 0 30px;
  height: 154px;
  background: rgba(241, 188, 144, 0.1);
  border-radius: 8px;
}
.exclusive_item img {
  margin-right: 20px;
  width: 64px;
  height: 64px;
}
.exclusive_item .rside_con {
  width: 220px;
  text-align: left;
}
.exclusive_item .con_title {
  margin-bottom: 10px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.exclusive_item .con {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 24px;
}
.price_height{
  height: 112px;
}
</style>
