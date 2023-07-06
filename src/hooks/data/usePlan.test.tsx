/* eslint-disable jest/valid-title */

import { renderHook } from '@testing-library/react-hooks' ;

import { usePlan_Get_Plan_Price , 
         usePlan_Filter_By_Type
          

       } from './usePlan' ; 



describe( "usePlan_Get_Plan_Price ： 各種方案類型 ( 預設方案 : 包月洗澡、包月美容 / 自訂方案 ) ， 計算 _ 共計價格" , () => { 

   test( "為 '預設方案'：包月洗澡 --> 當基本價格為 3,000 元 、自行調整為 300 元、接送費為 50 元，價格共計為 3,350 元" , () => {

      const month_Bath = {
                            pet               : { month_bath_price : 3000 } ,
                            plan_type         : '包月洗澡' ,
                            plan_adjust_price : 300 ,
                            pickup_fee        : 50
                          } ;

      const { result } = renderHook( () => usePlan_Get_Plan_Price( month_Bath ) )  ;

      expect( result.current ).toBe( 3350 ) ;

   }) ; 

   test( "為 '預設方案'：包月美容 --> 當基本價格為 4,000 元 、自行調整為 400 元、接送費為 40 元，價格共計為 4,440 元" , () => {

        const month_Bath = {
                             pet               : { month_beauty_price : 4000 } ,
                             plan_type         : '包月美容' ,
                             plan_adjust_price : 400 ,
                             pickup_fee        : 40
                           } ;

        const { result } = renderHook( () => usePlan_Get_Plan_Price( month_Bath ) )  ;

        expect( result.current ).toBe( 4440 ) ;


   }) ; 

   test( "為 '自訂方案' 時，方案共計價格為欄位 plan_fee_total 欄位所標定價格" , () => {

        const custom_Plan = { plan_fee_total : 2000 } ;

        const { result } = renderHook( () => usePlan_Get_Plan_Price( custom_Plan ) )  ;

        expect( result.current ).toBe( 2000 ) ;

   }) ; 

   test( "為 '自訂方案' 時，欄位 plan_fee_total 為 undefined ，共計價格為 0" , () => {

       const custom_Plan = {  plan_fee_total : undefined  } ;

       const { result } = renderHook( () => usePlan_Get_Plan_Price( custom_Plan ) )  ;

       expect( result.current ).toBe( 0 ) ;

   }) ; 

}) ;



describe( "usePlan_Filter_By_Type : 特定寵物所有購買方案，是否依照 '預設方案' ( '包月洗澡' 或 '包月美容' ) 、'自訂方案'，予以分類 ()" , () => { 


   // 預設輸入測試資料
   const mock_All_Plans = [ 
                              {  plan_type : "包月美容"    , created_at : "2022-04-12 13:33:04" } ,
                              {  plan_type : "二洗三美"    , created_at : "2022-05-20 15:23:11" } , // 自訂
                              {  plan_type : "包月洗澡"    , created_at : "2022-01-13 20:10:33" } ,
                              {  plan_type : "2022 週年慶" , created_at : "2022-03-03 15:10:22" } , // 自訂
                              {  plan_type : "包月洗澡"    , created_at : "2022-08-04 11:21:04" } , 
                          ]


   test( "新增 '洗澡' 頁籤下，會取得 _ 包月洗澡 ( 2 個 )、包月美容 ( 1 個 )、自訂方案 ( 2 個 )，並依照 created_at 由新到舊排序" , () => {

      // 預期方案陣列 ( 依照 created_at 由新到舊排序 )
      const expect_Arr = [
                           {  plan_type : "包月洗澡"    , created_at : "2022-08-04 11:21:04" } , 
                           {  plan_type : "二洗三美"    , created_at : "2022-05-20 15:23:11" }  , // 自訂
                           {  plan_type : "包月美容"    , created_at : "2022-04-12 13:33:04" } ,
                           {  plan_type : "2022 週年慶" , created_at : "2022-03-03 15:10:22" } , // 自訂
                           {  plan_type : "包月洗澡"    , created_at : "2022-01-13 20:10:33" } ,
                         ]

       const { result } = renderHook( () => usePlan_Filter_By_Type( "洗澡" , mock_All_Plans ) )  ;
 
       expect( result.current ).toEqual( expect_Arr ) ;

   }) ; 

   test( "新增 '美容' 頁籤下，會取得 _ 包月美容 ( 1 個 )、自訂方案 ( 2 個 )，並依照 created_at 由新到舊排序" , () => {
   
      // 預期方案陣列 ( 依照 created_at 由新到舊排序 )
      const expect_Arr = [
                           {  plan_type : "二洗三美"    , created_at : "2022-05-20 15:23:11" }  , // 自訂
                           {  plan_type : "包月美容"    , created_at : "2022-04-12 13:33:04" } ,
                           {  plan_type : "2022 週年慶" , created_at : "2022-03-03 15:10:22" }  , // 自訂
                         ]

      const { result } = renderHook( () => usePlan_Filter_By_Type( "美容" , mock_All_Plans ) )  ;

      expect( result.current ).toEqual(  expect_Arr  ) ;
   

   }) ;

}) ;










