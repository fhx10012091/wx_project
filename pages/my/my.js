// pages/my/my.js
import { BookModel } from '../../model/book.js'
import ClassicModel from '../../model/classic.js'
const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorize: false,
    userinfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorize()
    this.getMyBookCount()
    this.getClassic()
  },
  onGetUserInfo(e){
    let userInfo = e.detail.detail
    console.log(userInfo)
    this.setData({
      authorize: true,
      userinfo: userInfo.userInfo
    })
  },
  userAuthorize(){
    wx.getSetting({
      success: (res) => {
        // 判断用户曾经是否授权过
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                authorize: true,
                userinfo: data.userInfo
              })
              
            }
          })
        }
      }
    })
  },
  getMyBookCount(){
    bookModel.getMyBookCount().then((res) => {
      
      this.setData({
        bookCount: res.count
      })
    })
  },
  getClassic(){
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})