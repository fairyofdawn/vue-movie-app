<template>
  <div class="container">
    <!-- 검색된 영화가 없으면 class에 no-result 추가 -->
    <div 
      :class="{ 'no-result': !movies.length }"
      class="inner">
      <Loader v-if="loading" />
      <div 
        v-if="message" 
        class="message">
        {{ message }}
      </div>
      <!-- :movie2="movie" => movie라는 이름으로 받은 mvoies의 배열 데이터를 movie2라는 이름으로 movieItem 컴포넌트에 전달해줌 -->
      <div 
        v-else
        class="movies">
        <MovieItem 
          v-for="movie in movies" 
          :key="movie.imdbID"
          :movie2="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'
import Loader from './Loader.vue'

export default{
    components: {
        MovieItem,
        Loader
    },
    computed: { //계산된 데이터
      movies() {
        return this.$store.state.movie.movies
      },
      message(){
        return this.$store.state.movie.message
      },
      loading(){
        return this.$store.state.movie.loading
      }

    },
    
}
</script>

<!-- <style lang="scss" scoped>
.container {
  .movies {
    display: flex;
    flex-wrap: wrap;  //줄바꿈이 가능하도록함
    justify-content: center;  //수평 가운데 정렬
  }
}
</style> -->

<style lang="scss" scoped>
@import "../scss/main.scss";
  .container {
    margin-top: 30px;
    .inner {
      background-color: $gray-200;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      &.no-result { //class에 no-result가 있는 경우 (검색된 영화가 없는 경우)
        padding: 70PX 0;
      }
    }
    .message {
      color: $gray-400;
      font-size: 20px;
    }
    .movies {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>