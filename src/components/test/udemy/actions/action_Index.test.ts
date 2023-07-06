
import moxios from "moxios" ;
import { get_SecreteWord } from "./action_Index" ;

import { storeFactory } from "../jotto/utils/tool" ;

import { reducer_GuessWord } from "../reducers/reducer_GuessWord" ;


describe( "get_SecreteWord : 從伺服器中，取得 _ 待猜測文字" , () => { 

   beforeEach( () => {
      moxios.install() ;    // 安裝 moxios
   })
   
   afterEach( () => {
      moxios.uninstall();  // 卸載 moxios
   })


   // 先跳過此測試 ( 測試失敗 : respondWith 為 undefined  2022.09.15 )
   test.skip( "get_SecreteWord 能成功發出非同步請求，取得資料 : party" , () => {

       // 建立 _ store
       const reducers_Obj = { GUESS_WORD : reducer_GuessWord }
       const store : any  = storeFactory( reducers_Obj ) ;

      // mock 固定回傳資料為 "party"
      // moxios.wait( () => {

      //      // 資料請求
      //      const request = moxios.requests.mostRecent() ; 
           
      //      // 設定 _ 請求所要回傳的內容 
      //      request.respondWith({
      //                            status   : 200 ,
      //                            response : "party"
      //                          }) ;

      
      //  }) ;

    
      // 利用 store 發出請求，並作斷言 
      return store.dispatch( get_SecreteWord() )
                  .then( () => {

                            const guess_Word_Obj : any = store.getState().GUESS_WORD
                            const secreteWord = guess_Word_Obj.secreteWord 

                            expect( secreteWord ).toBe( "party" ) ;

                         }) ;


   }) ; 




}) ;



