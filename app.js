const regeneratorRuntime = require("./page/common/runtime")
const server = 'localhost'
App({
  globalData: {
  },

  onLaunch: function () {
    
    wx.cloud.init({
      env: "lingying-cd6717",
      traceUser: true,
    })
  },

  getSchool() {
    return 'mbxsj'
  },
  getStudent() {
    return this.globalData.student
  },
  setStudent(student) {
    this.globalData.student = student
  },
  getStudentName() {
    return this.globalData.name
  },
  setStudentName(name) {
    this.globalData.name = name
  },
  getStudentAvatar() {
    return this.globalData.avatar
  },
  setStudentAvatar(avatar) {
    this.globalData.avatar = avatar
  },
  getSessionKey() {
    return this.globalData.session_key
  },
  setSessionKey(key) {
    this.globalData.session_key = key
  },

  cancel(school, student, course) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/cancel?school=${school}&student=${student}&course=${course}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },

  fetchCourse(school, student) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/course?school=${school}&student=${student}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  getStatus(school) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/status?school=${school}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  register(school, student, course) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/register?school=${school}&student=${student}&course=${course}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  async registerInfo(school, student) {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/register-info?school=${school}&student=${student}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    return res
  },
  async registerHistory(school, student) {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/register-history?school=${school}&student=${student}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    return res
  },
  async login(school, student) {
    const res = await new Promise((resolve, reject) => {
      wx.request({
        url: `https://${server}/login?school=${school}&student=${student}`,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          resolve(res.data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
    return res
  }
})
