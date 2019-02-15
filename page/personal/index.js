const regeneratorRuntime = require("../common/runtime")
const app = getApp()
Page({
   onLoad(options) {
    this.setData({
      avatar: app.getStudentAvatar(),
      student: app.getStudentName()
    })
  },

  async onShow() {
    const res = await app.registerHistory(app.getSchool(), app.getStudent())
    this.setData({
      courses: res.data
    })
  },
})
