<template>
  <Header />
  <RouterView />  <!-- //Home, about 페이지 출력 부분 , vueRouter 패키지 에서 제공하는 전역화 되어있는 컴포넌트 --> 
  <Footer />
</template> 

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" >
  @import "./scss/main.scss"; //App.vue 파일에서 main.scss 동작하고 main.scss에서는 bootstrap의 스타일을 가져옴.
</style>