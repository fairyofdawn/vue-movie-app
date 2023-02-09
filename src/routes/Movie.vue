<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader 
        :size="3" 
        :z-index="9" 
        :fixed="true" />  <!-- fixed만 넣어도 true로 설정 가능. 안쓰면 false -->
    </template>
    <div 
      v-else 
      class="movie-details">
      <div 
        :style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader 
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- Raitings 내부의 Source, Value를 name과 score로 부르겠다고 명시 -->
            <div 
              v-for="{ Source: name, Value: score } in theMovie.Ratings"    
              :key="name"
              :title="name"
              class="rating">
              <img 
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" 
                :alt="name" />
              <span>{{ score }}</span>  
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
  components : {
    Loader
  },
  data(){
    return {
      imageLoading: true
    }
  },
  computed : {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },
  created(){
    this.$store.dispatch('movie/searchMovieWithId', {
      // movie/tt123762 
      id: this.$route.params.id
    }) 
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      //포스터가 없으면 빈 문자열을 보내서 포스터를 표시하지 않고 로딩 표시가 계속되지 않게 함.
      if (!url || url === 'N/A') {
        this.imageLoading = false 
        return ''
      }
      const src = url.replace('SX300', `SX${size}`)    //SX300을 SX${size}로 바꿔서 리턴함
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
    }
  }

  
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
.container {
  padding-top: 40px;
}

.skeletons {
  display: flex;
  .poster{
    flex-shrink: 0; //화면이 줄어들어도 너비가 감소하지 않음
    width : 500px;
    height: 500px * 3 / 2;
    margin-right: 70px; 
  }
  .specs {
    flex-grow: 1; //최대한 많은 너비를 사용함
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }

  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3 / 2;
    margin-right: 70px;
    background-color: $gray-200;
    background-size: cover; //백그라운드 사이즈에 딱 맞춤
    background-position: center; 
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30;
    }
    .labels {
      color: $primary;
      span {
        &::after{
          content: "\00b7";   //css의 content 부분에는 html 특수문자 대신 numeric order 라는 새로운 특수기호를 사용할 수 있다. 
          margin: 0 6px;
        } 
        &:last-child::after{
          display :none
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center; 
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }

  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * 3 / 2;
      margin-right: 40px;
    }
  }

  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }

  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;       
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}

</style>