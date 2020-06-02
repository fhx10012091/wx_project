// pages/classic/classic.js
// import {Http} from '../../utils/http.js'
// let http = new Http()
import ClassicModel from '../../model/classic.js'
import LikeModel from '../../model/like.js'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    first: false,
    latest: true,
    like_status: false,
    fav_nums: 0
  },
  /**
   * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        like_status: res.like_status,
        fav_nums: res.fav_nums
      })
    })
  },

  onLike(event) {
    const behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext(){
    this._updateClassic('next')
  },
  onPrevious(){
    this._updateClassic('previous')
  },
  _updateClassic(nextOrPrevious){
    const index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._updateLike(res.id, res.type)
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    })
  },
  _updateLike(id, type){
    likeModel.getClassicLikeStatus(id, type, (res) => {
      this.setData({
        like_status: res.like_status,
        fav_nums: res.fav_nums
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