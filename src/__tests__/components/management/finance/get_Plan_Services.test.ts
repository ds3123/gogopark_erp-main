/* eslint-disable jest/valid-title */
import { 
         get_Services_Paid_By_Plan ,
         get_Services_Paid_By_Cash , 
         get_Finance_Plan_Services ,
         get_Pet_Plan_Adjust_Price


       } from "fp/management/finance/plan/get_Plan_Services";


describe( "取得 _ 方案資料" , () => { 

    const data = [
                    { service_type : '洗澡' , payment_method : '現金' , is_delete : 1 } ,
                    { service_type : '洗澡' , payment_method : '方案' , is_delete : 0 } ,
                    { service_type : '基礎' , payment_method : '現金' , is_delete : 0 } ,
                    { service_type : '美容' , payment_method : '方案' , is_delete : 1 } ,
                    { service_type : '洗澡' , payment_method : '方案' , is_delete : 0 } ,
                    { service_type : '美容' , payment_method : '現金' , is_delete : 0 } ,
                 ] ;

    describe( "依 _ 付款方式，取得相關服務單" , () => { 

        test( "get_Services_Paid_By_Plan() : 取得 _ 付款方式為「方案」的 洗澡單 或 美容單" , () => {
            
            expect( get_Services_Paid_By_Plan( data ) ).toEqual(

                    [
                        { service_type : '洗澡' , payment_method : '方案' , is_delete : 0 } , 
                        { service_type : '美容' , payment_method : '方案' , is_delete : 1 } ,
                        { service_type : '洗澡' , payment_method : '方案' , is_delete : 0 } ,
                    ]

            ) ;


        }) ;

        test( "get_Services_Paid_By_Cash() : 取得 _ 付款方式為「現金」的 洗澡單 或 美容單" , () => {

            expect( get_Services_Paid_By_Cash( data ) ).toEqual(

                    [
                      { service_type : '洗澡' , payment_method : '現金' , is_delete : 1 } ,
                      { service_type : '美容' , payment_method : '現金' , is_delete : 0 } ,
                    ]

            ) ;
        
        }) ;

    }) ; 

    describe( "取得 _ 財務管理下，各類型資料 ( 排除 _ 銷單 )" , () => { 
    
        test( "get_Finance_Plan_Services() : 洗澡美容 : 扣預收款 ( 財務管理 )" , () => {

            expect( get_Finance_Plan_Services( data ) ).toEqual([

                { service_type : '洗澡' , payment_method : '方案' , is_delete : 0 } ,
                { service_type : '洗澡' , payment_method : '方案' , is_delete : 0 } ,

            ]) ;
        
        }) ;
    
    }) ; 

}) ; 


test( "get_Pet_Plan_Adjust_Price() : 取得 _ 寵物個別調整後：包月洗澡 或 包月美容價格" , () => {

    const petData_1 = { month_bath_price : 3100 , month_beauty_price : 3400 } ;
    const petData_2 = { month_bath_price : null , month_beauty_price : null } ;


    expect( get_Pet_Plan_Adjust_Price( petData_1 , '包月洗澡' ) ).toBe( 3100 ) ; 
    expect( get_Pet_Plan_Adjust_Price( petData_1 , '包月美容' ) ).toBe( 3400 ) ; 
   
    expect( get_Pet_Plan_Adjust_Price( petData_2 , '包月洗澡' ) ).toBe( null ) ; 
    expect( get_Pet_Plan_Adjust_Price( petData_2 , '包月美容' ) ).toBe( null ) ; 

}) ;







