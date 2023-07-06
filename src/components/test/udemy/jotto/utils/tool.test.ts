

import { getLetterMatchCount } from "./tool" ;


describe( "getLetterMatchCount : 取得 _ 輸入文字中，猜對的字數" , () => { 


   const secretWord = "party" ; 

   test( "當沒有任何猜對字數時，回傳 0" , () => {

        const matchCount = getLetterMatchCount( "bones" , secretWord ) ;

        expect( matchCount ).toBe( 0 ) ;

   }) ; 

   test( "當有猜對 3 個字數時，回傳 3" , () => {

        const matchCount = getLetterMatchCount( "train" , secretWord ) ;

        expect( matchCount ).toBe( 3 ) ;
   
   
   }) ;

   test( "當猜對文字重複時，不列入計數" , () => {
   
        const matchCount = getLetterMatchCount( "parka" , secretWord ) ;

        expect( matchCount ).toBe( 3 ) ;
   
   }) ;
   

}) ;



