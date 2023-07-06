/* eslint-disable jest/valid-title */

import { get_ServiceOrderId  , get_ServiceOrderUrl } from "fp/services/read/get_Data" ;



describe( "測試 : 取得 _ 服務單 : 資料表 id" , () => { 

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


describe( "測試 : 取得 _ 服務單 : API Url" , () => { 

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












