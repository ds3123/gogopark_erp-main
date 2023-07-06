
import { createStore , applyMiddleware , combineReducers } from "redux" ;
import thunk from 'redux-thunk' ;
import root_Reducer from "store/reducers/root_Reducer" ;
 


// 利用 find() 方法，依照輸入 data-test 屬性，取得 _ 特定元素
export const findByTestAttr = ( wrapper : any , val : string ) =>  wrapper.find( `[data-test='${ val }']` ) ;


// 取得 _ 輸入文字中，猜對的字數
export const getLetterMatchCount = ( guessedWord : string , secretWord : string ) : number => { 

    const secretLetters    = secretWord.split('') ;   // 待猜測文字
    const guessedLetterSet = new Set( guessedWord ) ; // 猜測文字

    return secretLetters.filter( letter => guessedLetterSet.has( letter ) ).length

}


// 建立 _ Redux Store ( 回傳 : store )
//export const storeFactory = ( initialState : any , reducer_Obj : any = {} ) => {
export const storeFactory = ( reducer_Obj : any = {} , initialState : any = {} ) => {

    const rootReducer = combineReducers( reducer_Obj )

    // return createStore( rootReducer , initialState , applyMiddleware( thunk ) ) ;
    return createStore( rootReducer , initialState ,  applyMiddleware( thunk ) ) ;

} ;


