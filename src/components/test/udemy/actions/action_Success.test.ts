/* eslint-disable jest/valid-title */


import { action_Types , correctGuess } from "./action_Success" ;



describe( "Action : correctGuess" , () => { 

   test( "correctGuess Action 回傳物件的 type 屬性 為 'CORRECT_GUESS' " , () => {

         const expect_Obj = { type : action_Types.CORRECT_GUESS } ;

         expect( correctGuess() ).toStrictEqual( expect_Obj ) ;


   }) ; 

}) ;



