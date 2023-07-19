/* eslint-disable jest/valid-title */
import {
          get_ServiceOrder_Error_ServiceType ,
          get_ServiceOrder_Error_Note ,
          get_ServiceOrder_Error_PetInfo ,
          get_ServiceOrder_Error_User
       } from "fp/services/read/get_Error" ;

/*
   
     # 服務單 : 一般基礎單、洗澡單、美容單
     # 加價單 : 建立服務單之後，追加的單據

*/       


describe( "取得 _ 服務異常表 : 欄位值" , () => { 

    describe( "get_ServiceOrder_Error_ServiceType() : 服務類別" , () => { 
    
        test( "一般服務單" , () => {

            const data = { bath_id : 44 , service_type : '洗澡' , q_code : '03' } ;

            expect( get_ServiceOrder_Error_ServiceType( data ) ).toBe( "洗澡 Q03 ( 44 )" ) ; 
        
        }) ;

        test( "加價單" , () => {

            const data = { extra_fee_id : 6 , service_type : '基礎' , basic : { basic_id : 4 , q_code : "07" }   } ;

            expect( get_ServiceOrder_Error_ServiceType( data ) ).toBe( "基礎 Q07 ( 4 )" ) ; 
        
        
        }) ;

    }) ; 

    describe( "get_ServiceOrder_Error_Note() : 異常說明" , () => {

        test( "為 < 銷單 > ( is_delete === 1 ) 時，回傳 _ '銷 單'" , () => {
        
            expect( get_ServiceOrder_Error_Note( { is_delete : 1 } ) ).toBe( "銷 單" ) ;
        
        }) ;

        test( "為 < 轉異常 > ( is_error === 1 ) 時，回傳 _ 異常原因" , () => {
        
            expect( get_ServiceOrder_Error_Note( { is_error : 1 , error_cause : "狗很兇" } ) ).toBe( "狗很兇" ) ;
        
        }) ;

        test( "為 < 尚未完全付款 > : 尚未付款 ( 實付金額為 0 )，回傳 _ '尚未付款'" , () => {
        
            const data = { amount_payable : 400 , amount_paid : 0 } ;

            expect( get_ServiceOrder_Error_Note( data ) ).toBe( '尚未付款' ) ;

        }) ;

        test( "為 < 尚未完全付款 > : 付部分款 ( 實付金額為部分應付金額 )，回傳 _ '僅付部分金額'" , () => {
        
            const data = { amount_payable : 400 , amount_paid : 200 } ;

            expect( get_ServiceOrder_Error_Note( data ) ).toBe( '僅付部分金額' ) ;
    
        }) ;

        test( "為 < 刪除 _ 加價單 > ，回傳 _ '刪除 _ 加價單 ( id : 3 )'" , () => {
        
            const data = { extra_fee_id : 3   } ;

            expect( get_ServiceOrder_Error_Note( data ) ).toBe( '刪除 _ 加價單 ( id : 3 )' ) ;

        }) ;

    }) ; 

    describe( "get_ServiceOrder_Error_PetInfo() : 寵物資訊" , () => { 

        test( "一般服務單" , () => {
        
            const data = { pet : { name : '小胖' , species : '柴犬' } } ;

            expect( get_ServiceOrder_Error_PetInfo( data ) ).toBe( "小胖 ( 柴犬 )" )
        
        }) ;

        test( "加價單" , () => {

            const data = { extra_fee_id : 4 , pet_name : "富貴" , pet_species : "狼狗" } ;

            expect( get_ServiceOrder_Error_PetInfo( data ) ).toBe( "富貴 ( 狼狗 )" )
         
        }) ;

    }) ; 
    
    describe( "get_ServiceOrder_Error_User() : 經手人" , () => { 

        test( "銷單，回傳 _ delete_submitter" , () => {

            const data = { is_delete : 1 , is_error : 0  , admin_user : "王思茹" , delete_submitter : "王思茹" , error_submitter : null } ;
        
            expect( get_ServiceOrder_Error_User( data ) ).toBe( "王思茹" ) ;

        }) ;

        test( "轉異常，回傳 _ error_submitter" , () => {

            const data = {  is_delete : 0 , is_error : 1  , admin_user : "周宇茜" , delete_submitter : null , error_submitter : "周宇茜" } ;
        
            expect( get_ServiceOrder_Error_User( data ) ).toBe( "周宇茜" ) ;
        
        }) ;

        test( "尚未完全付款，回傳 _  admin_user" , () => {

            const data = { amount_payable : 600 , amount_paid : 400 , shop_status : "已回家( 房 )" , is_delete : 0 , is_error : 0 , admin_user : "金郁佳" , delete_submitter : null , error_submitter : null } ;
        
            expect( get_ServiceOrder_Error_User( data ) ).toBe( "金郁佳" ) ;
        
        }) ;

        test( "刪 _ 加價單，回傳 _ delete_submitter" , () => {
        
            const data = {  extra_fee_id : 7 , is_delete : 1 , admin_user : "王思茹" , delete_submitter : "王思茹" } ;

            expect( get_ServiceOrder_Error_User( data ) ).toBe( "王思茹" ) ;
        
        
        }) ;

        test( "預設情況，回傳 _ 測試員" , () => {

            const data = {  } ;

            expect( get_ServiceOrder_Error_User( data ) ).toBe( "測試員" ) ;
        
        }) ;

    }) ; 
    
}) ; 











