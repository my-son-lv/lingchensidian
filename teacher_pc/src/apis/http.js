import axios from "axios";
import router from "../router/index";
import qs from "qs";
import { Loading } from "element-ui";
// 环境的切换
let activeUrl = false;
if (activeUrl == false) {
  // 测试
  axios.defaults.baseURL = "http://localhost.apex.link/";
} else {
  // 正式
  axios.defaults.baseURL = "https://api.apex.link/";
}
let loading;
// 请求超时时间
axios.defaults.timeout = 1200000;
let reqNum = 0;
// 设置开始loading与结束loading
export function startLoading() {
  if (reqNum === 0) {
    loading = Loading.service({
      lock: true,
      text: "loading...",
      background: "rgba(0,0,0,0.7)"
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
    loading.close();
  }
}
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//请求拦截器
axios.interceptors.request.use(
  param => {
    var data = param.data;
    let postData = qs.stringify(data);
    param.data = postData;
    if (param.url === "/api/index/upload") {
      param.headers = {
        "Content-Type": "multipart/form-data"
      };
    }
    startLoading();
    return param;
  },
  error => {
    // 请求错误
    return Promise.reject(error);
  }
);
// 返回拦截
axios.interceptors.response.use(
  response => {
    endLoading();
    if (response.data.code == 1000201 || response.data.code == 1000200) {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/register");
    }
    return response;
  },
  error => {
    endLoading();
    return Promise.reject(error);
  }
);
export default axios;
