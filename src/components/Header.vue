<template>
  <header>
    <Logo />
    <!-- nav가 눌리면 안쪽을 채워줌 -> nav-pills -->
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations" 
        :key="nav.name"
        class="nav-item">
        <!-- <a href="/"></a>  - a링크 태그 대신 라우터에서 제공하는 라우터링크 사용 / v-vind:to= ~~ 에서 v-bind 생략가능 -->
        <!-- nav가 활성화 되었을 때 클래스 이름이 active여야만 부트스트랩이 제대로 적용됨. 따라서 active-class의 이름을 active로 지정해줌
        지정안하면 router-link-active 라는 이름으로 설정되어 부트스트랩이 제대로 적용안됨 -->
        <RouterLink 
          :to="nav.href"
          active-class="active" 
          :class="{ active: isMatch(nav.path)}"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>                  
      </div>
    </div>
    <div 
      class="user" 
      @click="toAbout">
      <img 
        :src="image" 
        :alt="name" />
    </div>
  </header>
</template> 

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },

  data(){
    return {
      navigations :[
        {
          name: 'Search',
          href: '/'
        },
        {  
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/    //  /movie로 시작하는 경로인 경우
        },
        {
          name: 'About',
          href: '/about'
        },
      ]
    }
  }, 
  computed: {
    image() {
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    }
  },
  methods: {
    isMatch(path) {
      if(!path) return false 
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout(){
      this.$router.push('/about')   //router에서 제공하는 기능. /about 으로 이동
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;   //패딩이 추가되어도 박스가 커지지 않게 함
    background-color: $gray-200; 
    cursor: pointer;
    position: absolute;
    top: 0; 
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);   //$gray-200보다 10퍼센트 어둡게
    }
    img {
      width: 100%;
    }
  }

  //반응형 웹 페이지. - 부트스트랩의 미디어 쿼리로 사용.
  @include media-breakpoint-down(sm) {
    .nav{
      display: none;
    }
  }
}

</style>