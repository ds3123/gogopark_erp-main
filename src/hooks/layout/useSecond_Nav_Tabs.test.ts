/* eslint-disable jest/valid-title */

import { renderHook } from '@testing-library/react-hooks' ;
import { useSecond_Nav_Tabs } from "./useSecond_Nav_Tabs" ;


// @ 產生 _ 第二層類別點選標籤 ( Ex. 洗美區塊 -> 洗美、方案 ; 住宿區塊 -> 住宿、安親 )
describe( "位於 '洗美' 區塊中，產生第二層點選標籤 : 洗美、方案" , () => { 

    // 預期產出標籤 
    let expected_Tabs : any[] ;

    beforeEach( () => {

        expected_Tabs = [
                          { title : "洗 美" , icon : "fas fa-list-ol"  } ,
                          { title : "方 案" , icon : "fas fa-file-alt" } 
                        ] ;

    } )


    test( "洗美選項，輸入參數為 : 'service'" , () => {

        const mock_Data_Type = 'service' ;

        const { result } = renderHook( () => useSecond_Nav_Tabs( mock_Data_Type ) ) ;

        expect( result.current ).toEqual( expected_Tabs ) ;                       

    }) ;


    test( "方案選項，輸入參數為 : 'plan'" , () => {

        const mock_Data_Type = 'plan' ;

        const { result } = renderHook( () => useSecond_Nav_Tabs( mock_Data_Type ) ) ;

        expect( result.current ).toEqual( expected_Tabs ) ;                       

    }) ;

}) ;


describe( "位於 '住宿' 區塊中，產生第二層點選標籤 : 住宿、安親" , () => { 

   // 預期產出標籤 
   let expected_Tabs : any[] ;

   beforeEach( () => {

       expected_Tabs = [
                        { title : "住 宿" , icon : "fas fa-home" } ,
                        { title : "安 親" , icon : "fas fa-baby-carriage" } 
                       ]

   } ) 

   test( "住宿選項，輸入參數為 : 'lodge'" , () => {

        const mock_Data_Type = 'lodge' ;

        const { result } = renderHook( () => useSecond_Nav_Tabs( mock_Data_Type ) ) ;

        expect( result.current ).toEqual( expected_Tabs ) ;    

   }) ; 

   test( "安親選項，輸入參數為 : 'care'" , () => {

        const mock_Data_Type = 'care' ;

        const { result } = renderHook( () => useSecond_Nav_Tabs( mock_Data_Type ) ) ;

        expect( result.current ).toEqual( expected_Tabs ) ; 

   }) ; 

}) ;


describe( "若為客戶區塊或寵物區塊 ( 輸入參數為 : 'customer' / 'pet' ) , 無任何第二層標籤 ( 回傳 ： 空陣列 )" , () => { 

   test( "客戶區塊，輸入參數為 : 'customer'" , () => {

        const mock_Data_Type = 'customer' ;

        const { result } = renderHook( () => useSecond_Nav_Tabs( mock_Data_Type ) ) ;

        expect( result.current ).toEqual( [] ) ; 


   }) ; 

   test( "寵物區塊，輸入參數為 : 'pet'" , () => {

        const mock_Data_Type = 'pet' ;

        const { result } = renderHook( () => useSecond_Nav_Tabs( mock_Data_Type ) ) ;

        expect( result.current ).toEqual( [] ) ; 


   }) ; 

}) ;














