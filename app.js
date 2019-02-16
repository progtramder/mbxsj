const regeneratorRuntime = require("./page/common/runtime")
const server = 'localhost' //'xsj.chneic.sh.cn'
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

  promise(url) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
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
  cancel(course) {
    const school = this.getSchool()
    const student = this.getStudent()
    const url = `https://${server}/cancel?school=${school}&student=${student}&course=${course}`
    return this.promise(url)
  },

  fetchCourse() {
    const school = this.getSchool()
    const student = this.getStudent()
    const url = `https://${server}/course?school=${school}&student=${student}`
    return this.promise(url)
  },

  getStatus() {
    const school = this.getSchool()
    const url = `https://${server}/status?school=${school}`
    return this.promise(url)
  },

  register(course) {
    const school = this.getSchool()
    const student = this.getStudent()
    const url = `https://${server}/register?school=${school}&student=${student}&course=${course}`
    return this.promise(url)
  },

  async registerInfo() {
    const school = this.getSchool()
    const student = this.getStudent()
    const url = `https://${server}/register-info?school=${school}&student=${student}`
    const res = await this.promise(url)
    return res
  },

  async registerHistory() {
    const school = this.getSchool()
    const student = this.getStudent()
    const url = `https://${server}/register-history?school=${school}&student=${student}`
    const res = await this.promise(url)
    return res
  },

  async login(student) {
    const school = this.getSchool()
    const url = `https://${server}/login?school=${school}&student=${student}`
    const res = await this.promise(url)
    return res
  }
})
