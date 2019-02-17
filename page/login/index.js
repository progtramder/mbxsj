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
        wx.showLoading()
        const res = await app.login(student)
        if (res.errCode == 1) {
          this.alert("学号不存在")
          return
        }

        this.doLogin(student, res.name, res.avatar)

      } catch(err) {
        this.alert('网络异常')
      } finally {
        wx.hideLoading()
      }
    } else {
      this.alert('学号格式错误')
    }
  },

  doLogin(student, name, avatar) {
    wx.showModal({
      title: '确定登陆？',
      content: `${student} ${name}`,
      confirmColor: '#F56C6C',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('student', student)
          wx.setStorageSync('name', name)
          wx.setStorageSync('avatar', avatar)
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
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