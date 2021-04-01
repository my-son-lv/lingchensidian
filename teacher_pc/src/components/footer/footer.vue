<template>
  <div class="footer_wrapper">
    <div class="bottom_wrapper">
      <div class="top_con">
        <img src="../../assets/image/bottom_01.png" />
        <p style="margin:0 20px 0 10px">寰球阿帕斯</p>
        <!-- <p>Help you find a good employer</p> -->
      </div>
      <div class="bottom_con">
        <p style="margin-bottom:10px;">Contact: +86 13512906375</p>
        <p style="margin-bottom:10px;">Email: service@apex.link</p>
        <div style="color:white;">
          <span>Find us on Social Media：</span>
          <ul style="display: inline-block;font-size:20px;" class="fenxiang">
            <li
              style="display: inline-block;"
              @mouseover="hover1 = true"
              @mouseleave="hover1 = false"
            >
              <a
                target="_blank"
                class="facebook"
                href="https://www.facebook.com/Apex-Global-100338515321616"
                :style="hover1==true ? 'color:#078ca9;' : ''"
              >
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li
              style="display: inline-block;margin-left:4px;"
              @mouseover="hover2 = true"
              @mouseleave="hover2 = false"
            >
              <a
                target="_blank"
                class="linkedin"
                href="https://www.linkedin.com/company/apexglobal%E5%AF%B0%E7%90%83%E9%98%BF%E5%B8%95%E6%96%AF/?viewAsMember=true"
                :style="hover2==true ? 'color:#078ca9;' : ''"
              >
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li
              style="display: inline-block;margin-left:4px;"
              @mouseover="hover3 = true"
              @mouseleave="hover3 = false"
            >
              <a
                target="_blank"
                class="twitter"
                href="https://twitter.com/apexglobal4/"
                :style="hover3==true ? 'color:#078ca9;' : ''"
              >
                <i class="fa fa-twitter" aria-hidden="true"></i>
              </a>
            </li>
            <li
              style="display: inline-block;margin-left:4px;"
              @mouseover="hover4 = true"
              @mouseleave="hover4 = false"
            >
              <a
                target="_blank"
                class="instagram"
                href="https://www.instagram.com/apex_global_lee/"
                :style="hover4==true ? 'color:#078ca9;' : ''"
              >
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hover1: false,
      hover2: false,
      hover3: false,
      hover4: false,
    };
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
.footer_wrapper {
  width: 100%;
  height: 246px;
  background: #1f2532;
}
.bottom_wrapper {
  margin: 0 auto;
  width: 1200px;
}
.top_con {
  display: flex;
  align-items: center;
  width: 100%;
  height: 103px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.top_con p {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.bottom_con {
  margin-top: 38px;
}
.bottom_con p {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.fenxiang li:hover {
  color: red;
}
</style>
