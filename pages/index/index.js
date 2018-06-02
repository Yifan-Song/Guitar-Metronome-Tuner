//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Text',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    beatSpeedNum : 120,
    metronomeHeader1: '节拍速度',
    metronomeHeader2: '拍号',
    array: ['2/4', '3/4', '4/4', '3/8', '6/8'],
    timeSignatureArray: [
      {
        id: 0,
        name: '2/4'
      },
      {
        id: 1,
        name: '3/4'
      },
      {
        id: 2,
        name: '4/4'
      },
      {
        id: 3,
        name: '3/8'
      },
      {
        id: 4,
        name: '6/8'
      }
    ],
    index: 2,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  minusBeatSpeedNum: function () {
      var newNum = this.data.beatSpeedNum - 1;
      this.setData({beatSpeedNum : newNum})
  },  
  addBeatSpeedNum: function () {
    var newNum = this.data.beatSpeedNum + 1;
    this.setData({ beatSpeedNum: newNum })
  },
  longMinusBeatSpeedNum: function () {
    var newNum = this.data.beatSpeedNum - 10;
    this.setData({ beatSpeedNum: newNum })
  },
  longAddBeatSpeedNum: function () {
    var newNum = this.data.beatSpeedNum + 10;
    this.setData({ beatSpeedNum: newNum })
  },  
  playBeat: function (){
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
