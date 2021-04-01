import axios from 'axios'
// import { Message } from 'element-ui'
import qs from 'qs'
// 环境的切换
let activeUrl = false
let use_url = ''
if (activeUrl == false) {
  // 测试，本地
  use_url = 'http://localhost.apex.link'
} else {
  // 正式服务器
  use_url = 'https://api.apex.link'
}

axios.defaults.timeout = 120000
axios.defaults.baseURL = use_url + '/api/admin/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie

    if (config.url === 'upload') {
      config.headers = {
        'Content-Type': 'multipart/form-data'
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
    } else {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      let token = localStorage.getItem('token')
      var data = config.data
      if (token && data) {
        data.token = token
      }
      let postData = qs.stringify(data)
      config.data = postData
    }

    // if(token){
    //   config.params = {'token':token}
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        query: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    this.$message.error('content error')
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}, baseURL_flag = 0) {

  if (baseURL_flag == 0) {
    axios.defaults.baseURL = use_url + '/api/admin/'
  } else if (baseURL_flag == 1) {
    axios.defaults.baseURL = use_url + '/api/index/'
  } else if (baseURL_flag == 2) {
    axios.defaults.baseURL = use_url + '/api/admin/public/'
  }

  let token = localStorage.getItem('token')
  if (token && params) {
    params.token = token
  }

  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, baseURL_flag = 0) {

  if (baseURL_flag == 0) {
    axios.defaults.baseURL = use_url + '/api/admin/'
  } else if (baseURL_flag == 1) {
    axios.defaults.baseURL = use_url + '/api/index/'
  } else if (baseURL_flag == 2) {
    axios.defaults.baseURL = use_url + '/api/admin/public/'
  } else if (baseURL_flag == 3) {
    axios.defaults.baseURL = use_url + '/api/company'
  }

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if (response.data.code === 1000201 || response.data.code === 1000200) {
          this.$router.push('/login')
          // this.$message.error('Please login again.')
        }

        if (response.data.code === 100000) {
          this.$message.error('sever error')
        }

        resolve(response.data)

      }, err => {
        this.$message.error('content error')
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

export function baseURL() {
  return use_url
}
