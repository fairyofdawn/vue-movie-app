<template>
  <!-- :to -> 이동할 페이지 -->
  <RouterLink 
    :to="`/movie/${movie2.imdbID}`"   
    :style="{ backgroundImage: `url(${movie2.Poster})`}"  
    class="movie">
    <Loader 
      v-if="imageLoading"
      :size="1.5" 
      absolute /> <!-- absolute 가운데 배치 -->
    <div class="info">
      <div class="year">
        {{ movie2.Year }}
      </div>
      <div class="title">
        {{ movie2.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from './Loader.vue'
export default {
  components: {
    Loader
  },
  props : {
    movie2 : {
      type: Object,
      default : () => ({})  //객체 데이터나 배열 데이터같은 참조형 데이터들은 가변할 수 있어, 함수로 만들어 반환해야함
      //default : function() {return {}}
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init(){ //이미지 로딩 동안 애니메이션
      const poster = this.movie2.Poster
      if (!poster || poster === 'N/A') {
        this.imageLoading = false
      }else {
        await this.$loadImage(poster)
        this.imageLoading = false
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
  .movie {
    $width: 200px;
    width: $width;
    height: $width * 3 / 2;
    margin: 10px;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
    &:hover::after {   // & - 가상클래스 , :hover 를 붙여줌 // movie라는 클래스의 요소에 마우스를 올렸을때 , ::after - 뒤쪽에 가상요소를 만듬
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 6px solid $primary;
    }
    .info{
      background-color: rgba($black, .3);
      width: 100%;
      padding: 14px;
      font-size: 14px;
      text-align: center;
      position: absolute;
      left: 0px;
      bottom: 0px;
      backdrop-filter: blur(10px);
      .year{
        color: $primary;
      }
      .title{
        color: $white;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

    }
  }
</style>