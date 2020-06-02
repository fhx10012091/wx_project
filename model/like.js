import {Http} from '../utils/http.js'

class LikeModel extends Http{
  like(behavior, art_id, type){
    let url = behavior == 'like'? 'like': 'like/cancel'
    this.request({
      url: url,
      methods: 'POST',
      data:{
        art_id: art_id,
        type: type
      },
      success(res){
        // console.log(res)
      }
    })
  }
  getClassicLikeStatus(id, type, callback){
    var url = `classic/${type}/${id}/favor`
    this.request({
      url,
      success: (res) => {
        callback(res)
      }
    })
  }
}

export default LikeModel