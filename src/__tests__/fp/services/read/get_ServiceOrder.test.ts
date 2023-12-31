/* eslint-disable jest/valid-title */

import { 
         get_ServiceOrderId  , 
         get_ServiceOrderId_By_PlanUsedRecord ,
         get_ServiceOrderUrl , 
         get_ServiceOrder_Url_Id , 
         get_ServiceOrder_BasicUpdate_Obj ,
         get_ServiceOrder_DeleteInfo_Obj ,
         get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord ,
         get_ServiceOrder_NotComplete_Paid ,
         get_ServiceOrder_ServiceDate ,
         get_ServiceOrder_LeaveTime ,
         get_ServiceOrder_ArrivedTime
        } from "fp/services/read/get_ServiceOrder" ;


describe( "測試 get_ServiceOrderId : 取得 _ 服務單 : 資料表 id ( 藉由 _ 服務單本身資料 )" , () => { 

    test( "資料類型為 : '基礎'，資料單 id 欄位為 'basic_id'" , () => {

        const serviceData = {
                              service_type : "基礎" ,
                              basic_id     : "1" ,  
                            } as any ;

        expect( get_ServiceOrderId( serviceData ) ).toBe( "1" ) ;

    }) ;   

    test( "資料類型為 : '洗澡'，資料單 id 欄位為 'bath_id'" , () => {

        const serviceData = {
                              service_type : "洗澡" ,
                              bath_id      : "2" ,  
                            } as any ;

        expect( get_ServiceOrderId( serviceData ) ).toBe( "2" ) ;

    }) ;

    test( "資料類型為 : '美容'，資料單 id 欄位為 'beauty_id'" , () => {

        const serviceData = {
                              service_type : "美容" ,
                              beauty_id    : "3" ,  
                            } as any ;

        expect( get_ServiceOrderId( serviceData ) ).toBe( "3" ) ;

    }) ;

    test( "資料類型為 : 其他類型 ( Ex. 住宿 )，回傳空字串" , () => {

        const serviceData = {
                              service_type : "住宿" ,
                            } as any ;

        expect( get_ServiceOrderId( serviceData ) ).toBe( "" ) ;

    }) ;




}) ; 


describe( "測試 get_ServiceOrderId_By_PlanUsedRecord : 取得 _ 服務單 : 資料表 id ( 藉由 _ 方案使用記錄 )" , () => { 


    test( "方案記錄屬於 '洗澡' 時" , () => {
    
         const record = {
                           id           : "1" ,
                           service_type : "洗澡" ,
                           bath         : { bath_id : "33" }
                        } as any ;

         expect( get_ServiceOrderId_By_PlanUsedRecord( record ) ).toBe( "33" ) ;                 
    
    }) ;

    test( "方案記錄屬於 '美容' 時" , () => {

        const record = {
                         id           : "2" ,
                         service_type : "美容" ,
                         beauty       : { beauty_id : "44" }
                       } as any ;

        expect( get_ServiceOrderId_By_PlanUsedRecord( record ) ).toBe( "44" ) ; 
    
    }) ;

}) ; 


describe( "測試 get_ServiceOrderUrl : 取得 _ 服務單 : API Url" , () => { 

    test( "資料類型為 : '基礎', 回傳 '/basics'" , () => {

        expect( get_ServiceOrderUrl( "基礎" ) ).toBe( '/basics' ) ;

    }) ;

    test( "資料類型為 : '洗澡', 回傳 '/bathes'" , () => {

        expect( get_ServiceOrderUrl( "洗澡" ) ).toBe( '/bathes' ) ;

    }) ;

    test( "資料類型為 : '美容', 回傳 '/beauties'" , () => {

        expect( get_ServiceOrderUrl( "美容" ) ).toBe( '/beauties' ) ;

    }) ;

    test( "資料類型為 : 其他類型 ( Ex. 住宿 ), 回傳 空字串" , () => {

        expect( get_ServiceOrderUrl( "住宿" ) ).toBe( '' ) ;

    }) ;


}) ; 


describe( "測試 get_ServiceOrder_Url_Id : 同時取得 _ 服務單 : API Url + 資料表 id" , () => { 


    test( "資料類型為 : '基礎', 回傳 url 為 '/basics' 、資料表 id 為 '1'" , () => {
    
        const serviceData = {
                               service_type : "基礎" ,
                               basic_id     : "1" ,  
                             } as any ;

        expect( get_ServiceOrder_Url_Id( serviceData ) ).toEqual( { serviceUrl : "/basics" , serviceId : "1" } ) ;

    }) ;

    test( "資料類型為 : '洗澡', 回傳 url 為 '/bathes' 、資料表 id 為 '2'" , () => {

        const serviceData = {
                              service_type : "洗澡" ,
                              bath_id     : "2" ,  
                             } as any ;

        expect( get_ServiceOrder_Url_Id( serviceData ) ).toEqual( { serviceUrl : "/bathes" , serviceId : "2" } ) ;
    
    }) ;

    test( "資料類型為 : '美容', 回傳 url 為 '/beauties' 、資料表 id 為 '3'" , () => {
    
        const serviceData = {
                               service_type : "美容" ,
                               beauty_id    : "3" ,  
                             } as any ;

        expect( get_ServiceOrder_Url_Id( serviceData ) ).toEqual( { serviceUrl : "/beauties" , serviceId : "3" } ) ;

    }) ;

    test( "資料類型為 : 其他類型 ( Ex. 住宿 ), 回傳 url 為 '' 、資料表 id 為 '' " , () => {
    
        const serviceData = {
                              service_type : "住宿" ,
                            } as any ;

        expect( get_ServiceOrder_Url_Id( serviceData ) ).toEqual( { serviceUrl : "" , serviceId : "" } ) ;

    }) ;


}) ; 


describe( "測試 get_ServiceOrder_BasicUpdate_Obj : 取得 _ 基本修改物件" , () => { 

    test( "輸入 url , id 值，回傳 _ 相對應物件" , () => {


          expect( get_ServiceOrder_BasicUpdate_Obj( "/bathes" , "3" ) ).toEqual( {
                                                                                    "serviceOrder_Url" : "/bathes" ,
                                                                                    "serviceOrder_Id"  : "3" 
                                                                                  })  

    
    }) ;

}) ; 


describe( "測試 get_ServiceOrder_DeleteInfo_Obj : 輸入 _ '服務單'資料 _ ，回傳 _ 銷單所需資訊物件" , () => { 

    test( "服務單類型為 : '基礎'，資料表 id 為 '1' , 銷單提交者為 '無使用者資訊'" , () => {


          const delete_Obj = {
                               is_delete        : 1 ,
                               delete_submitter : "無使用者資訊"
                             }

          const data_Obj = {
                             service_type : "基礎" ,
                             basic_id     : "1"         
                           } as any ;

           expect( get_ServiceOrder_DeleteInfo_Obj( delete_Obj )( data_Obj ) ).toEqual({

                            serviceOrder_Url       : '/basics' ,
                            serviceOrder_Id        : '1' ,
                            serviceOrder_DeleteObj : { 
                                                        is_delete        : 1 ,
                                                        delete_submitter : "無使用者資訊"
                                                        }

                         }) ;
         
    
    }) ;

    test( "服務單類型為 : '洗澡'，資料表 id 為 '2' , 銷單提交者為 '無使用者資訊'" , () => {


           const delete_Obj = {
                                is_delete        : 1 ,
                                 delete_submitter : "無使用者資訊"
                              }
    
            const data_Obj = {
                                service_type : "洗澡" ,
                                bath_id      : "2"         
                              } as any ;

            expect( get_ServiceOrder_DeleteInfo_Obj( delete_Obj )( data_Obj ) ).toEqual({

                    serviceOrder_Url       : '/bathes' ,
                    serviceOrder_Id        : '2' ,
                    serviceOrder_DeleteObj : { 
                                                is_delete        : 1 ,
                                                delete_submitter : "無使用者資訊"
                                             }

           }) ;
    
    }) ;

    test( "服務單類型為 : '美容'，資料表 id 為 '3' , 銷單提交者為 '無使用者資訊'" , () => {
    
        const delete_Obj = {
                             is_delete        : 1 ,
                             delete_submitter : "無使用者資訊"
                           }
         

        const data_Obj = {
                            service_type : "美容" ,
                            beauty_id    : "3"         
                         } as any ;

        expect( get_ServiceOrder_DeleteInfo_Obj( delete_Obj )( data_Obj ) ).toEqual({

                        serviceOrder_Url       : '/beauties' ,
                        serviceOrder_Id        : '3' ,
                        serviceOrder_DeleteObj : { 
                                                    is_delete        : 1 ,
                                                    delete_submitter : "無使用者資訊"
                                                }

                    }) ;


    
    }) ;


}) ; 


describe( "測試 get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord : 輸入 _ '方案使用記錄'資料 _ ，回傳 _ 銷單所需資訊物件" , () => { 

    
        test( "方案使用記錄屬於 : '洗澡'，" , () => {

                const delete_Obj = {
                                     is_delete        : 1 ,
                                     delete_submitter : "無使用者資訊"
                                    }

                const data_Obj = {
                                    id           : "2" ,
                                    service_type : "洗澡" ,
                                    bath         : { bath_id : "45" }       
                                } as any ;


                expect( get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord( delete_Obj )( data_Obj ) ).toEqual({

                        serviceOrder_Url       : '/bathes' ,
                        serviceOrder_Id        : '45' ,
                        serviceOrder_DeleteObj : { 
                                                    is_delete        : 1 ,
                                                    delete_submitter : "無使用者資訊"
                                                }
        
                }) ;

        }) ;   
        
        
        test( "方案使用記錄屬於 : '美容'，" , () => {



                const delete_Obj = {
                                     is_delete        : 1 ,
                                     delete_submitter : "無使用者資訊"
                }

                const data_Obj = {
                                    id           : "3" ,
                                    service_type : "美容" ,
                                    beauty       : { beauty_id : "99" }       
                                } as any ;


                expect( get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord( delete_Obj )( data_Obj ) ).toEqual({

                        serviceOrder_Url       : '/beauties' ,
                        serviceOrder_Id        : '99' ,
                        serviceOrder_DeleteObj : { 
                                                    is_delete        : 1 ,
                                                    delete_submitter : "無使用者資訊"
                                                }
        
                }) ;

        }) ;   


}) ; 



describe( "測試 _ 篩選 : 服務單 )" , () => { 


      test( "get_ServiceOrder_NotComplete_Paid : 取得 _ 服務單 : 尚未完成付款 ( 實付金額為 0 或 僅付 _ 部分實付金額 ) " , () => {
      
             const data = [ 
                            {  amount_payable : 400 , amount_paid : 200  } ,
                            {  amount_payable : 700 , amount_paid : 700  } ,
                            {  amount_payable : 500 , amount_paid : 0  } ,
                            {  amount_payable : 600 , amount_paid : 600  } ,
                            {  amount_payable : 200 , amount_paid : 100  } ,
                          ] ;

             const result = [ 
                              {  amount_payable : 400 , amount_paid : 200  } ,    
                              {  amount_payable : 500 , amount_paid : 0  } ,   
                              {  amount_payable : 200 , amount_paid : 100  } , 
                            ] ;
                            
            expect( get_ServiceOrder_NotComplete_Paid( data ) ).toEqual( result ) ;               
      

      }) ;


      test( "get_ServiceOrder_ServiceDate : 取得 _ 特定 : 服務日期 ( service_date ) 的服務單" , () => {
      
               const data = [
                              { service_date : "2023-02-03" } , 
                              { service_date : "2023-04-14" } , 
                              { service_date : "2023-05-11" } , 
                              { service_date : "2023-05-11" } , 
                              { service_date : "2023-06-24" } , 
                             ] ;


         expect( get_ServiceOrder_ServiceDate( "2023-05-11" )( data ) ).toEqual([
                                                                                 { service_date : "2023-05-11" } , 
                                                                                 { service_date : "2023-05-11" } , 
                                                                                ]) ;                  

      }) ;


      describe( "get_ServiceOrder_ArrivedTime : : 取得 _ 服務單 : '實際到店' " , () => { 

           test( "為新增模式或其他情境，沒有資料狀況下" , () => {

                const data_1   = null ;
                const data_2   = undefined ;
                const data_3   = "" ;

                expect( get_ServiceOrder_ArrivedTime( data_1 ) ).toBe( "" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_2 ) ).toBe( "" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_3 ) ).toBe( "" ) ;
         
           }) ;

           test( "預約單 ( 今天、未來 )" , () => {

                const data_1 = { service_status : "預約_未來" , shop_status : "尚未到店" ,     actual_arrive : "00:00" } ;
                const data_2 = { service_status : "預約_今天" , shop_status : "尚未到店" ,     actual_arrive : "00:00" } ;

                const data_3 = { service_status : "預約_未來" , shop_status : "到店等候中" ,   actual_arrive : "14:23" } ;
                const data_4 = { service_status : "預約_未來" , shop_status : "到店美容中" ,   actual_arrive : "14:23" } ;
                const data_5 = { service_status : "預約_未來" , shop_status : "洗完等候中" ,   actual_arrive : "14:23" } ;
                const data_6 = { service_status : "預約_未來" , shop_status : "已回家( 房 )" , actual_arrive : "14:23" } ;
           

                expect( get_ServiceOrder_ArrivedTime( data_1 ) ).toBe( "尚未到店" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_2 ) ).toBe( "尚未到店" ) ;
               
                expect( get_ServiceOrder_ArrivedTime( data_3 ) ).toBe( "14:23" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_4 ) ).toBe( "14:23" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_5 ) ).toBe( "14:23" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_6 ) ).toBe( "14:23" ) ;
           
           }) ;

           test( "現場單 ( 已到店 )" , () => {
           
                const data_1 = { service_status : "已到店"  ,  shop_status : "到店等候中" ,   actual_arrive : "14 : 40" } ;
                const data_2 = { service_status : "已到店"  ,  shop_status : "到店美容中" ,   actual_arrive : "14 : 40" } ;
                const data_3 = { service_status : "已到店"  ,  shop_status : "洗完等候中" ,   actual_arrive : "14 : 40" } ;
                const data_4 = { service_status : "已到店"  ,  shop_status : "已回家( 房 )" , actual_arrive : "14 : 40" } ;
                
                expect( get_ServiceOrder_ArrivedTime( data_1 ) ).toBe( "14 : 40" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_2 ) ).toBe( "14 : 40" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_3 ) ).toBe( "14 : 40" ) ;
                expect( get_ServiceOrder_ArrivedTime( data_4 ) ).toBe( "14 : 40" ) ;
           
           }) ;
      
      }) ; 

      describe( "get_ServiceOrder_LeaveTime : 取得 _ 服務單 : '離店時間'" , () => { 
         
           test( "為新增模式或其他情境，沒有資料狀況下" , () => {

                const data_1   = null ;
                const data_2   = undefined ;
                const data_3   = "" ;

                expect( get_ServiceOrder_LeaveTime( data_1 ) ).toBe( "" ) ;
                expect( get_ServiceOrder_LeaveTime( data_2 ) ).toBe( "" ) ;
                expect( get_ServiceOrder_LeaveTime( data_3 ) ).toBe( "" ) ;
           
           }) ;
      

           test( "預約單 ( 今天、未來 )" , () => {

               const data_1 = { service_status : "預約_未來" , shop_status : "尚未到店" , actual_leave : null } ;
               const data_2 = { service_status : "預約_今天" , shop_status : "尚未到店" , actual_leave : null } ;

               const data_3 = { service_status : "預約_未來" , shop_status : "到店等候中" , actual_leave : null } ;
               const data_4 = { service_status : "預約_未來" , shop_status : "到店美容中" , actual_leave : null } ;
               const data_5 = { service_status : "預約_未來" , shop_status : "洗完等候中" , actual_leave : null } ;
               const data_6 = { service_status : "預約_未來" , shop_status : "已回家( 房 )" , actual_leave : "15:30" } ;
           

               expect( get_ServiceOrder_LeaveTime( data_1 ) ).toBe( "尚未到店" ) ;
               expect( get_ServiceOrder_LeaveTime( data_2 ) ).toBe( "尚未到店" ) ;
              
               expect( get_ServiceOrder_LeaveTime( data_3 ) ).toBe( "尚未離店" ) ;
               expect( get_ServiceOrder_LeaveTime( data_4 ) ).toBe( "尚未離店" ) ;
               expect( get_ServiceOrder_LeaveTime( data_5 ) ).toBe( "尚未離店" ) ;
               expect( get_ServiceOrder_LeaveTime( data_6 ) ).toBe( "15:30" ) ;
           
           }) ;

           test( "現場單 ( 已到店 )" , () => {

                const data_1 = { service_status : "已到店"  ,  shop_status : "到店等候中" ,   actual_leave : null } ;
                const data_2 = { service_status : "已到店"  ,  shop_status : "到店美容中" ,   actual_leave : null } ;
                const data_3 = { service_status : "已到店"  ,  shop_status : "洗完等候中" ,   actual_leave : null } ;
                const data_4 = { service_status : "已到店"  ,  shop_status : "已回家( 房 )" , actual_leave : "14 : 40" } ;

                expect( get_ServiceOrder_LeaveTime( data_1 ) ).toBe( "尚未離店" ) ;
                expect( get_ServiceOrder_LeaveTime( data_2 ) ).toBe( "尚未離店" ) ;
                expect( get_ServiceOrder_LeaveTime( data_3 ) ).toBe( "尚未離店" ) ;
                expect( get_ServiceOrder_LeaveTime( data_4 ) ).toBe( "14 : 40" ) ;
           
           }) ;
      
      }) ; 
      
    
}) ; 































