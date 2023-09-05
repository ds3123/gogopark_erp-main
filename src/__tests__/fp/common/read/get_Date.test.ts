/* eslint-disable jest/valid-title */

import { 
          get_Hyphen_Today ,
          get_Trim_Time
        
        } from "fp/common/read/get_Date" ;

        


describe( "get_Hyphen_Today() : 取得 _ 今日日期" , () => { 

    beforeAll(() => {

        // 利用 JEST 設定 _ 假時間
        jest.useFakeTimers( 'modern' ) ;
        jest.setSystemTime( new Date( 2023 , 6 , 20 ) ) ; // 須比實際少 1 個月

    });
    
    afterAll(() => {

        // 回復 _ 使用真實時間
        jest.useRealTimers() ;

    });

    test( "格式 YYYY-MM-DD ( Ex. 2023-07-20 )" , () => {

        expect( get_Hyphen_Today() ).toBe( "2023-07-20" ) ;

    }) ;

}) ; 



describe( "處理 _ 時間格式" , () => { 

    test( "get_Trim_Time() : 取得 _ 去除空白後的時間 " , () => {
    
         // 有空格
         expect( get_Trim_Time( '15 : 00' ) ).toBe( '15:00' )
         
         // 沒有空格
         expect( get_Trim_Time( '10:06' ) ).toBe( '10:06' )

         // 傳入 _ 空字串
         expect( get_Trim_Time( '' ) ).toBe( '' )
        
    }) ;

}) ; 





















