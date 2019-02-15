const regeneratorRuntime = require("../common/runtime")
const app = getApp()
Page({

  async onLoad(options) {
    const student = wx.getStorageSync('student')
    const name = wx.getStorageSync('name')
    const avatar = wx.getStorageSync('avatar')
    if (student == '') {
      wx.reLaunch({
        url: '../login/index',
      })
      return
    }

    app.setStudent(student)
    app.setStudentName(name)
    app.setStudentAvatar(avatar)
    try {
      const res = await this.getCode()
      app.setSessionKey(res)
    } catch(err) {
      console.log(err)
    }
  },

  onShareAppMessage() {

  },

  getCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            resolve(res.code)
          } else {
            reject(res.errMsg)
          }
        }
      })
    })
  }
})