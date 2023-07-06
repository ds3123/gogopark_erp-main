

import React from "react" ;
import { shallow } from "enzyme"
import { findByTestAttr , storeFactory } from "./utils/tool" ;
import { Input } from "./Input" ;

import { Provider } from "react-redux" ;
import { reducer_GuessWord } from "../reducers/reducer_GuessWord" ;



const setup = ( is_Success : boolean = false  , secreteWord : string = "party"  ) => {

    const reducers_Obj = { GuessWord : reducer_GuessWord }

    const store        = storeFactory( reducers_Obj  )   

   return shallow(  <Input secreteWord = { secreteWord } is_Success = { is_Success }  /> ) ;
    
}





describe( "是否顯示元件 : Input " , () => { 

  
    describe( "屬性 is_Success 為 true" , () => { 
      
        let wrapper : any ;

        beforeEach( () => {

           wrapper = setup( true );

        } )
    
        test( "畫面有元件：component-input ( 基本元件 )" , () => {

            const inputComponent = findByTestAttr( wrapper , "component-input" ) ;

            expect( inputComponent.length ).toBe( 1 ) ;
        

        }) ;

        test( "輸入框 ( input-box ) 不顯示" , () => {
        
             const inputBox = findByTestAttr( wrapper , "input-box" ) ;

             expect( inputBox.length ).toBe( 0 ) ;
    
        }) ;

        test( "提交鈕 ( submit-button ) 不顯示" , () => {
        
            const submitButton = findByTestAttr( wrapper , "submit-button" ) ;

            expect( submitButton.length ).toBe( 0 ) ;
   
       }) ;
   
    

    }) ;


    describe( "屬性 is_Success 為 false" , () => { 
    
        let wrapper : any ;

        beforeEach( () => {

           wrapper = setup( false );

        } )
    
        test( "畫面有元件：component-input ( 基本元件 )" , () => {

            const inputComponent = findByTestAttr( wrapper , "component-input" ) ;

            expect( inputComponent.length ).toBe( 1 ) ;
        

        }) ;

        test( "輸入框 ( input-box ) 顯示" , () => {
        
             const inputBox = findByTestAttr( wrapper , "input-box" ) ;

             expect( inputBox.length ).toBe( 1 ) ;
    
        }) ;

        test( "提交鈕 ( submit-button ) 顯示" , () => {
        
            const submitButton = findByTestAttr( wrapper , "submit-button" ) ;

            expect( submitButton.length ).toBe( 1 ) ;
   
       }) ;
    }) ;
    
    
    
    
    
    
}) ;




describe( "狀態控制 ( state controlled ) _ 輸入測試" , () => { 

   // 模擬 _ 改變狀態的方法 : set_currentGuess() --> 監控是否有 ( 以某特定參數 ) 執行
   let mock_SetCurrentGuess : any = jest.fn() ; 

   // 待測試元件
   let wrapper : any ;

   // React 中初始 useState
   let original_useState : any ;

   // # 每次測試 : 開始
   beforeEach( () => {
  
       // 先清除 mock
       mock_SetCurrentGuess.mockClear() ;  

       // 儲存 _  React 中初始 useState ( 供每次測試結束後復原 )
       original_useState = React.useState ;


       // 將實際 useState() 方法的回傳值，改為 _ 空字串，以及所模擬的 mock_SetCurrentGuess()
       React.useState = jest.fn( () => [ "" , mock_SetCurrentGuess ] ) ;

       // 取得 _ 待測試元件
       wrapper = setup(  ) ;

   }) ;

   // # 每次測試：結束
   afterEach( () => {

       // 復原 _ React 中初始 useState
       React.useState = original_useState ; 

   }) ;


   test( "輸入框輸入文字後，狀態 ( currentGuess ) 會改變" , () => {

       const inpuBox = findByTestAttr( wrapper , "input-box" ) ;

       // 觸發 _ 輸入框 onChange 事件 ( 輸入 train ) 
       const mock_Event = { target : { value : "train" } } ;
       inpuBox.simulate( "change" , mock_Event ) ;
 
       // 是否有以 "train" 為參數，觸發執行
       expect( mock_SetCurrentGuess ).toHaveBeenCalledWith( "train" ) ;  

   }) ;
   
   test( "點選 _ 提交鈕後，輸入框的值會被清空" , () => {

       const submitButton = findByTestAttr( wrapper , "submit-button" ) ;

       // 點選 _ 提交按鈕 ( 第二個參數 for 點選後 preventDefault )
       submitButton.simulate( "click" , { preventDefault(){} } ) ;

       // 是否有以 "train" 為參數，觸發執行
       expect( mock_SetCurrentGuess ).toHaveBeenCalledWith( "" ) ;  


   }) ;
   

}) ;



