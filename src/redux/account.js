const initState= { //처음에 한번만 초기화..
    userAccount: {
        userId : "aaa",
        userImg : "https://imageaws.popin.cc/ML/3903d1dea05e37bc37a9446c458d45e0__scv1__300x157.png",
    },
}

//액션 타입 정의
const LOGIN = 'LOGIN';

// 액션생성함수: 내가 여기저기서 쓸 함수 - 액션객체 리턴해준다. (회원가입(로그인) 후 받아온 response를 리덕스에 저장)
export const setUserAccount = (id, img)=>{
    console.log('setUserAccount action:', { id, img }); // 디버깅용 로그 추가
   
    return {
        type: LOGIN, 
        loginUser:{
            id:id,
            img:img}  //이게 리턴해주는 액션객체
    }
}


export default function userAccountReducer(state = initState, action){
    console.log('userAccountReducer action:', action); // 디버깅용 로그 추가

    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                userAccount: {
                    ...state.userAccount,
                    userId: action.loginUser.id,
                    userImg: action.loginUser.img, 
                },
            };
    
        default:
            return state
    }

}
