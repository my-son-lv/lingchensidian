<!--  -->
<template>
  <div>
    <commonNav></commonNav>
    <div class="content">
      <div class="t1 mt_120">Hi {{nick_name}}</div>
      <div class="t1 mt_18">Welcome to Apex Global</div>
      <van-button type="default" class="btn mt_60" @click="next()">Apply for teaching position</van-button>
      <div class="card mt_60">
        <div class="t2">
          You need to fill in a simple document to enter the platform
        </div>
        <div class="images">
          <img class="image" src="../../assets/home_0.png" />
          <img class="image img_c" src="../../assets/home_1.png" />
          <img class="image img_r" src="../../assets/home_2.png" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import commonNav from "../../components/commonNav/commonNav";
import { getStatusByToken } from "../../apis/baseUrls";

export default {
  name: "home",
  //import引入的组件需要注入到对象中才能使用
  components: { commonNav },
  data() {
    //这里存放数据
    return {
      checked: false,
      nick_name: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    next() {
      console.log("next");
      this.$router.push({ name: "basicInformation" });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getStatusByToken({ token: localStorage.getItem("token") }).then(res => {
      if (res.data.code == 200) {
        this.nick_name = res.data.data.nick_name;

        if (
          (res.data.data.status === 2 ||
            res.data.data.status === 3 ||
            res.data.data.status === 1) &&
          (res.data.data.is_read === 1 || res.data.data.is_read === 0)
        ) {
          this.$router.push({ name: "result" });
        } else if (res.data.data.status === 2 && res.data.data.is_read === 2) {
          this.$router.push('/result');
        } else {
        }
      } else {
        Toast.fail(res.data.msg);
      }
    });
  }
};
</script>
<style scoped>
.content {
  padding: 0 30px;
}
.t1 {
  font-size: 32px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 1px;
}
.t2 {
  font-size: 28px;
  font-weight: 400;
  color: rgba(68, 68, 68, 1);
  line-height: 46px;
}
.t3 {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.mt_120 {
  margin-top: 24%;
}
.mt_60 {
  margin-top: 18%;
}
.mt_30 {
  margin-top: 30px;
}
.mt_18 {
  margin-top: 3.6%;
}
.input {
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 1px solid rgba(204, 204, 204, 1);
  height: 98px;
  padding-top: 30px;
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.btn {
  height: 98px;
  background: rgba(7, 140, 169, 1);
  border-radius: 10px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  width: 100%;
}

.fr {
  float: right;
}

.card {
  background: rgba(248, 248, 248, 1);
  padding: 60px 30px;
}

.images {
  margin: 120px 60px 60px 60px;
  position: relative;
  height: 120px;
}

.image {
  width: 120px;
  height: 120px;
  position: absolute;
}

.img_r {
  right: 0;
}

.img_c {
  left: 50%;
  transform: translateX(-50%);
}
</style>