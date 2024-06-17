const initState= {
    wantBook: {
        ISBN:"",
        state:"",
        title:"",
        writer:"",
        img:"",
        totalpage:"",
        readpage:"",
        summary:"",
        endyear:"",
    },
    ingBook: {
        ISBN:"",
        state:"",
        title:"",
        writer:"",
        img:"",
        totalpage:"",
        readpage:"",
        summary:"",
        endyear:"",
    },
    endBook: {
        ISBN:"",
        state:"",
        title:"",
        writer:"",
        img:"",
        totalpage:"",
        readpage:"",
        summary:"",
        endyear:"",
    },

}



// 내다 여기저기서 쓸 함수 - 액션객체 리턴해준다. (회원가입(로그인) 후 받아온 response를 리덕스에 저장)
export const loginUserInfo = (id, img)=>{
    return {
        type: 'login', 
        loginUser:{id, img}  //이게 리턴해주는 액션객체
    }
}


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