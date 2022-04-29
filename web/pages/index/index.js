var wxCharts = require('../../utils/wxcharts.js');
var Api = require('../../utils/api.js');
var columnChart = null;
var targetData = [0,0,0,0];
var currentData = [0,0,0,0];

Page({
  data: {
    //运动列表
    sports: ["静坐", "轻度运动", "中度运动", "重度运动","高强度运动"],
    sportsVal: [1.2, 1.37, 1.55, 1.73, 1.9],
    sportIndex:0,
    //饮食类型
    tabs: ["早餐", "午餐", "晚餐", "零食"],
    //列表切换
    TabCur: 0,
    //食用列表
    eat:{date:"",uid:"",eat_score:0,breakfast:[],lunch:[],dinner:[],snacks:[],score:{},exercise:1.37},

    ListTouchStart:0,
    ListTouchDirection:"",
    modalName:null,
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  onShareAppMessage(o){

  },
  onShow:function(){
    var openid = wx.getStorageSync("openid")
    if (openid === "") {
      console.log("onShow no openid")
      return
    }
    this.indexData()
  },
  onLoad:function (e) {
    var openid = wx.getStorageSync("openid")
    if (openid !== "") {
      return
    }
    //登录
    var that = this
    wx.login({
      success (res) {
        //请求后端登录
        wx.request({
          url: Api.wxLogin({code: res.code}),
          success: function(res) {
            console.log(res.data)
            wx.setStorageSync("openid", res.data.openid)
            //新用户引导填充信息
            if (res.data.height===0 || res.data.weight===0) {
              wx.redirectTo({url:"/pages/info/info"})
            }else{
              if(that.data.eat.uid === "") {
                //登录成功获取首页数据. 防止和onShow重复拉取，因为先执行onShow
                that.indexData()
              }
            }
          },
          fail(res) {
            wx.showToast({
              title:"服务器出错",
              icon:"none",
            })
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  indexData: function () {
    //获取数据
    var that = this
    wx.request({
      url:Api.Eat(),
      success(res) {
        if (res.data.error_code) {
          console.log("request error ",res.data)
          return
        }

        var tempTabs = ["早餐", "午餐", "晚餐", "零食"]
        if (res.data.breakfast.length > 0) {
          tempTabs[0] += "("+ res.data.breakfast.length +")"
        }
        if (res.data.lunch.length > 0) {
          tempTabs[1] += "("+ res.data.lunch.length +")"
        }
        if (res.data.dinner.length > 0) {
          tempTabs[2] += "("+ res.data.dinner.length +")"
        }
        if (res.data.snacks.length > 0) {
          tempTabs[3] += "("+ res.data.snacks.length +")"
        }

        that.setData({
          eat:res.data,
          sportIndex:that.data.sportsVal.indexOf(res.data.exercise),
          tabs:tempTabs
        })
        targetData = [res.data.score.calorie_target, res.data.score.fat_target, res.data.score.carbohydrate_target, res.data.score.protein_target]
        currentData = [res.data.score.calorie_today, res.data.score.fat_today, res.data.score.carbohydrate_today, res.data.score.protein_today]

        //绘图
        that.canvas()

        //停止下拉刷新动画
        wx.stopPullDownRefresh()
      },
      fail(res) {
        console.log(res)
        wx.showToast({
          title:"服务器出错",
          icon:"none"
        })
      }
    })
  },
  onPullDownRefresh: function() {
    console.log("pull down")
    this.indexData();
  },
  bindSportChange : function(e) {
    this.setData({
      sportIndex:e.detail.value
    })
    var exerVal = this.data.sportsVal[e.detail.value]
    wx.request({
      url:Api.Exercise(),
      method:"POST",
      data:{"exercise":exerVal},
      success(res) {
        console.log(res)
        //重新渲染数据
        wx.startPullDownRefresh()
      },
      fail(res) {
        wx.showToast({
          title:"服务器出错",
          icon:"none",
        })
      }
    })

  },
  canvas: function () {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: ['总热量', '脂肪', '碳水物', '蛋白质'],
      series: [{
        name: '目标营养',
        data: targetData,
        format: function (val, name) {
          return val;
        }
      }, {
        name: '今日营养',
        data: currentData,
        format: function (val, name) {
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '今日饮食数据',
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    //console.log("ListTouchStart",e.touches)
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    //console.log("ListTouchMove",e.touches)
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > -100 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    //console.log("end",e,this.data.ListTouchDirection)
    if (this.data.ListTouchDirection ==='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  eatDelete(e) {
    console.log("del",e)
    var that = this
    wx.request({
      url:Api.Eat({eat_id:e.currentTarget.dataset.eatId}),
      method:"DELETE",
      success(res) {
        console.log(res)
        that.indexData()
      },
      fail(res) {
        wx.showToast({
          title:"服务器出错",
          icon:"none",
        })
      }
    })
  },
  goToSearch(e) {
    wx.navigateTo({
      url:"/pages/search/search?eat_type=0"
    })
  },
  goToEatReport(e){
    wx.navigateTo({
      url:"/pages/eat-report/eat-report"
    })
  }
});