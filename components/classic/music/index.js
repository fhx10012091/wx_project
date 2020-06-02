// components/classic/music/index.js
import {classicBeh} from '../behavior.js'
const audioMsg = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseUrl: 'images/player@waitting.png',
    playUrl: 'images/player@playing.png',
  },
  attached(event){
    this._autoQuery()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(event){
      if(!this.properties.playing){
        this.setData({
          playing: true
        })
        audioMsg.title = this.data.title
        audioMsg.src = this.data.src
      }else{
        this.setData({
          playing:false
        })
        audioMsg.pause()
      }
    },
    _autoQuery(){
      if(audioMsg.paused){
        this.setData({
          playing: false
        })
        return 
      }
      if(audioMsg.src == this.data.src){
        this.setData({
          playing: true
        })
      }
    },
    _monitorSwitch(){
      audioMsg.onPlay(() => {
        this._autoQuery()
      })
      audioMsg.onPause(() => {
        this._autoQuery()
      })
      audioMsg.onStop(() => {
        this._autoQuery()
      })
      audioMsg.onEnded(() => {
        this._autoQuery()
      })
    }
  }
})
