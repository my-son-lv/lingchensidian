import request from "./http.js";
//   提交第一页信息
export function firstMobileComment(params) {
  return request({
    url: "/api/index/infoComment",
    method: "post",
    data: params,
  });
}
// 获取国籍
export function getCountryList(params) {
  return request({
    url: "/api/index/getCountryList",
    method: "get",
    data: params,
  });
}

// 登录
export function login(params) {
  return request({
    url: "/api/index/login",
    method: "post",
    data: params,
  });
}
// 获取省份
export function getProvince(params) {
  return request({
    url: "/api/index/getProvince",
    method: "post",
    data: params,
  });
}
// 获取城市
export function getCity(params) {
  return request({
    url: "/api/index/getCity",
    method: "post",
    data: params,
  });
}

// 注册需验证用户名是否存在
export function isMemberExist(params) {
  return request({
    url: "/api/index/isMemberExist",
    method: "post",
    data: params,
  });
}

// 发送验证码
export function sendCode(params) {
  return request({
    url: "/api/index/sendCode",
    method: "post",
    data: params,
  });
}

// 注册
export function register(params) {
  return request({
    url: "/api/index/register",
    method: "post",
    data: params,
  });
}

// 找回密码
export function forgetPassword(params) {
  return request({
    url: "/api/index/forgetPassword",
    method: "post",
    data: params,
  });
}

// 使用token登录
export function getStatusByToken(params) {
  return request({
    url: "/api/index/getStatusByToken",
    method: "post",
    data: params,
  });
}
// 获取草稿信息
export function getCommentInfo(data) {
  return request({
    url: "/api/index/getTeachCommentInfo",
    method: "get",
    params: data,
  });
}
// 详情接口
export function desc(params) {
  return request({
    url: "/api/index/getTeachCommentInfo",
    method: "post",
    data: params,
  });
}
// 提交新资料
export function upStatusToNewUser(params) {
  return request({
    url: "/api/index/upStatusToNewUser",
    method: "post",
    data: params,
  });
}
// 获取工作列表
export function allJobsList(params) {
  return request({
    url: "/api/company/job/allList",
    method: "post",
    data: params,
  });
}
// 获取工作详情
export function jobDesc(params) {
  return request({
    url: "/api/company/job/desc",
    method: "post",
    data: params,
  });
}
// 职位申请
export function jobApplication(params) {
  return request({
    url: "/api/index/job/jobApplication",
    method: "post",
    data: params,
  });
}
// 收藏
export function jobCollect(data) {
  return request({
    url: "/api/index/jobCollect",
    method: "post",
    params: data,
  });
}
