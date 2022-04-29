// pages/info.js
var Api = require('../../utils/api.js');

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //是否已经获取过了
    wxInfoNo:true,

    num: 0,
    numList: [{
      name: '目标'
    },{
      name: '身高'
    }, {
      name: '体重'
    }, {
      name: '年龄'
    }, {
      name: '完成'
    }],
    target:["增肥","养生","减肥"],
    targetValue:[1],
    height:[150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200],
    heightValue: [20],
    weight: [40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
    weightValue:[20],
    age:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
    ageValue:[20]
  },
  onShareAppMessage(o){

  },
  onLoad: function (options) {
    var that = this
    //查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              that.updateUserInfo(res.userInfo)
              that.setData({
                wxInfoNo:false
              })
            }
          })
        }
      }
    })

    var num = 0
    if (options.num) {
      num = parseInt(options.num)
    }
    //初始化用户数据
    wx.request({
      url:Api.userInfo(),
      success(res) {
        console.log(res.data)
        var hidx  = that.data.height.indexOf(res.data.height)
        var hv = [hidx]

        var widx = that.data.weight.indexOf(res.data.weight)
        var wv = [widx]

        var aidx = that.data.age.indexOf(parseInt(res.data.age))
        var av = [aidx]
        that.setData({
          num:num,
          targetValue:[res.data.target],
          heightValue:hv,
          weightValue:wv,
          ageValue:av
        })
      }
    })


  },
  numSteps() {
    //最后一步提交数据
    if (this.data.num === 3) {
      var params = {
        target:this.data.targetValue[0],
        height: this.data.height[this.data.heightValue[0]],
        weight: this.data.weight[this.data.weightValue[0]],
        age: this.data.age[this.data.ageValue[0]]
      }
      console.log(params)
      wx.request({
        url:Api.userInfo(),
        method:"POST",
        data:params,
        success(res) {
          console.log(res)
        }
      })
    }
    var num = this.data.num === this.data.numList.length - 1 ? this.data.numList.length - 1 : this.data.num + 1
    console.log(num)
    this.setData({
      num: num
    })
  },
  bindTargetChange(e) {
    this.setData({
      targetValue: e.detail.value
    })
  },
  bindHeightChange(e){
    console.log(e)
    this.setData({
      heightValue: e.detail.value
    })
  },
  bindWeightChange(e){
    console.log(e)
    this.setData({
      weightValue: e.detail.value
    })
  },
  bindAgeChange(e){
    console.log(e)
    this.setData({
      ageValue: e.detail.value
    })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail)
    if (e.detail.errMsg !== "getUserInfo:ok") {
      wx.showToast({
        title: '粑粑~请授权',
        icon: 'none',
        duration: 2000
      });
    }else{
      //获取用户信息上传
      this.updateUserInfo(e.detail.userInfo)
      wx.showToast({
        title: '已完成',
        icon: 'success',
        duration: 4000,
        complete(res) {
          wx.switchTab({
            url:"/pages/myself/myself"
          })
        }
      });
    }
  },
  updateUserInfo(userInfo){
    var params = {
      "nickname":userInfo.nickName,
      "avatar_url":userInfo.avatarUrl,
      "city":userInfo.city,
      "province":userInfo.province,
      "country":userInfo.country,
      "gender":userInfo.gender,
      "language":userInfo.language
    }
    wx.request({
      url:Api.userInfo(),
      method:"POST",
      data:params,
      success(res) {
        console.log(res)
      }
    })
  }

})