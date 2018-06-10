//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Text',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    beatSpeedNum: 120,
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
    beatSrc: 'http://s.aigei.com/pvaud_mp3/aud/mp3/67/677c96664b054db6ae2609f56e84e99b.mp3?download/19000%E9%9F%B3%E6%95%88%E5%BA%93-%E8%8F%9C%E5%8D%95%E4%B8%AD%E5%8D%95%E5%87%BB06+-+%E8%8F%9C%E5%8D%95-+%E5%8D%95%E5%87%BB%28Menu_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.mp3&e=1528569540&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:BvI3fbk1RJXQfElSYNCtRgghQ98=',
    isPlay: false,
    setInter: ''
  },
  //事件处理函数
  bindViewTap: function () {
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
    clearInterval(this.data.setInter)
    var newNum = this.data.beatSpeedNum - 1;
    this.setData({
      beatSpeedNum: newNum,
      action: {
        method: 'setPlaybackRate',
        data: newNum / 120
      }
    })
    if (this.data.isPlay) {
      this.data.setInter = setInterval(this.beatRepeat, 1000 * 60 / this.data.beatSpeedNum)
    }
  },
  addBeatSpeedNum: function () {
    clearInterval(this.data.setInter)
    var newNum = this.data.beatSpeedNum + 1;
    this.setData({
      beatSpeedNum: newNum,
      action: {
        method: 'setPlaybackRate',
        data: newNum / 120
      }
    })
    if (this.data.isPlay) {
      this.data.setInter = setInterval(this.beatRepeat, 1000 * 60 / this.data.beatSpeedNum)
    }
  },
  longMinusBeatSpeedNum: function () {
    clearInterval(this.data.setInter)
    var newNum = this.data.beatSpeedNum - 10;
    this.setData({
      beatSpeedNum: newNum,
      action: {
        method: 'setPlaybackRate',
        data: newNum / 120
      }
    })
    if (this.data.isPlay) {
      this.data.setInter = setInterval(this.beatRepeat, 1000 * 60 / this.data.beatSpeedNum)
    }
  },
  longAddBeatSpeedNum: function () {
    clearInterval(this.data.setInter)
    var newNum = this.data.beatSpeedNum + 10;
    this.setData({
      beatSpeedNum: newNum,
      action: {
        method: 'setPlaybackRate',
        data: newNum / 120
      }
    })
    if (this.data.isPlay) {
      this.data.setInter = setInterval(this.beatRepeat, 1000 * 60 / this.data.beatSpeedNum)
    }
  },
  playClick: function () {
    if (!this.data.isPlay) {
      this.setData({
        isPlay: true,
      });
      this.data.setInter = setInterval(this.beatRepeat, 1000 * 60 / this.data.beatSpeedNum)
      console.log("play")
    }
    else {
      this.setData({
        isPlay: false,
        action: {
          method: 'pause'
        }
      });
      clearInterval(this.data.setInter)
      console.log("pause")
    }
  },
  beatRepeat() {
    this.audioCtx.play()
    this.audioCtx.seek(0)
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
  onLoad: function (e) {
    this.audioCtx = wx.createAudioContext('beat')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})