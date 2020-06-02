import {Http} from '../utils/http-p.js'

class BookModel extends Http{
  getHotList(){
    let bookList = this.request({
      url: 'book/hot_list'
    })
    return bookList
  }
  getDetail(bid){
    let bookDetail = this.request({
      url: `/book/${bid}/detail`
    })
    return bookDetail
  }
  getComments(bid){
    let bookComment = this.request({
      url: `/book/${bid}/short_comment`
    })
    return bookComment
  }
  getLikeCount(bid){
    let bookLikeCount = this.request({
      url: `book/${bid}/favor`
    })
    return bookLikeCount
  }
  getMyBookCount(){
    return this.request({
      url: "/book/favor/count"
    })
  }
  postBook(book_id, content){
    let addBook =  this.request({
      url: "/book/add/short_comment",
      methods: "POST",
      data:{
        book_id,
        content
      }
    })
    return addBook
  }
  getSearch(start, q){
    return this.request({
      url: "/book/search",
      data: {
        start,
        q,
        summary: 1
      }
    })
  }
}

export {BookModel}