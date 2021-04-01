<template>
  <div class="footer_wrapper">
    <div class="footer_top">
      <img src="../../assets/bottom_logo.png" class="bottom_logo" />
      <p class="company_name">寰球阿帕斯</p>
      <!-- <p class="con">Help you find a good employer</p> -->
    </div>
    <div class="concat">Contact Us: +86 13512906375</div>
    <div class="concat">Email: service@apex.link</div>
    <div class="concat" style="margin-top: 0px;">
      <span>Find us on Social Media：</span>
      <ul style="display: inline-block;font-size:20px;" class="fenxiang">
        <li style="display: inline-block;" >
          <a
            target="_blank"
            class="facebook"
            href="https://www.facebook.com/Apex-Global-100338515321616"
          >
            <i class="fa fa-facebook" aria-hidden="true"></i>
          </a>
        </li>
        <li
          style="display: inline-block;margin-left:4px;"
        >
          <a
            target="_blank"
            class="linkedin"
            href="https://www.linkedin.com/company/apexglobal%E5%AF%B0%E7%90%83%E9%98%BF%E5%B8%95%E6%96%AF/?viewAsMember=true"
          >
            <i class="fa fa-linkedin" aria-hidden="true"></i>
          </a>
        </li>
        <li
          style="display: inline-block;margin-left:4px;"
        >
          <a
            target="_blank"
            class="twitter"
            href="https://twitter.com/apexglobal4/"
          >
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </li>
        <li
          style="display: inline-block;margin-left:4px;"
        >
          <a
            target="_blank"
            class="instagram"
            href="https://www.instagram.com/apex_global_lee/"
          >
            <i class="fa fa-instagram" aria-hidden="true"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
<style scoped>
.footer_wrapper {
  padding: 32px 40px;
  width: 100%;
  height: 250px;
  background: #1f2532;
}
.footer_top {
  display: flex;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.footer_top .bottom_logo {
  width: 50px;
  height: 50px;
}
.footer_top .company_name {
  margin: 0 20px 0 18px;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 50px;
}
.footer_top .con {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 50px;
}
.concat {
  margin: 38px 0 20px 0;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.2rem;
}
.customer {
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
