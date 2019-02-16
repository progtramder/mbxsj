const app = getApp()
Page({
  onLoad() {
    wx.setNavigationBarTitle({
      title: app.getStudentName(),
    })
  },
  quit() {
    wx.showModal({
      content: `确定退出登陆？`,
      confirmColor: '#F56C6C',
      success: (res) => {
        if (res.confirm) {
          this.doQuit()
        }
      }
    })
  },
  doQuit() {
    wx.clearStorageSync()
    wx.reLaunch({
      url: '../index/index',
    })
  },
})