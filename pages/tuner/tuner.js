//tuner.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Text',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    standardFrequency: 0,
    currentFrequency: 0,
    tunerHeader1: '标准频率：',
    tunerHeader2: '当下频率：',
    EFrequency: 82.4069,
    AFrequency: 110,
    DFrequency: 146.8324,
    GFrequency: 195.9977,
    BFrequency: 246.9417,
    E1Frequency: 329.6276,
    unit: 'Hz'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tuneString4: function(){
    this.setData({ standardFrequency: this.data.DFrequency })
  },
  tuneString6: function () {
    this.setData({ standardFrequency: this.data.EFrequency })
  },
  tuneString5: function () {
    this.setData({ standardFrequency: this.data.AFrequency })
  },
  tuneString3: function () {
    this.setData({ standardFrequency: this.data.GFrequency })
  },
  tuneString2: function () {
    this.setData({ standardFrequency: this.data.BFrequency })
  },
  tuneString1: function () {
    this.setData({ standardFrequency: this.data.E1Frequency })
  },
  startTune: function() {
    console.log("宋逸凡是世界上最帅的人")
  },
  navigateToMetronome: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  navigateToTuner: function () {
    wx.navigateTo({
      url: '../tuner/tuner'
    })
  },
  onLoad: function () {
    this.tuneString1();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
