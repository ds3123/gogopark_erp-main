
import { Dispatch } from "redux" ;
import { getLetterMatchCount } from "../jotto/utils/tool" ;


// Action 類型
export const action_Types = {

    CORRECT_GUESS   : "CORRECT_GUESS" , // 猜對了
    GUESS_WORD      : "GUESS_WORD" ,    // 猜測文字
    SET_SECRET_WORD : "SET_SECRET_WORD" // 設定 _ 猜測文字

}

// -----------


// 猜測正確 ( 一般 Action -> 回傳 : 物件 ) 
export const correctGuess = () => {

    return { type : action_Types.CORRECT_GUESS }  

} ;


// 猜測數字 ( Thunk Action -> 回傳 : 函式 )

/*

  @function guessWord
  @param    { string } word - Guess word
  @return   { funciton }    - Redux Thunk function

*/

export const guessWord = ( secreteWord : string , guessWord : string ) => {

    return ( dispatch : Dispatch , getState : any ) => {


                // 計算符合字數
                 const letterMatchCount = getLetterMatchCount( guessWord , secreteWord ) ;


                 // 取得 _ 初始 
                 const guessedWords = getState().GUESS_WORD.guessedWords ; 

                 
                 const gArr = guessedWords ? 
                               [ ...guessedWords , { guessedWord : guessWord , letterMatchCount : letterMatchCount } ] :
                               [ { guessedWord : guessWord , letterMatchCount : letterMatchCount } ]
                             

                // * Dispatch 2 個 action
                
                // 1. 猜測文字  
                dispatch({
                              type         : action_Types.GUESS_WORD ,
                              secreteWord  : secreteWord ,  
                              guessedWords : gArr           
                         })


                // 2. 若猜對文字
                if( guessWord === secreteWord )  dispatch( { type : action_Types.CORRECT_GUESS } ) ;
                
            

           } ;

} ;






