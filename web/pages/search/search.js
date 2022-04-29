var Api = require('../../utils/api.js');
var erWeiMa = ['QR_CODE','DATA_MATRIX','PDF_417','WX_CODE']

Page({
    onShareAppMessage(o){

    },
  data: {
    inputShowed: true,
    inputVal: "",
    result : {"total":0,"list":[]},
    eatType:0,
    eatRank:[],
    eatCurrent:[]
  },
  onLoad(e) {
    console.log("onload",e)
    if (e.eat_type) {
      this.setData({
        eatType:e.eat_type
      })
    }

    var that = this
    //获取热搜
    wx.request({
      url:Api.EatRank(),
      success(res) {
        that.setData({
          eatRank:res.data
        })
      }
    })

    wx.request({
      url:Api.EatCurrent(),
      success(res) {
        that.setData({
          eatCurrent:res.data
        })
      }
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false,
      result:{"total":0,"list":[]}
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      inputVal: e.detail.value
    });
    var that = this
    wx.request({
      url: Api.search({q:e.detail.value}),
      success: function(res) {
        console.log(res.data)
        that.setData({
          result : res.data,
          loadProgress: 100
        });
        wx.hideLoading()
      }
    })
  },
  scan(e){
    console.log("scan")
    var that = this
    wx.scanCode({
      success(res) {
        if (erWeiMa.indexOf(res.scanType) !== -1) {
          wx.showToast({
            title:"请扫描商品条形码",
            icon:"none"
          })
        }else{
          console.log(res.result)
          wx.request({
            url:Api.scanCode({code:res.result}),
            success(res) {
              var e = {detail:{value:res.data.name}}
              that.inputTyping(e)
            }
          })
        }
      }
    })
  }
});