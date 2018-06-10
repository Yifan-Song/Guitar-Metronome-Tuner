//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSetting({
      success(res) {
        console.log("1")
        if (!res.authSetting['scope.record']) {
          console.log("2")
          wx.authorize({
            scope: 'scope.record',
            success() {
              console.log("录音授权成功！")
            },
            fail() {
              console.log("第一次录音授权失败");
              wx.showModal({
                title: '提示',
                content: '您未授权录音，功能将无法使用',
                showCancel: true,
                confirmText: "授权",
                confirmColor: "#52a2d8",
                success: function (res) {
                  if (res.confirm) {
                    //确认则打开设置页面（重点）
                    wx.openSetting({
                      success: (res) => {
                        console.log(res.authSetting);
                        if (!res.authSetting['scope.record']) {
                          //未设置录音授权
                          console.log("未设置录音授权");
                          wx.showModal({
                            title: '提示',
                            content: '您未授权录音，功能将无法使用',
                            showCancel: false,
                            success: function (res) {

                            },
                          })
                        } else {
                          //第二次才成功授权
                          console.log("设置录音授权成功");
                          recorderManager.start(options);
                        }
                      },
                      fail: function () {
                        console.log("授权设置录音失败");
                      }
                    })
                  } else if (res.cancel) {
                    console.log("cancel");
                  }
                },
                fail: function () {
                  console.log("openfail");
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})