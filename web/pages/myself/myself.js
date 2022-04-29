var Api = require('../../utils/api.js');

Page({
  data: {
    userInfo:{weight:0,height:0,age:0,gender:1}
  },
  onShareAppMessage(o){

  },
  onShow: function () {
    var that = this
    wx.request({
      url: Api.userInfo(),
      success(res) {
        console.log(res)
        that.setData({
          userInfo:res.data
        })
      }
    })
  },


})