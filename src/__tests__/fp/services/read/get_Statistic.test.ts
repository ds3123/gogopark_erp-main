/* eslint-disable jest/valid-title */


/*

    # 各類服務單，統計數字
    
*/

import { 

          get_ServiceOrder_Basic ,
          get_ServiceOrder_Bath ,

          get_ServiceOrder_Beauty ,
          get_ServiceOrder_BathBeauty ,
          get_ServiceOrder_BasicBathBeauty ,

          get_ShopStatus_Wait ,
          get_ShopStatus_Done ,
          get_ShopStatus_Home ,
          get_ShopStatus_DoneHome ,

          get_ShopStatus_ServiceOrders ,
          get_ShopStatus_ServiceOrderNum_Basic ,
          get_ShopStatus_ServiceOrderNum_Bath ,
          get_ShopStatus_ServiceOrderNum_Beauty ,

          get_ServiceStatus_Arrived ,
          get_ServiceStatus_Appointment_Today ,
          get_ServiceStatus_Appointment_Future ,
          get_ServiceStatus_Appointment_TodayFuture ,

          get_Completed_BasicBathBeauty_Sum ,
          get_Completed_Persentage ,
          get_Completed_BasicBathBeauty_Persentage ,

          get_ServiceOrder_CompletedNum_Basic ,
          get_ServiceOrder_CompletedNum_Bath ,
          get_ServiceOrder_CompletedNum_Beauty ,

          get_ServiceOrder_AppointmentNum_Basic ,
          get_ServiceOrder_AppointmentNum_Bath ,
          get_ServiceOrder_AppointmentNum_Beauty ,
          get_ServiceOrder_AppointmentNum_Total ,

          get_ServiceOrder_OnSiteNum_Basic ,
          get_ServiceOrder_OnSiteNum_Bath ,
          get_ServiceOrder_OnSiteNum_Beauty ,
          get_ServiceOrder_OnSiteNum_Total ,

       }  from 'fp/services/read/get_Statistic' ;



/*

   NOTE : 
     1. 已完成   -> shop_status    : 洗完等候中 + 已回家( 房 ) 
     2. 預約狀態 -> service_status : 預約今天 + 預約未來
     3. 現場狀態 -> service_status : 已到店 ( WARN ! : 若以 shop_status 的 "到店等候中" ， 由於到店處理狀態會變化，因此加總數會 _ 僅計算 : "到店等候中" )

*/


describe( "篩選 ( filter ) 測試" , () => { 

    describe( "測試 _ 到店狀態 ( shop_status )" , () => { 

        const data = [
                        { shop_status : '到店美容中'    } ,
                        { shop_status : '已回家( 房 )'  } ,
                        { shop_status : '到店等候中'    } ,
                        { shop_status : '洗完等候中'    } ,
                        { shop_status : '尚未到店'      } ,
                        { shop_status : '已回家( 房 )'  } ,
                        { shop_status : '到店等候中'    } ,
                        { shop_status : '已回家( 房 )'  } ,
                    ] ;

        test( "到店等候中 : get_ShopStatus_Wait()" , () => {

            const result  = [ 
                              { shop_status : '到店等候中' } , 
                              { shop_status : '到店等候中' } , 
                            ] ;    
       
            expect( get_ShopStatus_Wait( data ) ).toEqual( result ) ; 
            expect( get_ShopStatus_Wait( [ {} ] ) ).toEqual( [] ) ; // 沒有 -> 空陣列
        
        }) ;            

        test( "洗完等候中 : get_ShopStatus_Done()" , () => {

            const result  = [ 
                              { shop_status : '洗完等候中' } , 
                            ] ;    
            
            expect( get_ShopStatus_Done( data ) ).toEqual( result ) ; 
            expect( get_ShopStatus_Done( [ {} ] ) ).toEqual( [] ) ;   // 沒有 -> 空陣列
        
        
        }) ;

        test( "已回家( 房 ) : get_ShopStatus_Home()" , () => {
        
            const result  = [ 
                              { shop_status : '已回家( 房 )' } , 
                              { shop_status : '已回家( 房 )' } ,
                              { shop_status : '已回家( 房 )' } ,
                            ] ;    
                            
            expect( get_ShopStatus_Home( data ) ).toEqual( result ) ; 
            expect( get_ShopStatus_Home( [ {} ] ) ).toEqual( [] ) ;   // 沒有 -> 空陣列

        }) ;

        test( "洗完等候中 + 已回家( 房 ) : get_ShopStatus_DoneGoHome()" , () => {
        
            const result  = [ 
                              { shop_status : '已回家( 房 )' } , 
                              { shop_status : '洗完等候中' } , 
                              { shop_status : '已回家( 房 )' } ,
                              { shop_status : '已回家( 房 )' } ,
                            ] ;    

            expect( get_ShopStatus_DoneHome( data ) ).toEqual( result ) ;                 
        
        }) ;

        test( "取得 _ 特定到店狀態下，所有服務單" , () => {
        
            expect( get_ShopStatus_ServiceOrders( '到店等候中' )( data ) ).toEqual([
                                                                                   { shop_status : '到店等候中' } ,
                                                                                    { shop_status : '到店等候中' } 
                                                                                  ]) ;

            expect( get_ShopStatus_ServiceOrders( '已回家( 房 )' )( data ) ).toEqual( [
                                                                                      { shop_status : '已回家( 房 )' } ,
                                                                                      { shop_status : '已回家( 房 )' } ,
                                                                                      { shop_status : '已回家( 房 )' } ,
                                                                                    ]) ;

        
        }) ;


        describe( "取得 _ 特定到店狀態下，各類服務單數量" , () => { 


            const data = [
                             { shop_status : "到店等候中" , service_type : '基礎' } ,
                             { shop_status : "洗完等候中" , service_type : '洗澡' } ,
                             { shop_status : "已回家( 房 )" , service_type : '美容' } ,
                             { shop_status : "到店等候中" , service_type : '洗澡' } ,
                             { shop_status : "已回家( 房 )" , service_type : '基礎' } ,
                             { shop_status : "到店等候中" , service_type : '美容' } ,
                             { shop_status : "洗完等候中" , service_type : '洗澡' } ,
                             { shop_status : "到店等候中" , service_type : '基礎' } ,
                             { shop_status : "洗完等候中" , service_type : '美容' } ,
                            ]
            

            test( "基礎單 : 數量 get_ShopStatus_ServiceOrderNum_Basic()" , () => {

                 expect( get_ShopStatus_ServiceOrderNum_Basic( data , '到店等候中' ) ).toBe( 2 ) ;
                 expect( get_ShopStatus_ServiceOrderNum_Basic( data , '已回家( 房 )' ) ).toBe( 1 ) ;
            
            }) ;

            test( "洗澡單 : 數量 get_ShopStatus_ServiceOrderNum_Bath()" , () => {

                 expect( get_ShopStatus_ServiceOrderNum_Bath( data , '到店等候中' ) ).toBe( 1 ) ;
                 expect( get_ShopStatus_ServiceOrderNum_Bath( data , '洗完等候中' ) ).toBe( 2 ) ;
            
            
            }) ;

            test( "美容單 : 數量 get_ShopStatus_ServiceOrderNum_Beauty()" , () => {
            
            
                 expect( get_ShopStatus_ServiceOrderNum_Beauty( data , '到店等候中' ) ).toBe( 1 ) ;
                 expect( get_ShopStatus_ServiceOrderNum_Beauty( data , '洗完等候中' ) ).toBe( 1 ) ;
                 expect( get_ShopStatus_ServiceOrderNum_Beauty( data , '已回家( 房 )' ) ).toBe( 1 ) ;


            }) ;
        
        
        }) ; 
        

    }) ; 

    describe( "測試 _ 服務類型 ( service_type )" , () => { 

        const data = [ 
                        { service_type : "洗澡" } ,
                        { service_type : "住宿" } ,
                        { service_type : "洗澡" } ,
                        { service_type : "安親" } ,
                        { service_type : "基礎" } ,
                        { service_type : "住宿" } ,
                        { service_type : "美容" } ,
                        { service_type : "洗澡" } ,
                        { service_type : "基礎" } ,
                        { service_type : "洗澡" } ,
                      ] ; 

        test( "基礎單 : get_ServiceOrder_Basic()" , () => {

            const result = [
                            { service_type : "基礎" } ,
                            { service_type : "基礎" } ,
                        ] ;

            expect( get_ServiceOrder_Basic( data ) ).toEqual( result ) ;
        
        
        }) ;

        test( "洗澡單 : get_ServiceOrder_Bath()" , () => {
        
            const result = [
                            { service_type : "洗澡" } ,
                            { service_type : "洗澡" } ,
                            { service_type : "洗澡" } ,
                            { service_type : "洗澡" } ,
                        ] ;

            expect( get_ServiceOrder_Bath( data ) ).toEqual( result ) ;
        
        }) ;

        test( "美容單 : get_ServiceOrder_Beauty()" , () => {

            const result = [ 
                            { service_type : "美容" } ,
                        ] ;

            expect( get_ServiceOrder_Beauty( data ) ).toEqual( result ) ;
        
        
        }) ;

        test( "洗澡單＋美容單 : get_ServiceOrder_BathBeauty()" , () => {

            const result = [ 
                            { service_type : "洗澡" } ,
                            { service_type : "洗澡" } ,
                            { service_type : "美容" } ,
                            { service_type : "洗澡" } ,
                            { service_type : "洗澡" } ,
                        ] ;

            expect( get_ServiceOrder_BathBeauty( data ) ).toEqual( result ) ;
        
        }) ;

        test( "基礎單 + 洗澡單＋美容單 : get_ServiceOrder_BasicBathBeauty()" , () => {

            const result = [ 
                            { service_type : "洗澡" } ,
                            { service_type : "洗澡" } ,
                            { service_type : "基礎" } ,
                            { service_type : "美容" } ,
                            { service_type : "洗澡" } ,
                            { service_type : "基礎" } ,
                            { service_type : "洗澡" } ,
                            ] ;

            expect( get_ServiceOrder_BasicBathBeauty( data ) ).toEqual( result ) ;
        
        }) ;

    }) ; 
    
    describe( "測試 _ 服務狀態 ( service_status )" , () => { 
    
         const data = [
                        { service_status : '預約_未來' } ,
                        { service_status : '預約_今天' } ,
                        { service_status : '已到店' } ,
                        { service_status : '預約_未來' } ,
                        { service_status : '已到店' } ,
                        { service_status : '預約_未來' } ,
                        { service_status : '預約_今天' } ,
                      ] ;

         test( "已到店 : get_ServiceStatus_Arrived" , () => {

            const result = [
                             { service_status : '已到店' } ,
                             { service_status : '已到店' } 
                           ] ;

            expect( get_ServiceStatus_Arrived( data ) ).toEqual( result ) ; 
         
         }) ;

         test( "預約今天 : get_ServiceStatus_Appointment_Today" , () => {

             const result = [
                              { service_status : '預約_今天' } ,
                              { service_status : '預約_今天' } 
                            ] ;
         
             expect( get_ServiceStatus_Appointment_Today( data ) ).toEqual( result ) ; 
         
         }) ;

         test( "預約未來 : get_ServiceStatus_Appointment_Feature" , () => {

            const result = [
                             { service_status : '預約_未來' } ,
                             { service_status : '預約_未來' } ,
                             { service_status : '預約_未來' } ,
                           ] ;
        
            expect( get_ServiceStatus_Appointment_Future( data ) ).toEqual( result ) ; 
        
         }) ;

         test( "預約今天 + 預約未來 : get_ServiceStatus_Appointment_TodayFuture" , () => {
         
            const result = [
                             { service_status : '預約_未來' } ,
                             { service_status : '預約_今天' } ,
                             { service_status : '預約_未來' } ,
                             { service_status : '預約_未來' } ,
                             { service_status : '預約_今天' } ,
                           ] ;

            expect( get_ServiceStatus_Appointment_TodayFuture( data ) ).toEqual( result ) ; 
         
         }) ;
    
    }) ; 
    
}) ; 


describe( "計算測試" , () => { 

    const data = [ 
                    { service_type : "基礎" , shop_status : "尚未到店"     , service_status : "預約_未來" } ,   
                    { service_type : "安親" , shop_status : "已回家( 房 )" , service_status : ""        } , 
                    { service_type : "住宿" , shop_status : "洗完等候中"   , service_status : ""        } , 

                    { service_type : "洗澡" , shop_status : "尚未到店"     , service_status : "預約_今天" } ,   
                    { service_type : "基礎" , shop_status : "洗完等候中"   , service_status : "已到店"    } ,   
                    { service_type : "洗澡" , shop_status : "尚未到店"     , service_status : "預約_未來" } ,   
                    { service_type : "美容" , shop_status : "已回家( 房 )" , service_status : "已到店" } ,   
                    { service_type : "美容" , shop_status : "到店等候中"    , service_status : "已到店"} ,   
                    { service_type : "洗澡" , shop_status : "尚未到店"     , service_status : "預約_未來"} ,   
                    { service_type : "基礎" , shop_status : "洗完等候中"   , service_status : "已到店"} ,   
                    { service_type : "美容" , shop_status : "到店等候中"   , service_status : "已到店"} ,   
                    { service_type : "洗澡" , shop_status : "已回家( 房 )" , service_status : "已到店" } ,   
                    { service_type : "美容" , shop_status : "洗完等候中"    , service_status : "已到店"} ,   
                  ] ;

    describe( "完成數、完成率" , () => { 

        test( "get_Completed_BasicBathBeauty_Sum : 取得 _ 已完成 : 基礎單 + 洗澡單 + 美容單 -> 加總數" , () => {

            expect( get_Completed_BasicBathBeauty_Sum( data ) ).toBe( 5 ) ;

        }) ;

        test( "get_Completed_Persentage : 取得 _ 已完成 -> 完成率 " , () => {

            expect( get_Completed_Persentage( 3 , 7 ) ).toBe( 43 ) ;
            expect( get_Completed_Persentage( 2 , 5 ) ).toBe( 40 ) ;
    
        }) ;

        test( "get_Completed_BasicBathBeauty_Persentage : 取得 _ 已完成 : 基礎單 + 洗澡單 + 美容單 -> 完成率" , () => {
    
               const data_Zero = [] as any[] ;

               expect( get_Completed_BasicBathBeauty_Persentage( data ) ).toBe( 38 ) ;
               expect( get_Completed_BasicBathBeauty_Persentage( data_Zero ) ).toBe( 0 ) ;  // 當沒有資料時，希望顯示 0
 
        }) ;

        test( "get_ServiceOrder_CompletedNum_Basic : 取得 _ 已完成 '基礎單' : 數量" , () => {
        
            expect( get_ServiceOrder_CompletedNum_Basic( data ) ).toBe( 2 ) ;
    
        }) ;

        test( "get_ServiceOrder_CompletedNum_Bath : 取得 _ 已完成 '洗澡單' : 數量" , () => {
    
            expect( get_ServiceOrder_CompletedNum_Bath( data ) ).toBe( 1 ) ;
    
        }) ;

        test( "get_ServiceOrder_CompletedNum_Beauty : 取得 _ 已完成 '美容單' : 數量" , () => {
    
            expect( get_ServiceOrder_CompletedNum_Beauty( data ) ).toBe( 2 ) ;
    
        }) ;
    
    }) ; 

    describe( "今日_預約" , () => { 

        test( "get_ServiceOrder_AppointmentNum_Basic : 取得 _ 基礎單中，為 _ 預約狀態 : 數量" , () => {

            expect( get_ServiceOrder_AppointmentNum_Basic( data ) ).toEqual( 1 ) ;                
        
        }) ;

        test( "get_ServiceOrder_AppointmentNum_Bath : 取得 _ 洗澡單中，為 _ 預約狀態 : 數量" , () => {
        
            expect( get_ServiceOrder_AppointmentNum_Bath( data ) ).toEqual( 3 ) ;   
        
        }) ;

        test( "get_ServiceOrder_AppointmentNum_Beauty : 取得 _ 美容單中，為 _ 預約狀態 : 數量" , () => {
        
            expect( get_ServiceOrder_AppointmentNum_Beauty( data ) ).toEqual( 0 ) ;  
        
        }) ;

        test( "get_ServiceOrder_AppointmentNum_Total : 取得 _ 預約 : '基礎單' + '洗澡單' + '美容單' _ 總數" , () => {
        
            expect( get_ServiceOrder_AppointmentNum_Total( data ) ).toEqual( 4 ) ;
        
        }) ;

    }) ; 

    describe( "今日_現場" , () => { 

        const siteData = [
                            { service_type : "基礎" , service_status : "已到店" } ,
                            { service_type : "洗澡" , service_status : "已到店"  } ,
                            { service_type : "洗澡" , service_status : "已到店"  } ,
                            { service_type : "基礎" , service_status : "已到店"  } ,
                            { service_type : "美容" , service_status : "已到店"  } ,
                            { service_type : "基礎" , service_status : "已到店"  } ,
                          ]

        test( "基礎單中，為 _ 現場新增" , () => {
        
            expect( get_ServiceOrder_OnSiteNum_Basic( siteData ) ).toEqual( 3 ) ; 
        
        }) ;

        test( "洗澡單中，為 _ 現場新增" , () => {
        
            expect( get_ServiceOrder_OnSiteNum_Bath( siteData ) ).toEqual( 2 ) ; 
        
        }) ;

        test( "美容單中，為 _ 現場新增" , () => {

            expect( get_ServiceOrder_OnSiteNum_Beauty( siteData ) ).toEqual( 1 ) ;
        
        }) ;

        test( "'基礎單' + '洗澡單' + '美容單' _ 現場新增 : 總數" , () => {
            
            expect( get_ServiceOrder_OnSiteNum_Total( siteData ) ).toEqual( 6 ) ;

        }) ;
    
    }) ; 

}) ; 





















       









