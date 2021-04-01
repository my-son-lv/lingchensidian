<template>
  <div>
    <div>
      <img
        src="https://files.apex.link/apexlink/2020121520112070342243.png"
        class="set_img"
      />
      <div class="btn_wrapper">
        <button class="open_btn" open-type="contact">立即开启</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {},
  onLoad(options) {},
  // 退出聊天页面的时候所有状态清空
  onUnload() {},

  methods: {},
  destory() {},
};
</script>
<style>
page {
  background: #f5f5f5;
}
</style>
<style scoped>
.set_img {
  position: fixed;
  width: 100%;
  height: 100%;
}
.btn_wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  background: #ffffff;
  border-top: 0.5px solid #eeeeee;
  z-index: 99;
}
.btn_wrapper .open_btn {
  width: 343px;
  height: 49px;
  background: #078ca9;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 49px;
  text-align: center;
}
</style>
