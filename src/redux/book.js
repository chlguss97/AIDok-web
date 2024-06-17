const initState = {
    userBooks: [], // 초기 상태에서는 빈 배열로 시작
  };
  
  // 액션 타입 정의
  const SET_USER_BOOKS = "SET_USER_BOOKS";
  const ADD_USER_BOOK = "ADD_USER_BOOK";
  const REMOVE_USER_BOOK = "REMOVE_USER_BOOK";
  const UPDATE_USER_BOOK = "UPDATE_USER_BOOK";
  
  // 액션 생성 함수
  export const setUserBooks = (books) => {
    return {
      type: SET_USER_BOOKS,
      books,
    };
  };
  
  export const addUserBook = (book) => {
    return {
      type: ADD_USER_BOOK,
      book,
    };
  };
  
  export const removeUserBook = (isbn) => {
    return {
      type: REMOVE_USER_BOOK,
      isbn,
    };
  };
  
  export const updateUserBook = (isbn, updatedFields) => {
    return {
      type: UPDATE_USER_BOOK,
      isbn,
      updatedFields,
    };
  };
  
  // 리듀서
  const userBookReducer = (state = initState, action) => {
    switch (action.type) {
      case SET_USER_BOOKS:
        return {
          ...state,
          userBooks: action.books,
        };
  
      case ADD_USER_BOOK:
        return {
          ...state,
          userBooks: [...state.userBooks, action.book],
        };
  
      case REMOVE_USER_BOOK:
        return {
          ...state,
          userBooks: state.userBooks.filter(book => book.isbn !== action.isbn),
        };
  
      case UPDATE_USER_BOOK:
        return {
          ...state,
          userBooks: state.userBooks.map(book =>
            book.isbn === action.isbn ? { ...book, ...action.updatedFields } : book
          ),
        };
  
      default:
        return state;
    }
  };
  
  export default userBookReducer;