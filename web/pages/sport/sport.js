var wxCharts = require('../../utils/wxcharts.js');
var Api = require('../../utils/api.js');
var columnChart = null;
var targetData = [0,0,0,0];
var currentData = [0,0,0,0];
var runDate = ["01/01","01/01","01/01","01/01"];

Page({
  data: {
    //运动列表
    sports: [1000, 2000, 3000, 4000,5000,6000,7000,8000,9000,10000,11000],
    sportIndex:0,
    //饮食类型
    tabs: ["今天的一天"],
    //列表切换
    TabCur: 0,
    //食用列表
    eat:{eat_score:0,sport:[],score:{},exercise:5000},

    ListTouchStart:0,
    ListTouchDirection:"",
    modalName:null,
    code: "",
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
    var that = this
    wx.login({
      success(res) {
        //请求后端登录
        that.setData({
          code: res.code,
        })
      },
      fail(res) {
        console.log(res)
      }
    })
    this.indexData()
  },
  onLoad:function (e) {
    
  },
  indexData: function () {
    //获取数据
    var that = this
    wx.getWeRunData({
      success (res) {
        // 拿 encryptedData 到开发者后台解密开放数据
        const runData = {
          encryptedData: res.encryptedData,
          iv: res.iv,
          code: that.data.code,
        };
        wx.request({
          url:Api.Run(),
          method: "POST",
          data: runData,
          success(res) {
            if (res.data.error_code) {
              console.log("request error ",res.data)
              return
            }
    
            var tempTabs = ["今天的一天"]
            if (res.data.sport.length > 0) {
              tempTabs[0] += "("+ res.data.sport.length +")"
            }
    
            that.setData({
              eat:res.data,
              sportIndex:that.data.sports.indexOf(res.data.exercise),
              tabs:tempTabs
            })
            targetData = [res.data.score.first_target, res.data.score.second_target, res.data.score.third_target, res.data.score.fourth_target]
            currentData = [res.data.score.first_step, res.data.score.second_step, res.data.score.third_step, res.data.score.fourth_step]
            runDate = [res.data.score.first_date, res.data.score.second_date, res.data.score.third_date, res.data.score.fourth_date]
    
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
    var exerVal = this.data.sports[e.detail.value]
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
      categories: runDate,
      series: [{
        name: '目标步数',
        data: targetData,
        format: function (val, name) {
          return val;
        }
      }, {
        name: '每日步数',
        data: currentData,
        format: function (val, name) {
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '四日运动步数',
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
    console.log("del", e)
    var that = this
    const {
      index
    } = e.target.dataset;
    const eatData = that.data.eat;
    eatData.sport.splice(index, 1);
    wx.request({
      url: Api.Eat(),
      method: "PUT",
      data: eatData,
      success(res) {
        console.log(res)
        that.indexData()
      },
      fail(res) {
        wx.showToast({
          title: "服务器出错",
          icon: "none",
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