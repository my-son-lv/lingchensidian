import axios from "axios";
import router from "../router/index";
import qs from "qs";

import { Dialog, Toast, Notify } from "vant";
// 环境的切换
let activeUrl = true;
// if (process.env.NODE_ENV == "development") {
//   axios.defaults.baseURL = "/apis";
// } else if (process.env.NODE_ENV == "production") {
  if (activeUrl == false) {
    // 测试
    axios.defaults.baseURL = "https://api.globalapex.cn/";
  } else {
    // 正式
    axios.defaults.baseURL = "https://api.apex.link/";
  }
// }

// 请求超时时间
axios.defaults.timeout = 5000;
let reqNum = 0;
// 设置开始loading与结束loading
export function startLoading() {
  if (reqNum === 0) {
    Toast.loading({
      message: "",
      forbidClick: true,
      overlay: true,
    });
  }
  reqNum++;
}
export function endLoading() {
  setTimeout(closeLoading, 300);
}
export function closeLoading() {
  if (reqNum <= 0) {
    return;
  } else {
    reqNum--;
  }
  if (reqNum === 0) {
    Toast.clear();
  }
}
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//请求拦截器
axios.interceptors.request.use(
  (param) => {
    var data = param.data;
    let postData = qs.stringify(data);
    param.data = postData;

    startLoading();
    return param;
  },
  (error) => {
    // 请求错误
    return Promise.reject(error);
  }
);
// 返回拦截
axios.interceptors.response.use(
  (response) => {
    endLoading();
    if (response.data.code === 1000201 || response.data.code === 1000200) {
      localStorage.clear();
      Notify({
        type: "warning",
        message: "Please login again.",
      });
      router.push("/register");
    }
    return response;
  },
  (error) => {
    endLoading();

    Toast.fail("content error");

    // if (error.message.includes('timeout')) {
    //   Dialog.alert({
    //     confirmButtonText: "我知道了",
    //     confirmButtonColor: "#E51C23",
    //     message: '请求超时,请刷新当前页面!'
    //   });
    // }
    // 错误提醒
    // Message.error(error.response.data.msg)

    // const {
    //   status
    // } = error.response.data.code
    // if (status == 88888 || response.data.code == 88887) {
    //   console.log('token过期或已在其他地方登陆!')
    // }
    return Promise.reject(error);
  }
);
export default axios;
