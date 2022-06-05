var Api = require('../../utils/api.js');

Page({
  data: {
    target: ["增肥", "养生", "减肥"],
    userInfo: {
      target: 0,
      weight: 0,
      height: 0,
      age: 0,
      gender: 1
    }
  },
  onShareAppMessage(o) {

  },
  onShow: function () {
    var that = this
    wx.request({
      url: Api.userInfo(),
      success(res) {
        console.log(res)
        that.setData({
          userInfo: res.data
        })
      }
    })
  },


})