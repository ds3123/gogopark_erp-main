/* eslint-disable jest/valid-title */

import { 
        is_Delete ,

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

        is_ServiceOrder_NotComplete_Paid

       }  from 'fp/state' ;


describe( "狀態測試" , () => { 


    describe( "一般編輯" , () => { 
    
        test( "為 _ 刪除狀態 : is_Delete()" , () => {

            expect( is_Delete( { is_delete : 1 } ) ).toBeTruthy() ;   
            expect( is_Delete( { is_delete : 0 } ) ).not.toBeTruthy() ;   

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
        
        describe( "is_ServiceOrder_NotComplete_Paid : 尚未 _ 完成付款" , () => { 
        
              const data_1 = { amount_payable : 400 ,  amount_paid : 0 } ;    // 未付款  -> 尚未 _ 完成付款
              const data_2 = { amount_payable : 400 ,  amount_paid : 200 } ;  // 部分付款 -> 尚未 _ 完成付款 
              const data_3 = { amount_payable : 400 ,  amount_paid : 400 } ;  // 完成付款

              expect( is_ServiceOrder_NotComplete_Paid( data_1 ) ).toBeTruthy() ;
              expect( is_ServiceOrder_NotComplete_Paid( data_2 ) ).toBeTruthy() ;
              expect( is_ServiceOrder_NotComplete_Paid( data_3 ) ).not.toBeTruthy() ;
        
        }) ; 
        
    
    }) ; 
    


}) ; 
