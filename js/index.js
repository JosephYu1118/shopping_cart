// ====================
//      MAIN
// ==============================
const vm_theater = new Vue({
  el: "#theater", 
  data: {
    movies: [], 
    cart: [], 
    current_movie: null, 
    is_cart_open: false
  }, 
  created(){
    let url_api = "https://awiclass.monoame.com/api/command.php?type=get&name=movies"
    axios.get(url_api).then(res => {
      this.movies = res.data
    })
  }, 
  methods: {
    getCssBackground(url){
      return {
        "background-image": "url(" + url + ")", 
        "background-position": "center center", 
        "background-size": "cover"
      }
    }, 
    wheel(event){
      TweenMax.to(".movies", 0.8, {
        left: "+=" + event.deltaY * 5 + "px" 
      })
    }, 
    addCart(movie, event){
      this.current_movie = movie
      // 由於在指定 this.current_movie 的時候 TweenMax 還沒抓到正確的資訊就已經做出動作了，所以在這裡會出錯，因此必須使用 $nextTick() 來確保 TweenMax 的動畫是在元件更新之後才執行
      this.$nextTick(() => {
        TweenMax.from(".purchasing_box", 0.8, {
          top: $(event.target).offset().top, 
          left: $(event.target).offset().left, 
          opacity: 1, 
          ease: Power1.easeOut
        })
      })
      setTimeout(() => {
        this.cart.push(movie)
      }, 800)
    }
  }, 
  computed: {
    total(){
      return this.cart
        .map(movie => movie.price)
        .reduce((total, price) => total + price, 0)
    }
  }, 
  watch: {
    cart(){
      TweenMax.from(".fa-shopping-cart", 0.3, {
        scale: 0.5
      })
    }
  }
})