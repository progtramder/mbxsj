const regeneratorRuntime = require("../common/runtime")
const app = getApp()
Page({
  data: {
    student: ''
  },

  getStudent(e) {
    this.data.student = e.detail.value
  },
  async login() {
    const student = this.data.student
    if (student == '') {
      this.alert('学号不能为空')
      return
    }

    if (student.match(/^\d{6}$/)) {
      const y = Number(student.slice(0, 2))
      const d = new Date()
      let grade = d.getFullYear() - 2000 - y
      if (d.getMonth() + 1 >= 9) {
        grade += 1
      }
      if (grade > 5 || grade <= 0) {
        this.alert('学号错误')
        return
      }

      try {
        wx.showNavigationBarLoading()
        const res = await app.login(app.getSchool(), student)
        wx.setStorageSync('student', student)
        wx.setStorageSync('name', res.name)
        wx.setStorageSync('avatar', res.avatar)
        wx.switchTab({
          url: '../index/index'
        })
      } catch(err) {
        this.alert('网络异常')
      } finally {
        wx.hideNavigationBarLoading()
      }
    } else {
      this.alert('学号格式错误')
    }
  },
  alert(content) {
    wx.showModal({
      content: content,
      confirmColor: '#F56C6C',
      confirmText: '知道了',
      showCancel: false
    })
  }
})