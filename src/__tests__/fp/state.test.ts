/* eslint-disable jest/valid-title */

import { 
        is_Delete ,
        is_Error ,
        is_ServiceDate ,
        is_Service_Create ,
        is_Service_Update ,
        is_ServiceOrder_Update ,
        
        is_Past_ServiceDate ,
        is_Future_ServiceDate ,
        is_ServiceType_Basic ,
        is_ServiceType_Bath ,
        is_ServiceType_Beauty ,

        is_ServiceStatus_Arrived ,
        is_ServiceStatus_Appointment_Today ,
        is_ServiceStatus_Appointment_Future ,
        is_ServiceStatus_Appointment_TodayFuture ,

        is_ServiceType_BathBeauty ,
        is_ServiceType_BasicBathBeauty ,

        is_ShopStatus_NotArrived ,
        is_ShopStatus_Wait , 
        is_ShopStatus_Process ,
        is_ShopStatus_Done ,
        is_ShopStatus_Home ,
        is_ShopStatus_DoneHome ,

        is_NotComplete_Paid ,
        is_Extra_ServiceOrder
       }  from 'fp/state' ;


describe( "狀態測試" , () => { 

    beforeAll(() => {

        // 利用 JEST 設定 _ 假時間
        jest.useFakeTimers( 'modern' );
        jest.setSystemTime( new Date( 2023 , 6 , 20 ) ); // 須比實際少 1 個月

    });
    
    afterAll(() => {

        // 回復 _ 使用真實時間
        jest.useRealTimers();

    });


    describe( "一般編輯" , () => { 

        test( "判斷 ( 藉由 editType ) _ 服務單 ( 基礎、洗澡、美容單 ) 編輯為 _ 新增 : is_Service_Create()" , () => {

            // 在服務單 _ 新增下，editType 為 undefiend
    
            expect( is_Service_Create( undefined ) ).toBeTruthy() ; 
            expect( is_Service_Create( null ) ).toBeTruthy() ; 
            expect( is_Service_Create( "" ) ).toBeTruthy() ; 
        
        }) ;

        test( "判斷 ( 藉由 editType ) _ 服務單 ( 基礎、洗澡、美容單 ) 編輯為 _ 更新 : is_Service_Update()" , () => {
        
        
            // 在服務單 _ 新增下，editType 為 "編輯"

            expect( is_Service_Update( "編輯" ) ).toBeTruthy() ; 

            expect( is_Service_Update( "其他字串" ) ).not.toBeTruthy() ; 
            expect( is_Service_Update( "" ) ).not.toBeTruthy() ; 

        }) ;

        test( "判斷 ( 藉由 serviceData ) _ 服務單 ( 基礎、洗澡、美容單 ) 編輯為 _ 更新 : is_ServiceOrder_Update()" , () => {
        
             const data = { bath_id : 23 , shop_status : '到店等候中' } ;
        
             expect( is_ServiceOrder_Update( null ) ).not.toBeTruthy() ;
             expect( is_ServiceOrder_Update( undefined ) ).not.toBeTruthy() ;
             
             expect( is_ServiceOrder_Update( data ) ).toBeTruthy() ;

        }) ;

        test( "選到 '過去' 的 : 到店 ( 服務 ) 日期 ( 基礎、洗澡、美容單 ) : is_Past_ServiceDate()" , () => {
        
            // 目前設定 mock 設定的 _ 今日日期 ( new Date ) 為 : 2023-07-20

            expect( is_Past_ServiceDate( "2023-07-19" ) ).toBeTruthy();     // 昨天 -> 過去
            expect( is_Past_ServiceDate( "2023-07-20" ) ).not.toBeTruthy(); // 今天
            expect( is_Past_ServiceDate( "2023-07-21" ) ).not.toBeTruthy(); // 明天

        }) ;

        test( "選到 '未來' 的 : 到店 ( 服務 ) 日期 ( 基礎、洗澡、美容單 ) : is_Future_ServiceDate()" , () => {
        
            // 目前設定 mock 設定的 _ 今日日期 ( new Date ) 為 : 2023-07-20

            expect( is_Future_ServiceDate( "2023-07-19" ) ).not.toBeTruthy(); // 昨天  
            expect( is_Future_ServiceDate( "2023-07-20" ) ).not.toBeTruthy(); // 今天
            expect( is_Future_ServiceDate( "2023-07-21" ) ).toBeTruthy();     // 明天 -> 未來
        
        }) ;

        test( "為 _ 刪除狀態 : is_Delete()" , () => {

            expect( is_Delete( { is_delete : 1 } ) ).toBeTruthy() ;   
            expect( is_Delete( { is_delete : 0 } ) ).not.toBeTruthy() ;   

        }) ;

        test( "為 _ 異常狀態 : is_Error()" , () => {

            expect( is_Error( { is_error : 1 } ) ).toBeTruthy() ;   
            expect( is_Error( { is_error : 0 } ) ).not.toBeTruthy() ;   
        
        }) ;
    
        test( "服務單的 service_date 屬性值，為所輸入的 serviceDate 參數 : is_ServiceDate" , () => {
         
           const data = { service_date : "2023-07-12" }

           expect( is_ServiceDate( data , "2023-07-12" ) ).toBeTruthy() ;

        }) ;

    }) ; 
    
    describe( "為特定 _ 服務單類型( service_type ) : Ex. 基礎、洗澡、美容、安親、住宿" , () => { 

        test( "為 _ 基礎單 is_ServiceType_Basic()" , () => {
        
            expect( is_ServiceType_Basic( { service_type : "基礎" } ) ).toBeTruthy() ;
        
        }) ;
        
        test( "為 _ 洗澡單 is_ServiceType_Bath()" , () => {
        
            expect( is_ServiceType_Bath( { service_type : "洗澡" } ) ).toBeTruthy() ;
        
        }) ;

        test( "為 _ 美容單 is_ServiceType_Beauty()" , () => {
        
            expect( is_ServiceType_Beauty( { service_type : "美容" } ) ).toBeTruthy() ;
        
        }) ;

        test( "為 _ 洗澡單 + 美容單 is_ServiceType_BathBeauty()" , () => {
        
            expect( is_ServiceType_BathBeauty( { service_type : "洗澡" } ) ).toBeTruthy() ;
            expect( is_ServiceType_BathBeauty( { service_type : "美容" } ) ).toBeTruthy() ;
            expect( is_ServiceType_BathBeauty( { service_type : "基礎" } ) ).not.toBeTruthy() ;
        
        }) ;

        test( "為 _ 基礎單 + 洗澡單 + 美容單 is_ServiceType_BasicBathBeauty()" , () => {
        
            expect( is_ServiceType_BasicBathBeauty( { service_type : "洗澡" } ) ).toBeTruthy() ;
            expect( is_ServiceType_BasicBathBeauty( { service_type : "美容" } ) ).toBeTruthy() ;
            expect( is_ServiceType_BasicBathBeauty( { service_type : "基礎" } ) ).toBeTruthy() ;
            expect( is_ServiceType_BasicBathBeauty( { service_type : "安親" } ) ).not.toBeTruthy() ;
            expect( is_ServiceType_BasicBathBeauty( { service_type : "住宿" } ) ).not.toBeTruthy() ;
        
        }) ;

    }) ; 

    describe( "為特定 _ 服務狀態( service_status ) : Ex. 已到店、預約_今天、預約_未來" , () => { 

        test( "為 _ 已到店 is_ServiceStatus_Arrived()" , () => {
        
            expect( is_ServiceStatus_Arrived( { service_status : "已到店" } ) ).toBeTruthy() ;
        
        }) ;

        test( "為 _ 預約_今天 is_ServiceStatus_Appointment_Today()" , () => {
        
            expect( is_ServiceStatus_Appointment_Today( { service_status : "預約_今天" } ) ).toBeTruthy() ;
        
        }) ;

        test( "為 _ 預約_未來 is_ServiceStatus_Appointment_Future()" , () => {
        
            expect( is_ServiceStatus_Appointment_Future( { service_status : "預約_未來" } ) ).toBeTruthy() ;
        
        }) ;

        test( "為 _ 預約今天 + 預約_未來 is_ServiceStatus_Appointment_TodayFuture()" , () => {
        
            expect( is_ServiceStatus_Appointment_TodayFuture( { service_status : "預約_今天" } ) ).toBeTruthy() ;
            expect( is_ServiceStatus_Appointment_TodayFuture( { service_status : "預約_未來" } ) ).toBeTruthy() ;
            expect( is_ServiceStatus_Appointment_TodayFuture( { service_status : "已到店" } ) ).not.toBeTruthy() ;
        
        }) ;

    }) ; 
    
    describe( "為特定 _ 到店狀態( shop_status )" , () => { 

        // True
        const test_ShopStatus_True = ( status : string , fn : any ) => {
        
            const data = { shop_status : status } ;

            expect( fn( data ) ).toBeTruthy() ;

        } ;

        // False
        const test_ShopStatus_False = ( status : string , fn : any ) => {
        
            const data = { shop_status : status } ;

            expect( fn( data ) ).not.toBeTruthy() ;

        } ;

        describe( "尚未到店 is_ShopStatus_NotArrived()" , () => { 
            
            test( "shop_status :'尚未到店' --> 回傳 true" , () => {

                test_ShopStatus_True( '尚未到店' , is_ShopStatus_NotArrived ) ;
            
            }) ;

            test( "shop_status : '洗完等候中' --> 回傳 false" , () => {

                test_ShopStatus_False( '洗完等候中' , is_ShopStatus_NotArrived ) ;
            
            }) ;
        
        }) ; 

        describe( "到店等候中 is_ShopStatus_Wait()" , () => { 

            test( "shop_status : '到店等候中' --> 回傳 true" , () => {

                test_ShopStatus_True( '到店等候中' , is_ShopStatus_Wait ) ;

            }) ;

            test( "shop_status : '洗完等候中' --> 回傳 false" , () => {

                test_ShopStatus_False( '洗完等候中' , is_ShopStatus_Wait ) ;
            
            }) ;
        
        
        }) ; 

        describe( "到店美容中 is_ShopStatus_Process()" , () => { 

            test( "shop_status : '到店美容中' --> 回傳 true" , () => {

                test_ShopStatus_True( '到店美容中' , is_ShopStatus_Process ) ;

            }) ;

            test( "shop_status : '到店等候中' --> 回傳 false" , () => {

                test_ShopStatus_False( '到店等候中' , is_ShopStatus_Process ) ;

            }) ;
        
        }) ; 

        describe( "洗完等候中 is_ShopStatus_Done()" , () => { 

            test( "shop_status : '洗完等候中' --> 回傳 true" , () => {

                test_ShopStatus_True( '洗完等候中' , is_ShopStatus_Done ) ;

            }) ;

            test( "shop_status : '到店等候中' --> 回傳 false" , () => {

                test_ShopStatus_False( '到店等候中' , is_ShopStatus_Done ) ;

            }) ;
        
        }) ; 
        
        describe( "已回家( 房 ) is_ShopStatus_Home()" , () => { 

            test( "shop_status :'已回家( 房 )' --> 回傳 true" , () => {

                test_ShopStatus_True( '已回家( 房 )' , is_ShopStatus_Home ) ;

            }) ;

            test( "shop_status : '洗完等候中' --> 回傳 false" , () => {
            
                test_ShopStatus_False( '洗完等候中' , is_ShopStatus_Home ) ;
            
            }) ;

        }) ; 

        describe( "洗完等候中 + 已回家( 房 ) is_ShopStatus_DoneHome()" , () => { 
        
            test( "shop_status : '洗完等候中' 或 '已回家( 房 )' --> 回傳 true" , () => {
                
                test_ShopStatus_True( '洗完等候中'   , is_ShopStatus_DoneHome ) ;
                test_ShopStatus_True( '已回家( 房 )' , is_ShopStatus_DoneHome ) ;
                
            }) ;

            test( "shop_status : '到店等候中' --> 回傳 false" , () => {
            
                test_ShopStatus_False( '到店等候中' , is_ShopStatus_DoneHome ) ;
            
            }) ;
        
        }) ; 

    }) ; 

    describe( "服務單 _ 付款 ( payment ) 相關" , () => {
        
        describe( "is_NotComplete_Paid : 尚未 _ 完成付款" , () => { 
        
              const data_1 = { amount_payable : 400 ,  amount_paid : 0 } ;    // 未付款  -> 尚未 _ 完成付款
              const data_2 = { amount_payable : 400 ,  amount_paid : 200 } ;  // 部分付款 -> 尚未 _ 完成付款 
              const data_3 = { amount_payable : 400 ,  amount_paid : 400 } ;  // 完成付款

              expect( is_NotComplete_Paid( data_1 ) ).toBeTruthy() ;
              expect( is_NotComplete_Paid( data_2 ) ).toBeTruthy() ;
              expect( is_NotComplete_Paid( data_3 ) ).not.toBeTruthy() ;
        
        }) ; 
        
        describe( "is_Extra_ServiceOrder : 為 _ 加價單" , () => { 

            test( "為 _ 加價單" , () => {
            
                expect( is_Extra_ServiceOrder( { extra_fee_id : 4 } ) ).toBeTruthy();
            
            }) ;

            test( "不為 _ 加價單( 一般洗澡、美容單 )" , () => {
            
                expect( is_Extra_ServiceOrder( { bath_id : 4 } ) ).not.toBeTruthy();
                expect( is_Extra_ServiceOrder( { beauty_id : 3 } ) ).not.toBeTruthy();
            
            }) ;

        
        }) ; 
        
    }) ; 


}) ; 
