import request from "./http.js";


// 根据token获取信息
export function getInfoByToken(params) {
  return request({
    url: "/api/index/getStatusByToken",
    method: "post",
    data: params
  });
}
// 工作接口列表
export function getJobs(params) {
  return request({
    url: "/api/company/job/allList",
    method: "post",
    data: params
  });
}
// 新闻接口
export function getNews(page, pageSize) {
  return request({
    url: "/api/website/getEnArticleList?page=" + page + "&pageSize=" + pageSize,
    method: "get"
  });
}
// 工作详情
export function jobDesc(params) {
  return request({
    url: "/api/company/job/desc",
    method: "post",
    data: params
  });
}
// 获取国籍
export function getCountryList(params) {
  return request({
    url: "/api/index/getCountryList",
    method: "get",
    data: params
  });
}
// 获取省份
export function getProvince(params) {
  return request({
    url: "/api/index/getProvince",
    method: "post",
    data: params
  });
}
// 获取城市
export function getCity(params) {
  return request({
    url: "/api/index/getCity",
    method: "post",
    data: params
  });
}
// 上传接口
export function upload(params) {
  return request({
    url: "/api/index/upload",
    method: "post",
    data: params
  });
}
// 提交第一页信息
export function submitStep(params) {
  return request({
    url: "/api/index/infoComment",
    method: "post",
    data: params
  });
}
// 通过首字母获取城市
export function getCityByLetter(id) {
  return request({
    url: "/api/index/getCityByChar?char=" + id,
    method: "get"
  });
}
// 退出登陆
export function logout(params) {
  return request({
    url: "/api/index/logout",
    method: "post",
    data: params
  });
}
// 获取草稿或者详情
export function getTeachCommentInfo(data) {
  return request({
    url: "/api/index/getTeachCommentInfo",
    method: "get",
    params: data
  });
}
// 审核通过后的教师详情
export function getTeachInfo(data) {
  return request({
    url: "/api/index/getTeachInfo",
    method: "get",
    params: data
  });
}
// 编辑用户信息
export function updateInfo(data) {
  return request({
    url: "/api/index/updateInfo",
    method: "post",
    params: data
  });
}
// 收藏
export function jobCollect(data) {
  return request({
    url: "/api/index/jobCollect",
    method: "post",
    params: data
  });
}
// 获取职位收藏
export function jobCollectList(data) {
  return request({
    url: "/api/index/jobCollectList",
    method: "get",
    params: data
  });
}
// 面试职位邀请
export function interviewList(data) {
  return request({
    url: "/api/index/interview/list",
    method: "post",
    params: data
  });
}
// 职位邀请详情
export function interviewDesc(data) {
  return request({
    url: "/api/index/interview/desc",
    method: "post",
    params: data
  });
}
// 我的面试
export function interviewMy(data) {
  return request({
    url: "/api/index/interview/my",
    method: "post",
    params: data
  });
}
// 进入房间
export function intoRoom(data) {
  return request({
    url: "/api/intoRoom",
    method: "post",
    params: data
  });
}
// 职位置顶
export function topList(data) {
  return request({
    url: "/api/company/job/topList",
    method: "get",
    params: data
  });
}
// 取消、修改面试
export function teachUpdateInterview(data) {
  return request({
    url: "/api/index/interview/teachUpdateInterview",
    method: "post",
    params: data
  });
}

//同意/拒绝面试
export function inertAccept(params) {
  return request({
    url: "/api/index/interview/joinInterview",
    method: "post",
    data: params
  });
}
