import { mount } from "enzyme" ;
import { findByTestAttr , storeFactory } from "./utils/tool" ;
import { Jotto_App } from "./Jotto_App" ;
import { Provider } from "react-redux" ;
import { reducer_GuessWord } from "../reducers/reducer_GuessWord" ;




// 啟動 _ 全域模擬 ( global mock ) : get_SecreteWord ( 使其不會發出網路資料請求 ）
jest.mock( "../actions/action_Index" ) ;


/*

   # 功能性測試 ( Functional Test )

*/

const setup = ( initialState : any = {} ) => {

   // TODO : apply _ Redux State
   const reducers_Obj = { GuessWord : reducer_GuessWord }
  
   const store        = storeFactory( reducers_Obj , initialState )   
   const wrapper      = mount( <Provider store = { store }>  <Jotto_App  /> </Provider> ) ;


   // * 預先輸入一筆資料

   // 先輸入文字，至輸入框中
   const inputBox = findByTestAttr( wrapper , "input-box" ) ;
   inputBox.simulate( "change" , { target : { value : "train" } } ) ;


   // 點選 _ 提交按鈕
   const submitButton = findByTestAttr( wrapper , "submit-button" ) ;
   submitButton.simulate( "click" , { preventDefault(){} } ) ;

   return wrapper

}

 
describe( "無效的猜測文字" , () => { 

   test.todo( "猜測表格，沒有新增一列" ) ; 

}) ;



describe.skip( "沒有猜對文字" , () => { 

   let wrapper : any ;

   beforeEach( () => {

      wrapper = setup({  
                        GUESS_WORD : {
                                       secretWord   : "party" , 
                                       is_Success   : false , 
                                       guessedWords : [] 
                                      }
                      }) ;

   } ) ;

   test( "測試文字表格，僅顯示 1 列 ( 提交的 1 列 )" , () => {

        const guessedWordRows = findByTestAttr( wrapper , "guessed-word-count" ) ;

        expect( guessedWordRows ).toHaveLength( 1 ) ;

   }) ; 

}) ;

describe.skip( "猜對部分文字" , () => { 

   let wrapper : any ;

   beforeEach( () => {

      wrapper = setup({  
                          GUESS_WORD : {
                                          secretWord   : "party" , 
                                          is_Success   : false , 
                                          guessedWords : [ { guessWord : "agile" , letterMatchCount : 1 } ] 
                                       } 
                      }) ;

   } ) ;

   test( "測試文字表格，顯示 2 列 ( 包含提交的 1 列 )" , () => {

      const guessedWordRows = findByTestAttr( wrapper , "guessed-word-count" ) ;

      expect( guessedWordRows ).toHaveLength( 2 ) ;

   }) ; 

}) ;

describe.skip( "完全猜對文字" , () => { 

   let wrapper : any ;

   beforeEach( () => {

      wrapper = setup({  
                         GUESS_WORD : {
                                          secretWord   : "party" , 
                                          is_Success   : false , 
                                          guessedWords : [ { guessWord : "agile" , letterMatchCount : 1 } ] 
                                       }           
                      }) ;

      // 先新增數值
      const inpuBox    = findByTestAttr( wrapper , "input-box" ) ;
      const mock_Event = { target : { value : "party" } } ;
      inpuBox.simulate( "change" , mock_Event ) ;

      // 點選 _ 提交鈕
      const submitButton = findByTestAttr( wrapper , "submit-button" ) ;
      submitButton.simulate( "click" , { preventDefault(){} } ) ; 

   } ) ;

   test( "新增 _ 所猜測的資料至表格中，共計 3 列 ( 初始、setup 新增、beforeEach 新增 )" , () => {

      const guessedWordRows = findByTestAttr( wrapper , "guessed-word-count" ) ;

      expect( guessedWordRows ).toHaveLength( 3 ) ;

   }) ; 

   test( "顯示 _ 恭喜訊息" , () => {

      const congrats = findByTestAttr( wrapper , "component-congrats" ) ;
      
      expect( congrats.text().length ).toBeGreaterThan( 0 ) ;

   }) ;

   test( "不顯示 _ 輸入框 以及 提交鈕" , () => {
   
      const inputBox     = findByTestAttr( wrapper , "input-box" ) ;
      expect( inputBox.exists() ).toBe( false ) ;

      const submitButton = findByTestAttr( wrapper , "submit-button" ) ;
      expect( submitButton.exists() ).toBe( false ) ;
   
   }) ;








}) ;












