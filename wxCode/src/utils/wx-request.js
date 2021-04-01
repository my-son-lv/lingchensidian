// const host = 'https://api.globalapex.cn'
const host = 'https://api.apex.link'
// 更改首页show字段
let reqNum = 0
export function startLoading() {
    reqNum++;
}
export function closeLoading() {
    if (reqNum <= 0) {
        return;
    } else {
        reqNum--;
    };
}

function request(url, method, data, header = {}, loading) {
    return new Promise((resolve, reject) => {
        startLoading();
        wx.request({
            url: host + url, // 仅为示例，并非真实的接口地址
            method: method,
            data: data,
            headers: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.data.code == 1000201 || res.data.code == 1000202) {
                    wx.redirectTo({
                        url: "../../pages/index/main"
                    });
                    wx.clearStorageSync();
                }
                resolve(res.data)
            },
            fail: function (res) {
                // reject(false)
            },
            complete: function () {

            }
        })
    })
}

function get(obj) {
    return request(obj.url, 'GET', obj.data)
}

function post(obj) {
    return request(obj.url, 'POST', obj.data)
}

export default {
    request,
    get,
    post,
    host
}