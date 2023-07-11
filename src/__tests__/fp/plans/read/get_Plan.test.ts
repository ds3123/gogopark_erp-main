/* eslint-disable jest/valid-title */

import { get_PlanUsedRecord_Id , get_PlanUsedRecord_DeleteInfo_Obj } from "fp/plans/read/get_Plan"


describe( "測試 get_PlanUsedRecord_Id : 取得 _ 方案使用記錄 : 資料表 id" , () => { 

    test( "輸入資料，含有 plan 方案屬性，回傳 _ 方案 : 資料表 id" , () => {

        const data = { plan : { id : "4" } }

        expect( get_PlanUsedRecord_Id( data ) ).toBe( "4" ) ;            
 

    }) ;

    test( "輸入資料，沒有 plan 方案屬性，回傳 _ 空字串" , () => {
    
        const data = { plan : undefined }

        expect( get_PlanUsedRecord_Id( data ) ).toBe( "" ) ;            
 
        
    }) ;


}) ; 


describe( "測試 get_PlanUsedRecord_DeleteInfo_Obj : 取得 _ 服務單銷單 ( 資料表 : plan_used_records ) : 所有資訊物件" , () => { 


      test( "輸入 planUsedRecord_Id -> 有值 ( 為使用方案 ) 時" , () => {

            const delete_Obj = {
                                  is_delete        : 1 ,
                                  delete_submitter : "無使用者資訊"
                                }
      
            const planUsedRecord_Id = "6" ;

            const result = {
                             planId                   : "6" , 
                             planUsedRecord_DeleteObj : { 
                                                          is_delete        : 1 ,
                                                          delete_submitter : "無使用者資訊"
                                                        } 
                            } ;

            expect( get_PlanUsedRecord_DeleteInfo_Obj( delete_Obj )( planUsedRecord_Id ) ).toEqual( result ) ;   
      
       }) ;

      test( "輸入資料，planUsedRecord_Id -> 沒有值 ( 不是使用方案 ) 時" , () => {

            const delete_Obj = {
                                 is_delete        : 1 ,
                                 delete_submitter : "無使用者資訊"
                               }

             const planUsedRecord_Id = "" ;

             const result = {
                              planId                   : "" , 
                              planUsedRecord_DeleteObj : { 
                                                          is_delete        : 1 ,
                                                          delete_submitter : "無使用者資訊"
                                                        } 
                            } ;

            expect( get_PlanUsedRecord_DeleteInfo_Obj( delete_Obj )( planUsedRecord_Id ) ).toEqual( result ) ;  
      
      }) ;


}) ; 









