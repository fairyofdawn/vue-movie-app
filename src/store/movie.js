import axios from 'axios' //npm i axios로 axios를 일반 의존성으로 다운받아 http 요청을 알릴 수 있도록 작업하기 위해 임포트함.
import _uniqBy from 'lodash/uniqBy' //중복되는 값을 제거한 후 반환해주는 api

const _defaultMessage = 'Search for the movie title!'

export default {
    // module!
    namespaced: true,
    // data! 
    state: function(){      // () => { 
        return {
            movies: [],
            message: _defaultMessage,    
            loading: false ,
            theMovie: {} 
        }
    }, 
    // computed! 유사
    getters: {
        //movieIds(state) {   //위에서 만든 state에 있는 데이터인 movies를 연결
        //     return state.movies.map(m => m.imdbID)
        // } 
    },
    // methods! 유사
    // 변이 - mutations를 통해서만 데이터를 변경할 수 있음.
    mutations: {
        updateState(state, payload){ //state의 데이터를 갱신할 수 있는 로직
            //객체데이터의 속성의 이름만 가지고 새로운 배열 데이터를 만들어 줌. ['movies', 'message', 'loading' ]
            Object.keys(payload).forEach(key => {
                //state.movies = payload.movies     => state['movies] = payload['movies'] 로 변경 가능. 그리고 key에 담겨있기 때문에 아래와 같이 사용하면 코드가 줄어듬.
                //state.message = payload.message
                state[key] = payload[key]
            })    
        },
        //페이지 이동시 상태 초기화
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    // 따로 처리하지 않아도 기본적으로 비동기로 동작
    actions: {
            //searchMovies(context) // searchMovies({ state, commit }) 과 같이 객체 구조분해를 통해서도 가져올 수 있음.     //ex) context.state
        
        async searchMovies(context, payload) {   
            if(context.state.loading){  //loading이 true로 되어있으면 이 조건문에 걸려서 검색이 종료됨. 로딩이 되는 중인데 검색을 계속하는 것을 방지.
                return
            }
            
            context.commit('updateState', {
                message: '',
                loading: true

            })

            try {
                //const { title, type, number, year } = payload
            //영화 검색 기능 구현 - 아래의 _fetchMovie 에서 비동기 Promise로 일부 구현
            //const OMDB_API_KEY = '7035c60c'
            //const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`) //보간 ${}, 작은따옴표 ' 아니라  ` 사용
            
            const res = await _fetchMovie({
                ...payload,
                 page: 1
            })    // ...전개 연산자 => 배열은 전개해서 뒤에 내용 추가함

            const { Search, totalResults } = res.data   //omdbapi로 검색하면 data라는 속성에 영화의 데이터가 들어있음
            
            context.commit('updateState', {     //commit메소드로 mutations의 updateState를 실행해서 객체데이터를 담아 payload라는 매개변수에 보내 데이터를 갱신함
                movies: _uniqBy(Search, 'imdbID'),  //중복되는 데이터를 제거
            })

            console.log(res)
            console.log(totalResults)           //검색된 전체 영화의 갯수
            console.log(typeof totalResults)    //int가 아니라 String으로 반환

            const total = parseInt(totalResults, 10)
            const pageLength = Math.ceil(total / 10)    //ceil() > 올림

            //영화목록 추가 요청            
            if ( pageLength > 1) {
                for (let page = 2; page <= pageLength; page += 1){
                    if(page > (payload.number / 10)) {    //페이징 처리를 한게 아니고 select로 10,20,30 개의 영화만 볼 수 있게 해놨으므로, 각각 해당하는 갯수의 영화가 검색되었으면 break를 통해 반복문을 빠져나가게함.
                        break
                    }
                    //const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
                    
                    const res = await _fetchMovie({
                        ...payload,
                         page: page
                    })    // ...전개 연산자 => 배열은 전개해서 뒤에 내용 추가함

                    const { Search } = res.data  
                    context.commit('updateState', {
                        movies: [...context.state.movies, ..._uniqBy(Search, 'imdbID')]    //... : 전개연산자로 기존 movies에 들어있던 영화 데이터가 덮어써지지 않도록 새로운 배열을 만들어줌.
                    }) 
                }
            }
            } catch(message){
                context.commit('updateState', {
                    movies : [],
                    message: message
                })
            }finally{
                context.commit('updateState', {
                    loading: false
                })
            }
        },
        async searchMovieWithId(context, payload) {
            const { id } = payload
            if(context.state.loading){  //loading이 true로 되어있으면 이 조건문에 걸려서 검색이 종료됨. 로딩이 되는 중인데 검색을 계속하는 것을 방지. //if(context.state.loading) return 가능
                return
            }
            
            context.commit('updateState', {
                theMovie: {},   //재검색시 기존에 검색된 영화의 상세내역이 잠깐이라도 나오는걸 방지
                loading: true
            })

            try {
                const res = await _fetchMovie({
                    id: id
                })
                context.commit('updateState', {
                    theMovie: res.data
                })
            }catch(error) {
                context.commit('updateState', {
                    theMovie: {}
                })
            }finally {
                context.commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

function _fetchMovie(payload){ // _ 현재파일에서만 사용됨
    const {title, type, year, page, id } = payload 
    const OMDB_API_KEY = '7035c60c' 
    
    //3항 연산자. id 값이 있으면 : 앞, 없으면 : 뒤쪽을 실행
    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
        
    

    return new Promise(function(resolve, reject) {
        axios.get(url).then(function(res){
           
            if(res.data.Error){
                reject(res.data.Error)
            }
            resolve(res)
        }).catch(function(error){
            reject(error.message)
        })
    })
}