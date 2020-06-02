// pages/book-detail/book-detail.js
import {BookModel} from '../../model/book.js'
import LikeModel from '../../model/like.js'
let bookModel = new BookModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeCount: 0,
    likeStatus: false,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    const bid = options.bid
    let detail = bookModel.getDetail(bid)
    let comments = bookModel.getComments(bid)
    let likeCount = bookModel.getLikeCount(bid)
    Promise.all([detail, comments, likeCount]).then(res => {
      // console.log(res)
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeCount: res[2].fav_nums,
        likeStatus: res[2].like_status
      })
      wx.hideLoading()
    })
    // detail.then((res) => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then(res => {
    //     console.log(res)
    //     this.setData({
    //       comments: res.comments
    //     })
    //     wx.setStorageSync('comments', res.comments)
    //   })
    
    // likeCount.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeCount: res.fav_nums,
    //     likeStatus: res.like_status
    //   })
    // })
  },
  onLike(e){
    const like = e.detail.behavior
    // console.log(like)
    likeModel.like(like, this.data.book.id, 400)
  },
  onPost(){
    this.setData({
      posting: true
    })
  },
  onCancel(){
    this.setData({
      posting: false
    })
  },
  onTag(event){
    let text = event.detail.text || event.detail.value
    this.data.comments.unshift({
      content: text,
      nums: 1
    })
    // console.log(event)
    // console.log(this.data.book.id)
    bookModel.postBook(this.data.book.id, text).then(res => {
      console.log(res)
      wx.showToast({
        title: '+ 1',
        icon: "none",
        duration: 2000
      })
      this.setData({
        posting: false,
        comments: this.data.comments
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