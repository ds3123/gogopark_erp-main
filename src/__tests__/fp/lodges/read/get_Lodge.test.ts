/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/valid-title */
import moment from 'moment' ; 
import { 
         is_Lodge_RegularDay ,
         is_Lodge_Holiday ,
         is_Lodge_NationalHoliday ,
         is_Early_CheckIn ,
         is_Late_CheckOut ,
         
         get_Lodge_RegularDays ,
         get_Lodge_Holidays ,
         get_Lodge_NationalHolidays ,
         get_Lodge_Non_NationalHolidays ,

         get_Lodge_RoomType_Prices ,
         get_LodgeDate_RoomType_Price ,
         get_LodgeDate_RoomType_NationalHoliday_Price ,

         get_Lodge_Prices_Total ,

         get_Lodge_RegualrDays_Price_Total , 
         get_Lodge_Holidays_Price_Total , 
         get_Lodge_NationalHolidays_Price_Total ,
        
         get_Lodge_Interval_Prices_Total 

       } from "fp/lodges/read/get_Lodge" ;

import { get_Interval_Dates } from "utils/time/date"



test( "get_Lodge_Prices_Total() : 取得 _ 價格 : 總計金額" , () => {

    const data_1 = [ 100 , 250 , 300 ] ;
    const data_2 = [] as any ;

    expect( get_Lodge_Prices_Total( data_1 ) ).toBe( 650 ) ;
    expect( get_Lodge_Prices_Total( data_2 ) ).toBe( 0 ) ;

}) ;



describe( "判斷 _ Check In 、 Check Out 時間" , () => { 

    test( "is_Early_CheckIn() :  提早 Check In" , () => {
    
       expect( is_Early_CheckIn( '10 : 00' ) ).toBeTruthy() ;
       expect( is_Early_CheckIn( '14 : 59' ) ).toBeTruthy() ;

       expect( is_Early_CheckIn( '15 : 00' ) ).not.toBeTruthy() ;

       expect( is_Early_CheckIn( '15 : 01' ) ).not.toBeTruthy() ;
       expect( is_Early_CheckIn( '16 : 10' ) ).not.toBeTruthy() ;

    }) ;

    test( "is_Late_CheckOut() : 延遲 Check Out" , () => {
    

        expect( is_Late_CheckOut( '10 : 00' ) ).not.toBeTruthy() ;
        expect( is_Late_CheckOut( '14 : 59' ) ).not.toBeTruthy() ;
 
        expect( is_Late_CheckOut( '15 : 00' ) ).not.toBeTruthy() ;
 
        expect( is_Late_CheckOut( '15 : 01' ) ).toBeTruthy() ;
        expect( is_Late_CheckOut( '16 : 10' ) ).toBeTruthy() ;

    
    }) ;

}) ; 


describe( "判斷 _ 住宿類型 : 平日、假日、國定假日" , () => { 

        // 設定 _ 假日期
        const set_FakeDate = ( fakeDate : any ) => {
    
            jest.setSystemTime( fakeDate ) ; 
    
            const date = moment( new Date() ).format( 'YYYY-MM-DD' ) ;
    
            return date
         
        } ;
    
    
        beforeAll( () => {
    
            jest.useFakeTimers( 'modern' ) ;
    
        });
        
        afterAll( () => {
           
            jest.useRealTimers() ;  // 回復 _ 使用真實時間
    
        });
    
    
        describe( "is_Lodge_RegularDay() : 平日 ( 一 ~ 四 ) / is_Lodge_Holiday() : 假日 ( 五 ~ 日 )" , () => { 
    
            test( "2023-08-07( 一 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 7 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).not.toBeTruthy() ;
    
            }) ;
    
            test( "2023-08-08( 二 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 8 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).not.toBeTruthy() ;
    
            }) ;
    
            test( "2023-08-09( 三 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 9 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).not.toBeTruthy() ;
    
            }) ;
    
            test( "2023-08-10( 四 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 10 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).not.toBeTruthy() ;
    
            }) ;
    
            test( "2023-08-11( 五 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 11 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).not.toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).toBeTruthy() ;
    
            }) ;
    
            test( "2023-08-12( 六 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 12 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).not.toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).toBeTruthy() ;
    
            }) ;
    
            test( "2023-08-13( 日 )" , () => {
    
                const date = set_FakeDate( new Date( 2023 , 7 , 13 ) ) ;
    
                expect( is_Lodge_RegularDay( date ) ).not.toBeTruthy() ;
                expect( is_Lodge_Holiday( date ) ).toBeTruthy() ;
    
            }) ;
        
        }) ; 

        
        describe( "is_Lodge_NationalHoliday() : 自訂 _ 國定假日 / 熱門時段" , () => { 
        
            const data : NationalHoliday[] = [ 
    
               { title : "父親節" , date : "2023-08-08" } ,
               { title : "國慶日" , date : "2023-10-10" } ,
               { title : "光復節" , date : "2023-10-25" } 
    
            ] ;
    
            expect( is_Lodge_NationalHoliday( data , "2023-08-08" ) ).toBeTruthy() ;
            expect( is_Lodge_NationalHoliday( data , "2023-09-20" ) ).not.toBeTruthy() ;
        
        }) ;
    
        
}) ; 


describe( "get_Interval_Dates() : 取得 _ 起、迄日期之間 : 所有日期字串" , () => { 

    test( "同一個月份內" , () => { 

        const periodDays = [
            '2023-08-07' , 
            '2023-08-08' , 
            '2023-08-09' , 
            '2023-08-10' , 
            '2023-08-11' 
        ] ;

        expect( get_Interval_Dates( '2023-08-07' , '2023-08-11' ) ).toEqual( periodDays ) ;

    }) ; 

    test( "跨月份" , () => {
    
        const periodDays = [
            '2023-08-29' , 
            '2023-08-30' , 
            '2023-08-31' , 
            '2023-09-01' , 
            '2023-09-02' 
        ] ;

        expect( get_Interval_Dates( '2023-08-29' , '2023-09-02'  ) ).toEqual( periodDays ) ;

    }) ;

    test( "跨年" , () => {

        const periodDays = [
            '2023-12-30' , 
            '2023-12-31' , 
            '2024-01-01' , 
            '2024-01-02' , 
            '2024-01-03' 
        ] ;

        expect( get_Interval_Dates( '2023-12-30' , '2024-01-03' ) ).toEqual( periodDays ) ;

    }) ;

}) ; 


describe( "從一段時間中( 多個日期字串 )，篩選 _ 平日、假日、國定假日 所有日期" , () => { 

    const intervalDays = [  
 
       // 一 ~ 四   
       '2023-08-07' , 
       '2023-08-08' ,  
       '2023-08-09' ,  
       '2023-08-10' ,  
       // 五 ~ 日
       '2023-08-11' ,  
       '2023-08-12' ,  
       '2023-08-13' ,  

    ] ;

    test( "get_Lodge_RegularDays() : 取得 _ 住宿日期為 : 平日 的所有日期" , () => {
    
        expect( get_Lodge_RegularDays( intervalDays ) ).toEqual( [
 
            '2023-08-07' ,  
            '2023-08-08' ,  
            '2023-08-09' ,  
            '2023-08-10' ,  

        ]) ;
        
    }) ;

    test( "get_Lodge_Holidays() : 取得 _ 住宿日期為 : 假日 的所有日期" , () => {
    
        expect( get_Lodge_Holidays( intervalDays ) ).toEqual( [
 
            '2023-08-11' ,  
            '2023-08-12' ,  
            '2023-08-13' ,   

        ]) ;
    
    }) ;

    test( "get_Lodge_Non_NationalHolidays() : 取得 _ 住宿日期為 : 國定假日以外 ( 平日 + 假日 -> 排除 _ 國定假日 ) 的所有日期" , () => {
                    
            // 國定假日 / 熱門時段
            const nationalHolidays : NationalHoliday[] = [

                { title : '父親節'   , date : '2023-08-08' } ,
                { title : '熱門時段' , date : '2023-08-12' } ,

            ] ;

            expect( get_Lodge_Non_NationalHolidays( intervalDays , nationalHolidays ) ).toEqual( 
                                                                                                  [ 
                                                                                                    '2023-08-07' , 
                                                                                                    '2023-08-09' ,  
                                                                                                    '2023-08-10' ,  
                                                                                                    '2023-08-11' ,  
                                                                                                    '2023-08-13' 
                                                                                                  ] 
                                                                                                ) ;

    }) ;

    test( "get_Lodge_NationalHolidays() : 取得 _ 住宿日期為 : 國定假日 的所有日期" , () => {
    
         const nationalHolidays : NationalHoliday[] = [
 
             { title : "父親節" , date : "2023-08-08" }

         ] ;

         expect( get_Lodge_NationalHolidays( intervalDays , nationalHolidays ) ).toEqual([

            '2023-08-08' ,  

         ]) ;

    }) ;

}) ; 


describe( "取得 _ 房型、時段 : 價格" , () => { 

    // 方案 1 : 不退款、不換寵物優惠
    const lodge_PricePlan_1 : RoomType_Prices[] = [

        // 狗 
        { roomType : '大房' , ordinary_Price : 1200 , holiday_Price : 1080 , regularDay_Price: 960 } ,
        { roomType : '中房' , ordinary_Price : 1000 , holiday_Price : 900  , regularDay_Price: 800 } ,
        { roomType : '大籠' , ordinary_Price : 700  , holiday_Price : 630  , regularDay_Price: 560 } ,
        { roomType : '中籠' , ordinary_Price : 600  , holiday_Price : 540  , regularDay_Price: 480 } ,
        { roomType : '小籠' , ordinary_Price : 500  , holiday_Price : 450  , regularDay_Price: 400 } ,
    
        // 貓
        { roomType : '豪華樓中樓' , ordinary_Price : 1200 , holiday_Price : 1080 , regularDay_Price: 960 } ,
        { roomType : '溫馨房'    , ordinary_Price : 600 , holiday_Price : 540 , regularDay_Price: 480 } ,
        { roomType : '挑高房'    , ordinary_Price : 700 , holiday_Price : 630 , regularDay_Price: 560 } ,
    
    ] ;
    
    // 方案 2 : 退訂可換住宿券
    const lodge_PricePlan_2 : RoomType_Prices[] = [
    
        // 狗 
        { roomType : '大房' , ordinary_Price : 1400 , holiday_Price : 1260 , regularDay_Price: 1120 } ,
        { roomType : '中房' , ordinary_Price : 1200 , holiday_Price : 1080 , regularDay_Price: 960 } ,
        { roomType : '大籠' , ordinary_Price : 900  , holiday_Price : 810  , regularDay_Price: 720 } ,
        { roomType : '中籠' , ordinary_Price : 800  , holiday_Price : 720  , regularDay_Price: 640 } ,
        { roomType : '小籠' , ordinary_Price : 700  , holiday_Price : 630  , regularDay_Price: 560 } ,
    
        // 貓
        { roomType : '豪華樓中樓' , ordinary_Price : 1400 , holiday_Price : 1260 , regularDay_Price: 1120 } ,
        { roomType : '溫馨房'    , ordinary_Price : 800  , holiday_Price : 720  , regularDay_Price: 640 } ,
        { roomType : '挑高房'    , ordinary_Price : 900  , holiday_Price : 810  , regularDay_Price: 720 } ,
    
    ] ;
    
    test( "get_Lodge_RoomType_Prices() : 房型" , () => {
    
    
       expect( get_Lodge_RoomType_Prices( "中籠" , lodge_PricePlan_1 ) ).toEqual({  
                                                                                  roomType         : '中籠' , 
                                                                                  ordinary_Price   : 600 , 
                                                                                  holiday_Price    : 540  , 
                                                                                  regularDay_Price : 480 
                                                                                }) ;


       expect( get_Lodge_RoomType_Prices( "豪華樓中樓" , lodge_PricePlan_2 ) ).toEqual({  
                                                                                       roomType         : '豪華樓中樓' , 
                                                                                       ordinary_Price   : 1400 , 
                                                                                       holiday_Price    : 1260  , 
                                                                                       regularDay_Price : 1120 
                                                                                     }) ;


    }) ;

    test( "get_LodgeDate_RoomType_Price() : 取得 _ 特定類型 ( 平日 / 假日 ) 日期、房型、方案" , () => {

        expect( get_LodgeDate_RoomType_Price( '2023-08-07' , '大籠' , lodge_PricePlan_2 ) ).toBe( 720 ) ;       // 星期一
        expect( get_LodgeDate_RoomType_Price( '2023-08-08' , '中房' , lodge_PricePlan_2 ) ).toBe( 960 ) ;       // 星期二
        expect( get_LodgeDate_RoomType_Price( '2023-08-09' , '小籠' , lodge_PricePlan_2 ) ).toBe( 560 ) ;       // 星期三
        expect( get_LodgeDate_RoomType_Price( '2023-08-10' , '大房' , lodge_PricePlan_2 ) ).toBe( 1120 ) ;      // 星期四
        expect( get_LodgeDate_RoomType_Price( '2023-08-11' , '豪華樓中樓' , lodge_PricePlan_2 ) ).toBe( 1260 ) ; // 星期五
        expect( get_LodgeDate_RoomType_Price( '2023-08-12' , '溫馨房' , lodge_PricePlan_2 ) ).toBe( 720 ) ;     // 星期六
        expect( get_LodgeDate_RoomType_Price( '2023-08-12' , '挑高房' , lodge_PricePlan_2 ) ).toBe( 810 ) ;     // 星期日
    
    }) ;

    test( "get_LodgeDate_RoomType_NationalHoliday_Price() : 取得 _ 特定類型 ( 國定假日 / 熱門時段 ) 日期、房型、方案 ：價格" , () => {
    
        // 方案 1 / 大籠  / 二 ( 父親節 )   
        expect( get_LodgeDate_RoomType_NationalHoliday_Price( '大籠'      , lodge_PricePlan_1 ) ).toBe( 700 ) ;  
        
        // 方案 2 / 豪華樓中樓  / 六 ( 熱門時段 )   
        expect( get_LodgeDate_RoomType_NationalHoliday_Price( '豪華樓中樓' , lodge_PricePlan_2 ) ).toBe( 1400 ) ;  

    }) ;

    // --------------------

    test( "get_Lodge_RegualrDays_Price_Total() : 取得 _ 住宿期間 ，平日 : 總計金額" , () => {

        const data = [ 
                        '2023-08-09' , // 三 ( 平日 )
                        '2023-08-10' , // 四 ( 平日 )
                        '2023-08-11' , // 五 ( 假日 )
                        '2023-08-12' , // 六 ( 假日 )
                     ] ;


        // 方案 1 / 中房            
        expect( get_Lodge_RegualrDays_Price_Total( data , "中房" , lodge_PricePlan_1 ) ).toBe( 1600 ) ; 

        // 方案 2 / 豪華樓中樓
        expect( get_Lodge_RegualrDays_Price_Total( data , "豪華樓中樓" , lodge_PricePlan_2 ) ).toBe( 2240 ) ; 


    }) ;

    test( "get_Lodge_Holidays_Price_Total() : 取得 _ 住宿期間 ，假日 : 總計金額" , () => {
    
        const data = [ 
                        '2023-08-09' , // 三 ( 平日 )
                        '2023-08-10' , // 四 ( 平日 )
                        '2023-08-11' , // 五 ( 假日 )
                        '2023-08-12' , // 六 ( 假日 )
                      ] ;

        // 方案 1 / 中房            
        expect( get_Lodge_Holidays_Price_Total( data , "中房" , lodge_PricePlan_1 ) ).toBe( 1800 ) ; 

        // 方案 2 / 豪華樓中樓
        expect( get_Lodge_Holidays_Price_Total( data , "豪華樓中樓" , lodge_PricePlan_2 ) ).toBe( 2520 ) ; 


    }) ;

    test( "get_Lodge_NationalHolidays_Price_Total() : 取得 _ 住宿期間 ，國定假日 : 總計金額" , () => {
    

        const data = [ 
                       '2023-08-08' , // 二 ( 父親節 )
                       '2023-08-12' , // 六 ( 熱門時段 )
                     ] ;



        // 方案 1 / 中房            
        expect( get_Lodge_NationalHolidays_Price_Total( data , "中房" , lodge_PricePlan_1 ) ).toBe( 2000 ) ; 

        // 方案 2 / 豪華樓中樓
        expect( get_Lodge_NationalHolidays_Price_Total( data , "豪華樓中樓" , lodge_PricePlan_2 ) ).toBe( 2800 ) ; 
             
    
    }) ;


    test( "get_Lodge_Interval_Prices_Total() : 取得 _ 住宿期間，價格：總計金額" , () => {


        const intervalDays = [  
 
            // 一 ~ 四   
            '2023-08-07' , 
            '2023-08-08' ,  
            '2023-08-09' ,  
            '2023-08-10' ,  
            // 五 ~ 日
            '2023-08-11' ,  
            '2023-08-12' ,  
            '2023-08-13' ,  
     
         ] ;


        // 國定假日 / 熱門時段
        const nationalHolidays : NationalHoliday[] = [

            { title : '父親節'   , date : '2023-08-08' } ,
            { title : '熱門時段' , date : '2023-08-12' } ,

        ] ;

    
        // 方案 1 / 中房             
        expect( get_Lodge_Interval_Prices_Total( intervalDays , nationalHolidays , "中房" , lodge_PricePlan_1 ) ).toBe( 6200 ) ;    
        
        // 方案 2 / 大籠           
        expect( get_Lodge_Interval_Prices_Total( intervalDays , nationalHolidays , "大籠" , lodge_PricePlan_2 ) ).toBe( 5580 ) ;    

    
    }) ;


}) ; 










    
    
    
    
