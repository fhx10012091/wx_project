import { Http } from '../utils/http-p.js'
class KeywordModel extends Http {
  key = 'fhx'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }
  addHistory(keyword){
    let words = this.getHistory()
    const has = words.includes(keyword)
    if(!has){
      if(words.length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
  getHot(){
    return this.request({
      url: "/book/hot_keyword"
    })
  }
}

export default KeywordModel