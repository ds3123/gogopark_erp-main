

import { reducer_Success } from "./reducer_Success" ;
import { action_Types } from "../actions/action_Success" ;

 

describe( "Reducer 測試 : reducer_Success" , () => { 

   test( "當 初始 state ( previous state) 為 undefined ，回傳 false" , () => {

        const newState = reducer_Success( undefined , {} ) ;
        expect( newState ).toBe( false ) ;
        
   }) ; 


   test( "當 Action type 為 unknown 時，回傳 false ( 初始 state / previous state )" , () => {
   
       const newState = reducer_Success( false , { type : "unknown" } ) ;
       expect( newState ).toBe( false ) ;

   }) ;

   test( "當 Action type 為 'CORRECT_GUESS' 時，初始 state 回傳 true" , () => {
   
       const newState = reducer_Success( false , { type : action_Types.CORRECT_GUESS } ) ;
       expect( newState ).toBe( true ) ;

   }) ;


}) ;



