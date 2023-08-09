/* eslint-disable jest/valid-title */

import { 
          get_Hyphen_Today  
        
        } from "fp/common/read/get_Date" ;



describe( "取得 _ 今日日期" , () => { 

    beforeAll(() => {

        // 利用 JEST 設定 _ 假時間
        jest.useFakeTimers( 'modern' );
        jest.setSystemTime( new Date( 2023 , 6 , 20 ) ); // 須比實際少 1 個月

    });
    
    afterAll(() => {

        // 回復 _ 使用真實時間
        jest.useRealTimers();

    });


    test( "格式 YYYY-MM-DD ( Ex. 2023-07-20 )" , () => {

        expect( get_Hyphen_Today() ).toBe( "2023-07-20" ) ;

    }) ;


}) ; 













