

import { shallow } from "enzyme" ;
import { findByTestAttr } from "./utils/tool" ;
import { GuessWords , Type_GuessWords } from "./GuessWords" ;


// 樣板設定 / Helper function 



const setup = ( defaultProps : Type_GuessWords ) => shallow( <GuessWords { ...defaultProps } /> )


// ------------------

describe( "沒有輸入 _ 猜測文字" , () => { 

   let wrapper : any ;   // 放在 beforeEach 之外，確認在此 describe 下的各個 test 都能存取到 wrapper  

   // 此 describe 下，每一個 test
   beforeEach( () => { 

      const defaultProps = {
                             secreteWord : "" ,
                             is_Success  : false ,
                             guessWords  : [] 
                            }

      wrapper = setup( defaultProps ) ;;  
        
   })


   test( "畫面有元件：component-guesswords ( 基本元件 )" , () => {

        const component = findByTestAttr( wrapper , "component-guesswords" ) ;

        expect( component.length ).toBe( 1 ) ;

   }) ; 

   test( "若沒有輸入猜測文字，顯示 _ 元素 : guess-instruction ( 猜測指示 )" , () => {
   
        const component = findByTestAttr( wrapper , "guess-instruction" ) ;

        expect( component.text().length ).not.toBe( 0 ) ;

   }) ;

}) ;


describe( "有輸入 _ 猜測文字" , () => { 


  let wrapper : any ;   // 放在 beforeEach 之外，確認在此 describe 下的各個 test 都能存取到 wrapper  

  // 已猜測文字
  const guessWordsArr = [
                          { guessWord : "train" , letterMatchCount : 3 } ,
                          { guessWord : "agile" , letterMatchCount : 1 } ,
                          { guessWord : "party" , letterMatchCount : 5 } ,
                         ] ; 


   beforeEach( () => {

      const defaultProps = {
                             secreteWord : "" ,
                             is_Success  : false ,
                             guessWords  : guessWordsArr
                           }

      wrapper = setup( defaultProps ) ;  

   }) 


   test( "畫面有元件：component-guesswords ( 基本元件 )" , () => {

        const component = findByTestAttr( wrapper , "component-guesswords" ) ;

        expect( component.length ).toBe( 1 ) ;

   }) ; 

   test( "若有輸入猜測文字，顯示 _ 元素 : guessed-words ( 已猜測文字區塊 )" , () => {
   
       const guessedWordsNode = findByTestAttr( wrapper , "guessed-words" ) ;

       expect( guessedWordsNode.length ).toBe( 1 ) ;
   
   }) ;

   test( "顯示 _ 已猜測次數" , () => {
   
       const guessedWordsNode = findByTestAttr( wrapper , "guessed-word-count" ) ;

       expect( guessedWordsNode.length ).toBe( guessWordsArr.length ) ;


   }) ;



}) ;










