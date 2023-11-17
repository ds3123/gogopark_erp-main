/* eslint-disable jest/valid-title */
import { 
         get_Receivable_Services_Data ,
         get_Receivable_LodgeCare_Data , 
         get_Amount_Paid_Total ,
         get_Pickup_Fee_Total ,
         get_Lodge_BathFee_Total ,
         get_Lodge_BeautyFee_Total ,
         get_Other_Total
        } from "fp/management/finance/service/get_Finance_Services";


describe( "取得 _ 洗澡美容 : 應收款 ( 財務管理 ) " , () => { 

    const data = [
                    { service_type : '洗澡' , payment_method : '現金' , is_delete : 1 } ,
                    { service_type : '安親' , payment_method : '現金' , is_delete : 0 } ,
                    { service_type : '基礎' , payment_method : '現金' , is_delete : 0 } ,
                    { service_type : '住宿' , payment_method : '現金' , is_delete : 1 } ,
                    { service_type : '住宿' , payment_method : '現金' , is_delete : 0 } ,
                    { service_type : '美容' , payment_method : '現金' , is_delete : 0 } ,
                    { service_type : '洗澡' , payment_method : '現金' , is_delete : 0 } ,
                    { service_type : '基礎' , payment_method : '現金' , is_delete : 1 } ,
                    { service_type : '美容' , payment_method : '現金' , is_delete : 0 } ,
                ] ;

    test( "get_Receivable_Services_Data() 取得 _ 洗澡美容 : 應收款 ( 財務管理 )  " , () => {
    
        expect( get_Receivable_Services_Data( data ) ).toEqual([

            { service_type : '基礎' , payment_method : '現金' , is_delete : 0 } ,
            { service_type : '美容' , payment_method : '現金' , is_delete : 0 } ,
            { service_type : '洗澡' , payment_method : '現金' , is_delete : 0 } ,
            { service_type : '美容' , payment_method : '現金' , is_delete : 0 } ,

        ]) ;

    
    }) ;

}) ; 


describe( "取得 _ 住宿安親 : 應收款 ( 財務管理 )" , () => { 

    const data = [
                   { service_status : '當日住宿' , payment_method : '現金' , is_delete : 1 } ,
                   { service_status : '當日安親' , payment_method : '現金' , is_delete : 0 } ,
                   { service_status : '當日住宿' , payment_method : '現金' , is_delete : 0 } ,
                   { service_status : '預約安親' , payment_method : '現金' , is_delete : 0 } ,
                   { service_status : ''        , payment_method : '現金' , is_delete : 0 } ,
                   { service_status : '預約住宿' , payment_method : '現金' , is_delete : 1 } ,
                   { service_status : '預約住宿' , payment_method : '現金' , is_delete : 0 } ,
                 ] ;

    test( "get_Receivable_LodgeCare_Data() : 取得 _ 住宿安親 : 應收款 ( 財務管理 )" , () => {
    
        expect( get_Receivable_LodgeCare_Data( data ) ).toEqual([

            { service_status : '當日安親' , payment_method : '現金' , is_delete : 0 } ,
            { service_status : '當日住宿' , payment_method : '現金' , is_delete : 0 } ,
            { service_status : '預約安親' , payment_method : '現金' , is_delete : 0 } ,
            { service_status : '預約住宿' , payment_method : '現金' , is_delete : 0 } ,

        ]) ;

    }) ;


}) ; 


describe( "計算 _ 小計金額（ 加總 ）" , () => { 

    test( "get_Amount_Paid_Total() : 加總：應付金額 ( 屬性 : amount_paid )" , () => {

        const data = [
                       { amount_paid : 100  } ,
                       { amount_paid : 400  } ,
                       { amount_paid : 150  } ,
                       { amount_paid : 200  } ,
                     ] ;

        expect( get_Amount_Paid_Total( data ) ).toBe( 850 ) ;

    }) ;


    test( "get_Pickup_Fee_Total() : 加總：接送費 ( 屬性 : pickup_fee ) " , () => {
    
        const data = [
                        { pickup_fee : 100  } ,
                        { pickup_fee : 200  } ,
                        { pickup_fee : 550  } ,
                        {  } ,
                        { pickup_fee : 200  } ,
                     ] ;

        expect( get_Pickup_Fee_Total( data ) ).toBe( 1050 ) ;
    
    }) ;
    
    test( "get_Lodge_BathFee_Total() : 加總：住宿洗澡費 ( 屬性 : lodge_bath_price )" , () => {
    
         const data = [ 
                         { lodge_bath_price : 300 } ,
                         { } ,
                         { lodge_beauty_price : 400 } ,
                         { } ,
                         { lodge_bath_price : 500 } ,
                      ] ;

         expect( get_Lodge_BathFee_Total( data ) ).toBe( 800 ) ;

    }) ;

    test( "get_Lodge_BeautyFee_Total() : 加總：住宿美容費 ( 屬性 : lodge_beauty_price )" , () => {
    
         const data = [ 
                        { lodge_bath_price   : 300 } ,
                        { } ,
                        { lodge_beauty_price : 400 } ,
                        { } ,
                        { lodge_bath_price   : 500 } ,
                        { lodge_beauty_price : 200 } ,
                       ] ;

        expect( get_Lodge_BeautyFee_Total( data ) ).toBe( 600 ) ;

    
    }) ;

    test( "get_Other_Total() : 取得 _ 加總：其他（ 收入 / 支出 ）" , () => {
    
        const data = [
                       { amount : 400 } ,
                       { amount : 100 } ,
                       { amount : 300 } ,
                       { amount : 500 } 
                      ] ;

        expect( get_Other_Total( data ) ).toBe( 1300 ) ;
      
     
    }) ;

}) ; 














