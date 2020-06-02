import {Http} from '../utils/http.js'

class ClassicModel extends Http{
    getLatest(sCallback){
      this.request({
        url: 'classic/latest',
        success: (res) => {
          this._setLatestIndex(res.index)
          sCallback(res)
          const key = this._getKey(res.index)
          
          wx.setStorageSync(key, res) 
        }
      })
    }
    getMyFavor(success) {
      let params = {
        url: 'classic/favor',
        success: success
      }
      this.request(params)
    }
    getClassic(index, nextOrPrevious, sCallback){
      const key = nextOrPrevious === 'next'? 
        this._getKey(index+1):this._getKey(index -1)
      const classic = wx.getStorageSync(key)
      if(!classic){
        let url = '/classic/' + index + '/' + nextOrPrevious
        this.request({
          url: url,
          success: (res) => {
            sCallback(res)
            wx.setStorageSync(this._getKey(res.index), res)
          }
        })
      }else{
        sCallback(classic)
      }
      
    }

    _getKey(index){
      let key = 'classic-' + index
      return key
    }

    isFirst(index){
      return index === 1? true : false
    }

    isLatest(currentIndex){
      let index = this._getLatestIndex()
      return index === currentIndex? true : false
    }

    _setLatestIndex(index){
      wx.setStorageSync('index', index)
    }
    _getLatestIndex(){
      let index = wx.getStorageSync('index')
      return index
    }
}
export default ClassicModel