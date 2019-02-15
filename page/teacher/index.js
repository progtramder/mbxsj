const regeneratorRuntime = require("../common/runtime")
const app = getApp()
Page({
  async onShow() {
    try {
      wx.showNavigationBarLoading()
      /*const db = wx.cloud.database();
      const res = await db.collection('teacher').limit(10).get()
      this.setData({
        teacher: res.data
      })*/
      wx.setNavigationBarTitle({ title: '约见老师' })
    } finally {
      wx.hideNavigationBarLoading()
    }
  },
  async onReachBottom() {
    try {
      wx.showLoading()
      const db = wx.cloud.database();
      let teacher = this.data.teacher
      const res = await db.collection('teacher').skip(
        teacher.length
      ).limit(10).get()
      teacher.push(...res.data)
      this.setData({
        teacher
      })
    } finally {
      wx.hideLoading()
    }
  },
})
