// pages/eat-report/eat-report.js
var wxCharts = require('../../utils/wxcharts.js');
var Api = require('../../utils/api.js');

//卡路里(热量)
var calorieRingChart = null;
//脂肪
var fatRingChart = null;
//碳水
var carbohydrateRingChart = null
//蛋白质
var proteinRingChart = null
//胆固醇
var cholesterolRingChart = null

Page({
  data: {
    date:"2020-01-01",
    calorieData: {
      "total": 1000,
      "series": [{"name": "米饭(500)", "data": 500}, {"name": "红烧肉", "data": 250}, {"name": "西红柿", "data": 100}, {"name": "西瓜", "data": 150}]
    },
    fatData:{
      "total": 0,
      "series":[],
    },
    carbohydrateData:{
      "total": 0,
      "series":[],
    },
    proteinData:{
      "total": 0,
      "series":[],
    },
    cholesterolData:{
      "total": 0,
      "series":[],
    },
    eatScore : 0
  },
  onShareAppMessage(o){

  },
  onLoad(e){
    if (e.date) {
      var myDate = new Date();
      this.indexData({"day":myDate.getFullYear().toString()+ "-" + e.date})
    }else{
      this.indexData()
    }
  },
  bindDate(e){
    console.log(e)
    this.indexData({"day":e.detail.value})
  },
  indexData: function (params) {
    var that = this
    wx.request({
      url:Api.Eat(params),
      success(res) {
        if (res.data.error_code) {
          wx.showToast({
            title:res.data.error_message
          })
          return
        }
        var calorieData = { "total": 0, "series":[]}
        var fatData = { "total": 0, "series":[]}
        var carbohydrateData = { "total": 0, "series":[]}
        var proteinData = { "total": 0, "series":[]}
        var cholesterolData = { "total": 0, "series":[]}

        res.data.breakfast.forEach(function (item) {
          calorieData.total = calorieData.total + item.calorie
          fatData.total  = fatData.total + item.fat
          carbohydrateData.total = carbohydrateData.total + item.carbohydrate
          proteinData.total  = proteinData.total + item.protein
          cholesterolData.total = cholesterolData.total + item.cholesterol

          calorieData.series.push({name : item.food_name, data : item.calorie})
          fatData.series.push({name : item.food_name, data : item.fat})
          carbohydrateData.series.push({name : item.food_name, data : item.carbohydrate})
          proteinData.series.push({name : item.food_name, data : item.protein})
          cholesterolData.series.push({name : item.food_name, data : item.cholesterol})
        })

        res.data.lunch.forEach(function (item) {
          calorieData.total = calorieData.total + item.calorie
          fatData.total  = fatData.total + item.fat
          carbohydrateData.total = carbohydrateData.total + item.carbohydrate
          proteinData.total  = proteinData.total + item.protein
          cholesterolData.total = cholesterolData.total + item.cholesterol

          calorieData.series.push({name : item.food_name, data : item.calorie})
          fatData.series.push({name : item.food_name, data : item.fat})
          carbohydrateData.series.push({name : item.food_name, data : item.carbohydrate})
          proteinData.series.push({name : item.food_name, data : item.protein})
          cholesterolData.series.push({name : item.food_name, data : item.cholesterol})
        })

        res.data.dinner.forEach(function (item) {
          calorieData.total = calorieData.total + item.calorie
          fatData.total  = fatData.total + item.fat
          carbohydrateData.total = carbohydrateData.total + item.carbohydrate
          proteinData.total  = proteinData.total + item.protein
          cholesterolData.total = cholesterolData.total + item.cholesterol

          calorieData.series.push({name : item.food_name, data : item.calorie})
          fatData.series.push({name : item.food_name, data : item.fat})
          carbohydrateData.series.push({name : item.food_name, data : item.carbohydrate})
          proteinData.series.push({name : item.food_name, data : item.protein})
          cholesterolData.series.push({name : item.food_name, data : item.cholesterol})
        })

        res.data.snacks.forEach(function (item) {
          calorieData.total = calorieData.total + item.calorie
          fatData.total  = fatData.total + item.fat
          carbohydrateData.total = carbohydrateData.total + item.carbohydrate
          proteinData.total  = proteinData.total + item.protein
          cholesterolData.total = cholesterolData.total + item.cholesterol

          calorieData.series.push({name : item.food_name, data : item.calorie})
          fatData.series.push({name : item.food_name, data : item.fat})
          carbohydrateData.series.push({name : item.food_name, data : item.carbohydrate})
          proteinData.series.push({name : item.food_name, data : item.protein})
          cholesterolData.series.push({name : item.food_name, data : item.cholesterol})
        })

        that.setData({
          date:res.data.date,
          calorieData:calorieData,
          fatData:fatData,
          carbohydrateData:carbohydrateData,
          proteinData:proteinData,
          cholesterolData:cholesterolData,
          eatScore:res.data.eat_score
        })

        that.ringCanvas()
      }
    })

  },

  ringCanvas: function () {
      var windowWidth = 320;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      var that = this
      calorieRingChart = new wxCharts({
        animation: true,
        canvasId: 'calorieRingChart',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: that.data.calorieData.total,
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '热量(千卡)',
          color: '#666666',
          fontSize: 15
        },
        series: that.data.calorieData.series,
        disablePieStroke: true,
        width: windowWidth,
        height: 300,
        dataLabel: true,
        legend: true,
        background: '#f5f5f5',
        padding: 0
      });

      fatRingChart = new wxCharts({
        animation: true,
        canvasId: 'fatRingChart',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: parseInt(that.data.fatData.total),
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '脂肪(克)',
          color: '#666666',
          fontSize: 15
        },
        series: that.data.fatData.series,
        disablePieStroke: true,
        width: windowWidth,
        height: 300,
        dataLabel: true,
        legend: true,
        background: '#f5f5f5',
        padding: 0
      });

      carbohydrateRingChart = new wxCharts({
        animation: true,
        canvasId: 'carbohydrateRingChart',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: parseInt(that.data.carbohydrateData.total),
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '碳水(克)',
          color: '#666666',
          fontSize: 15
        },
        series: that.data.carbohydrateData.series,
        disablePieStroke: true,
        width: windowWidth,
        height: 300,
        dataLabel: true,
        legend: true,
        background: '#f5f5f5',
        padding: 0
      });

      proteinRingChart = new wxCharts({
        animation: true,
        canvasId: 'proteinRingChart',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: parseInt(that.data.proteinData.total),
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '蛋白质(克)',
          color: '#666666',
          fontSize: 15
        },
        series: that.data.proteinData.series,
        disablePieStroke: true,
        width: windowWidth,
        height: 300,
        dataLabel: true,
        legend: true,
        background: '#f5f5f5',
        padding: 0
      });

      cholesterolRingChart = new wxCharts({
        animation: true,
        canvasId: 'cholesterolRingChart',
        type: 'ring',
        extra: {
          ringWidth: 25,
          pie: {
            offsetAngle: -45
          }
        },
        title: {
          name: parseInt(that.data.cholesterolData.total),
          color: '#7cb5ec',
          fontSize: 25
        },
        subtitle: {
          name: '胆固醇(毫克)',
          color: '#666666',
          fontSize: 15
        },
        series: that.data.cholesterolData.series,
        disablePieStroke: true,
        width: windowWidth,
        height: 300,
        dataLabel: true,
        legend: true,
        background: '#f5f5f5',
        padding: 0
      });

      setTimeout(() => {
        calorieRingChart.stopAnimation();
        fatRingChart.stopAnimation();
        carbohydrateRingChart.stopAnimation()
        proteinRingChart.stopAnimation()
        cholesterolRingChart.stopAnimation()
      }, 500);
    }

})