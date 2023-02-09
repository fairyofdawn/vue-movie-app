import { createStore } from 'vuex' // npm i vue@next 로 가져온 vuex 라이브러리의 함수를 가져옴 , vuex = store
import movie from './movie.js'
import about from './about.js'

export default createStore ({
    modules: {
        movie: movie,    //데이터 이름과 속성 이름이 같으면 콜론 뒤쪽 생략 가능 ex) moive
        about            //About.vue 에서 사용
    }
})