import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'  //페이지를 관리(구분)해주는 라우터를 npm 으로 다운받아 임포트함 -> 페이지관리에 대한 구성옵션을 정리한 후 main.js에 임포트
import store from './store/index.js'    //특정 폴더의 index 자바스크립트 파일은 경로에서 생략 가능 -> './store' 이렇게 써도 무관
import loadImage from './plugins/loadImage'

createApp(App)
    .use(router)    //use() : 특정 플러그인을 연결할때 사용 / $route, $router
    .use(store)     //$store
    .use(loadImage) //$loadImage
    .mount('#app')