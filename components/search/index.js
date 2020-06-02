// components/search/index.js
import KeywordModel from '../../model/keywords.js'
import {BookModel} from '../../model/book.js'
let bookModel = new BookModel()
let keywordModel = new KeywordModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more:{
      type: String,
      observer: 'onloadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    keywords: [],
    hots: [],
    books: [],
    searching: false,
    p: '',
    loading: false,
    total: 0,
    status: false,
    empty: false
  },
  attached(event){
    this.setData({
      keywords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hots: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(e){
      this.setData({
        empty: false
      })
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(event){
      this.setData({
        searching: false,
        empty: false,
        p: ''
      })
    },
    onConfirm(e){
      this.initData()
      this.setData({
        searching: true,
        status: true
      })
      let value = e.detail.value || e.detail.text     
      bookModel.getSearch(0, value).then(res => {
        this.setData({
          books: res.books,
          p: value,
          total: res.total
        })
        if(res.total==0){
          this.setData({
            empty: true
          })
        }
        keywordModel.addHistory(value)
        this.setData({
          status: false
        })
      })
    },
    initData(){
      this.data.total = null
      this.setData({
        books: [],
        empty: false
      })
    },
    onloadMore(){
      if(this.data.loading){
        return
      }
      let length = this.data.books.length
      if(length < this.data.total){
        this.setData({
          loading: true
        })
        bookModel.getSearch(length, this.data.p).then(res => {
          this.setData({
            books: [...this.data.books, ...res.books]
          })
          this.setData({
            loading: false
          })
        }, () => {
          this.setData({
            loading: false
          })
        })
      }
    }
  }
})
