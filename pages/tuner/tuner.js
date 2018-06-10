//tuner.js
//获取应用实例
const app = getApp()
var currentString; 
var timer; // 计时器
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
    unit: 'Hz',
    tempFilePath: "DefaultFilePath",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tuneString4: function(){
    this.setData({ standardFrequency: this.data.DFrequency })
    currentString = "D"
  },
  tuneString6: function () {
    this.setData({ standardFrequency: this.data.EFrequency })
    currentString = "E"
  },
  tuneString5: function () {
    this.setData({ standardFrequency: this.data.AFrequency })
    currentString = "A"
  },
  tuneString3: function () {
    this.setData({ standardFrequency: this.data.GFrequency })
    currentString = "G"
  },
  tuneString2: function () {
    this.setData({ standardFrequency: this.data.BFrequency })
    currentString = "B"
  },
  tuneString1: function () {
    this.setData({ standardFrequency: this.data.E1Frequency })
    currentString = "E1"
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
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onStart(() => {
      console.log('recorder start')
    });
      this.recorderManager.onError((res) => {
        console.log('录音失败！')
        console.log(res)
      });
    this.recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const {tempFilePath}= res
      wx.uploadFile({
        url: 'http://localhost:8080/uploadModel',
        filePath: tempFilePath,
        name: 'file',
        formData: {
          'tune': currentString
        },
        success: function (res) {
          console.log(res)
          var data = res.data
        }
      })
    });
    this.recorderManager.start({
      duration : 2000
    });
      setTimeout(function() {
        console.log("2s passed");
      }, 2000);
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
});