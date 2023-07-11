/* eslint-disable jest/valid-title */

import { 
    get_ServiceOrderId  , 
         get_ServiceOrderId_By_PlanUsedRecord ,
         get_ServiceOrderUrl , 
         get_ServiceOrder_Url_Id , 
         get_ServiceOrder_BasicUpdate_Obj ,
         get_ServiceOrder_DeleteInfo_Obj ,
         get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord
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




























