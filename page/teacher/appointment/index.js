const regeneratorRuntime = require("../../common/runtime")
const app = getApp()
Page({
  async onLoad({id, name}) {
    try {
      wx.showNavigationBarLoading()
      const db = wx.cloud.database();
      wx.setNavigationBarTitle({ title: name })
    } finally {
      wx.hideNavigationBarLoading()
    }
  }
})
