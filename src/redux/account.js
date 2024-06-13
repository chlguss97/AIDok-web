const initState= {
    userInformation: {
        id : "아이디없음",
        pw : "비밀번호없음",
        img : null,
    },
}

// 액션 객체를 리턴해주는 함수 (회원가입(로그인) 후 받아온 response를 리덕스에 저장)
export const loginUserInfo = (id, pw, img)=>{
    return {
        type: 'login', 
        loginUser:{id, pw, img}
    }
}

export const logoutUserInfo = ()=>{
    return {
        type : 'logout',
        logoutUser:{
            id: "아이디는 뭘까",
            pw: "패쓰워드는 뭘까",
            img:null,
        }
    }
}

export default function userInformationReducer(state = initState, action){

    switch(action.type) {
        case 'login':
            return{
                ...state,
                userInformation: {
                    id: action.loginUser.id,
                    pw: action.loginUser.pw,
                    imgs: action.loginUser.img,
                }
            }
        case 'logout':
            return{
                ...state,
                userInformation: {
                    id: action.logoutUser.id,
                    pw: action.logoutUser.pw,
                    imgs: action.logoutUser.img,
                }
            }
        default:
            return state
    }

}
