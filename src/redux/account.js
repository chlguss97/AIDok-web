const initState= { //처음에 한번만 초기화..
    userAccount: {
        userId : "아아이딩",
        userImg : "이이미지",
    },
}

//액션 타입 정의
const LOGIN = 'LOGIN';

// 액션생성함수: 내가 여기저기서 쓸 함수 - 액션객체 리턴해준다. (회원가입(로그인) 후 받아온 response를 리덕스에 저장)
export const setUserAccount = (id, img)=>{
    return {
        type: LOGIN, 
        loginUser:{id, img}  //이게 리턴해주는 액션객체
    }
}


export default function userAccountReducer(state = initState, action){

    switch(action.type) {
        case LOGIN:
            return{
                ...state,
                userAccount: {
                    userId: action.loginUser.id,  
                    userImg: action.loginUser.img,
                },
            };
        // case 'logout':
        //     return{
        //         ...state,
        //         userInformation: {
        //             id: action.logoutUser.id,
        //             pw: action.logoutUser.pw,
        //             imgs: action.logoutUser.img,
        //         }
        //     }
        default:
            return state
    }

}
