<template>
  <div class="container">
    <input 
      v-model="title"
      class="form-control"
      type="text" 
      placeholder="Search for Movies, Series & more" 
      @keyup.enter="apply" />
    <div class="selects">
      <!-- v-model: 양방향 데이터 바인딩을 제공하는 디렉티브. 
           $data는 스크립트의 data() 옵션과 동일하다고 보면 된다. 동적으로 관리해야 하기 때문에 . 표기법대신 [] 사용-->
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"  
        :key="filter.name"
        class="form-select">
        <option 
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button 
      class="btn btn-primary" 
      @click="apply">
      Apply
    </button> 
  </div>
</template>

<script>
//import axios from 'axios'   //npm i axios로 axios를 일반 의존성으로 다운받아 http 요청을 알릴 수 있도록 작업하기 위해 임포트함.

export default {
  data() {
    return {
      title : '',
      type: 'movie',
      number : 10,
      year : '',
      filters : [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name : 'number',
          items : [10, 20, 30]
        },
        {
          name : 'year',
          items : (function () {
            const years = []
            const thisYear = new Date().getFullYear()   //현재 연도를 반환해주는 함수
            for (let i = thisYear; i >= 1985; i -= 1){
                years.push(i)
            }
            return years
          })()    //즉시 실행 함수
        }
      ]
    }
  },
  methods: {
    async apply(){    //async : 비동기
      //영화 검색 기능 구현 
      //movie.js에서 구현함
      //store의 Mutations를 실행할 땐 .commit() 메소드, Actions를 실행할 때는 .dispatch() 메소드를 사용함
      this.$store.dispatch('movie/searchMovies', {  //movie.js의 searchMovies를 실행. >> store의 index.js에서 movie라는 이름으로 moive.js를 export했기 때문에 movie.js가 아니라 movie로 써야함
        //아래의 title, type, number, year은 movie.js의 searchMovies 에 전달할 payload 객체의 구성
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
    })  
    }
  }


}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
.container {
  display: flex;
  > * {                   // > 자식요소 , * 모든,  > * 모든 자식요소
    margin-right: 10px;
    font-size: 15px;
    &:last-child {        // & 부모선택자 참조, 여기선 .container / :last-child 마지막 자식요소 = .container의 마지막 자식요소 
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 70px;
    font-weight: 700;
    flex-shrink: 0;   //felx로 인해 줄어든 가로 길이를 줄어들지 않게 0으로 비율을 설정해 줌.
  }

  @include media-breakpoint-down(lg) {
    display: block;    
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select{
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>