const regeneratorRuntime = require("../common/runtime")
const app = getApp()
Page({
  async onLoad() {
    try {
      wx.showNavigationBarLoading()
      let res = await app.getStatus(app.getSchool())
      this.status = res.status
      const status = res.status == 'started' ? 'ready' : 'not'
      res = await app.registerInfo(app.getSchool(), app.getStudent())
      const registerCourse = res.course
      res = await app.fetchCourse(app.getSchool(), app.getStudent())
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
      this.timeId = setInterval(this.timer, 1000)
    } finally {
      wx.hideNavigationBarLoading()
    }
  },

  onUnload() {
    clearInterval(this.timeId)
  },

  async timer() {
    try {
      if (this.status != 'started') {
        const res = await app.getStatus(app.getSchool())
        if (this.status != res.status) {
          const course = this.data.course
          course.forEach(e => {
            e.status = 'ready'
          })
          this.setData({
            course
          })
          this.status = res.status
        }
        return
      }

      let res = await app.registerInfo(app.getSchool(), app.getStudent())
      const registerCourse = res.course
      res = await app.fetchCourse(app.getSchool(), app.getStudent())
      const course = this.data.course
      res.data.forEach((e, index) => {
        if (e.name == registerCourse) {
          course[index].registered = true
        } else {
          delete course[index].registered
        }
        course[index].number = e.number
        if (e.number == e.total) {
          course[index].status = 'done'
        } else {
          course[index].status = 'ready'
        }
      })
      this.setData({
        course
      })
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
      wx.showModal({
        content: `是要取消"${course.name}"课程的报名吗？`,
        confirmColor: '#F56C6C',
        confirmText: '是的',
        cancelText: '不是',
        success: (res) => {
          if (res.confirm) {
            app.cancel(app.getSchool(), app.getStudent(), course.name).then(res => {
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
      })
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
            app.register(app.getSchool(), app.getStudent(), course.name).then(res => {
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
