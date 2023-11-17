/* eslint-disable jest/valid-title */

import { 
          get_PlanUsedRecord_Id , 
          get_PlanUsedRecord_DeleteInfo_Obj ,
          get_MonthBath_Per_ServiceAmount ,
          get_MonthBeauty_Per_ServiceAmount ,
          get_UsePlan_ServiceAmount
        } from "fp/plans/read/get_Plan" ;




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






describe( "測試 _ 使用方案 1 次的 ( 績效 ) 金額 " , () => { 


   test( "get_MonthBath_Per_ServiceAmount() : 使用方案：「 包月洗澡 」，洗澡 1 次價格" , () => {
   
       expect( get_MonthBath_Per_ServiceAmount( 1200 ) ).toBe( 300 ) ;
       expect( get_MonthBath_Per_ServiceAmount( 1235 ) ).toBe( 309 ) ;  
       expect( get_MonthBath_Per_ServiceAmount( 1225 ) ).toBe( 306 ) ;  
   
   }) ;

   test( "get_MonthBeauty_Per_ServiceAmount() : 使用方案：「 包月美容 」，洗澡 1 次價格" , () => {
   
       expect( get_MonthBeauty_Per_ServiceAmount( 1200 , '洗澡' ) ).toBe( 240 ) ;
       expect( get_MonthBeauty_Per_ServiceAmount( 1236 , '洗澡' ) ).toBe( 247 ) ;
       expect( get_MonthBeauty_Per_ServiceAmount( 1243 , '洗澡' ) ).toBe( 249 ) ;

   }) ;

   test( "get_MonthBeauty_Per_ServiceAmount() : 使用方案：「 包月美容 」，美容 1 次價格" , () => {
   
       expect( get_MonthBeauty_Per_ServiceAmount( 1200 , '美容' ) ).toBe( 480 ) ;
       expect( get_MonthBeauty_Per_ServiceAmount( 1236 , '美容' ) ).toBe( 494 ) ;  
       expect( get_MonthBeauty_Per_ServiceAmount( 1243 , '美容' ) ).toBe( 498 ) ;

   }) ;

   test( "get_UsePlan_ServiceAmount() : 使用方案 1 次的 ( 績效 ) 金額" , () => {
   
       expect( get_UsePlan_ServiceAmount( 1200 , '包月洗澡' , '洗澡' ) ).toBe( 300 ) ;
       expect( get_UsePlan_ServiceAmount( 1200 , '包月美容' , '洗澡' ) ).toBe( 240 ) ;
       expect( get_UsePlan_ServiceAmount( 1200 , '包月美容' , '美容' ) ).toBe( 480 ) ;

   }) ;

}) ; 













