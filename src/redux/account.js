const initState= { //처음에 한번만 초기화..
    userInformation: {
        userId : "",
        userImg : "",
    },
}

// 내다 여기저기서 쓸 함수 - 액션객체 리턴해준다. (회원가입(로그인) 후 받아온 response를 리덕스에 저장)
export const loginUserInfo = (id, img)=>{
    return {
        type: 'login', 
        loginUser:{id, img}  //이게 리턴해주는 액션객체
    }
}

// export const logoutUserInfo = ()=>{
//     return {
//         type : 'logout',
//         logoutUser:{
//             id: "아이디는 뭘까",
//             img:null,
//         }
//     }
// }

export default function userInformationReducer(state = initState, action){

    switch(action.type) {
        case 'login':
            return{
                ...state,
                userInformation: {
                    userId: action.loginUser.id,   //저 위에있는 loginUserInfo함수에서 반환된 액션객체 loginUser에있는 id를  userInformation에 다시 세팅한다. 
                    userImg: action.loginUser.img,
                }
            }
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
