var Api = require('../../utils/api.js');
Page({
  data: {
    //默认显示表单
    hiddenAddForm:1,
    foodId:0,
    eatTypes: ['早餐', '午餐', '晚餐', '零食'],
    eatTypeIndex:0,
    eatNums:[1,2,3,4,5,6,7,8,9,10],
    eatNumIndex:0,
    time: '08:00',
    unitsCheckedIndex:0,
    result : {id:0,name:"未知",components:[],href:""},
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  eatTypeChange(e){
    this.setData({
      eatTypeIndex: e.detail.value
    })
  },
  eatNumChange(e){
    this.setData({
      eatNumIndex: e.detail.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  unitsChange: function(e) {
    this.setData({
      unitsCheckedIndex: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log(e)
    //添加进食
    var params = {
      "food_id":parseInt(this.data.foodId),
      "unit_name": this.data.result.components[this.data.unitsCheckedIndex].unit_name,
      "unit_id": parseInt(this.data.result.components[this.data.unitsCheckedIndex].id),
      "eat_type":parseInt(e.detail.value.eat_type),
      "eat_time":"08:00",
      "eat_num":parseInt(e.detail.value.eat_num)+1,
      "form_id":e.detail.formId
    }
    console.log("params",params)
    wx.showLoading({
      title: '添加中',
    })

    wx.request({
      url: Api.Eat(),
      data:params,
      method:"POST",
      dataType:"json",
      success: function(res) {
        console.log(res.data)
        wx.showToast({
          title: '已完成',
          icon: 'success',
          duration: 4000,
          complete:function () {
            wx.switchTab({
              url:"/pages/index/index"
            })
          }
        });
      }
    })
  },
  onShareAppMessage(o){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.hidden_add_form) {
      this.setData({
        hiddenAddForm:0,
      })
    }

    if (! options.eat_type) {
      options.eat_type = 0
    }else{
      options.eat_type = parseInt(options.eat_type)
    }
    wx.showLoading({
      title: '加载中',
    })

    var eatTime = this.data.time
    if (options.eat_type === 1) {
      eatTime = "12:00"
    }else if(options.eat_type === 2) {
      eatTime = "18:30"
    }else if(options.eat_type === 3) {
      eatTime = "15:00"
    }
    this.setData({
      foodId:options.id,
      eatTypeIndex:options.eat_type,
      time:eatTime
    })

    var that = this
    wx.request({
      url: Api.foodInfo({id:options.id}),
      success: function(res) {
        console.log(res.data)
        that.setData({
          result : res.data
        });
        wx.hideLoading()
      }
    })
  }
})
