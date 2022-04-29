// pages/eat-history/eat-history.js
var Api = require('../../utils/api.js');

Page({
  data: {
    addMoreText:"点击加载更多...",
    eatDates:[],
    result : []
  },
  onShareAppMessage(o){

  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url : Api.EatDates(),
      success(res) {
        that.setData({
          eatDates:res.data
        })
        that.getData()
      }
    })
  },
  getData : function () {
    var day = this.data.eatDates.pop()
    if (!day) {
      this.setData({
        addMoreText:"没有数据了😁"
      })
      return
    }

    var that = this
    wx.request({
      url : Api.Eat({"day":day}),
      success(res) {
        res.data.date = res.data.date.slice(5)
        var tempArr = that.data.result
        tempArr.push(res.data)
        that.setData({
          result:tempArr
        })
        //如果是第一天，再加一天的数据
        console.log(tempArr.length)
        if (tempArr.length === 1) {
          that.getData()
        }
      }
    })
  },
  addMore : function () {
    this.getData()
  },
  onReachBottom(e){
    this.getData()
  }

})