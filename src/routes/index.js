//페이지를 관리해주는 구성파일이 됨

//기본적인 페이지를 구성해서 내보내기
import { createRouter, createWebHashHistory } from 'vue-router' 
import Home from './Home.vue'
import Movie from './Movie.vue'
import About from './About.vue'
import NotFound from './NotFound'

//createRouter로 실행한 결과를 기본 내보내기함
export default createRouter({
    //Hash, History
    history: createWebHashHistory(),  //hash모드 -> https://google.com/#/search : #과 /로 키워드를 붙여서 페이지를 이동하는게 hash모드 
                                    //History모드를 사용하기 위해선 서버에 세팅을 해야하기 때문에 일단 해쉬모드를 사용해서 프로젝트를 만듬
    //페이지 이동시 스크롤을 맨 위로 초기화시킴
    scrollBehavior() {
        return {
            top : 0
        }
    },


     //페이지들을 구분해주는 개념
    routes: [ 
        {
            path: '/',  //페이지를 구분해주는 각각의 경로
            component: Home   //path에 적힌 경로에 연결되어있는 하나의 컴포넌트가 실행
        },
        {   
            //Movie.vue에서 사용될 변수명을 : 뒤에 입력
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component : About
        },
        {
            path: '/:notFound(.*)',    //'/:pathMatch(.*)'  뷰 라우터에서 제공하는 404 페이지 이동 정규식
            component: NotFound
        }
    ]
})