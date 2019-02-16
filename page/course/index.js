const regeneratorRuntime = require("../common/runtime")
const app = getApp()
Page({
  async onLoad() {
    try {
      wx.showNavigationBarLoading()
      await this.loadCourses()
      this.timeId = setInterval(this.timer, 1000)
    } catch (err) {
      wx.showModal({
        content: '网络异常',
        confirmColor: '#F56C6C',
        confirmText: '知道了',
        showCancel: false
      })
    } finally {
      wx.hideNavigationBarLoading()
    }
  },

  onUnload() {
    clearInterval(this.timeId)
  },

  async loadCourses() {
    let res = await app.getStatus()
    const status = res.status == 'started' ? 'ready' : 'not'
    res = await app.registerInfo()
    const registerCourse = res.course
    res = await app.fetchCourse()
    const course = res.data
    course.forEach(e => {
      if (e.name == registerCourse) {
        e.registered = true
      }
      e.status = e.total == e.number ? 'done' : status
    })
    this.setData({
      course
    })
  },

  async timer() {
    try {
      await this.loadCourses()
    } catch(err) {
      console.log('网络异常')
    }
  },

  //返回已报课程的index，没有则返回 -1
  iRegistered() {
    const course = this.data.course
    let i = -1
    course.forEach((e, index) => {
      if (e.registered) i = index
    })
    return i
  },
  onRegister(e) {
    const index = e.currentTarget.dataset.index
    const course = this.data.course[index]
    const iCourse = this.iRegistered()
    if (iCourse == index) {
      /*wx.showModal({
        content: `是要取消"${course.name}"课程的报名吗？`,
        confirmColor: '#F56C6C',
        confirmText: '是的',
        cancelText: '不是',
        success: (res) => {
          if (res.confirm) {
            app.cancel(course.name).then(res => {
              wx.showModal({
                content: res.errMsg,
                confirmColor: '#F56C6C',
                confirmText: '知道了',
                showCancel: false
              })
              if (res.errCode == 0) {
                delete course.registered
              }
            }).catch(err => {
              wx.showModal({
                content: '网络异常',
                confirmColor: '#F56C6C',
                confirmText: '知道了',
                showCancel: false
              })
            })
          }
        }
      })*/
      return
    }
    if (course.status == 'ready') {
      if (iCourse != -1) {
        wx.showModal({
          content: '只能报一门课程',
          confirmColor: '#F56C6C',
          confirmText: '知道了',
          showCancel: false
        })
        return
      }
      wx.showModal({
        content: `确认要报名"${course.name}"课程吗？`,
        confirmColor: '#F56C6C',
        success: (res) => {
          if (res.confirm) {
            app.register(course.name).then(res => {
              wx.showModal({
                content: res.errMsg,
                confirmColor: '#F56C6C',
                confirmText: '知道了',
                showCancel: false
              })
              /*if (res.errCode == 0) {
                course.registered = true
              }*/
            }).catch(err => {
              wx.showModal({
                content: '网络异常',
                confirmColor: '#F56C6C',
                confirmText: '知道了',
                showCancel: false
              })
            })
          }
        }
      })
    } 
  },
})
