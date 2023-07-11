/* eslint-disable jest/valid-title */

import { get_PaymentMethod } from "fp/common/read/get_Finance"



describe( "測試 get_PaymentMethod : 取得 _ 付款方式 " , () => { 


    test( "當輸入資料， 沒有 payment_method 屬性時，回傳 _ 空字串" , () => {
    
        const data = { } as any ;

        expect( get_PaymentMethod( data ) ).toBe( "" ) ;
    

    }) ;

    test( "當輸入資料， 有 _ payment_method 屬性時，回傳 _ 其值" , () => {
    
        const data = { payment_method : "信用卡"  } as any ;

        expect( get_PaymentMethod( data ) ).toBe( "信用卡" ) ;
    
    }) ;


}) ; 




