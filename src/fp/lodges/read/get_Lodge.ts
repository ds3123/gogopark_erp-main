/* eslint-disable no-unreachable */

import { get_Trim_Time } from "fp/common/read/get_Date"



// 應 Check In , Check Out 時間 ( 早於 / 晚於 _ 這個時間 -> 安親  )
const checkTime = () => '15:00' ;


// 判斷 _ 住宿日期為 : 平日 ( 一 ~ 四 ) < T >
export const is_Lodge_RegularDay = ( lodgeDate : string ) : boolean => {

    const weekNum = new Date( lodgeDate ).getDay() ; 

    return weekNum === 1 || weekNum === 2 || weekNum === 3 || weekNum === 4 

}


// 判斷 _ 住宿日期為 : 假日 ( 五 ~ 日 ) < T >
export const is_Lodge_Holiday = ( lodgeDate : string ) : boolean => {

    const weekNum = new Date( lodgeDate ).getDay() ; 

    return weekNum === 5 || weekNum === 6 || weekNum === 0

}


// 判斷 _ 住宿日期為 : 國定假日 < T >
export const is_Lodge_NationalHoliday = ( nationalHoliday : NationalHoliday[] , lodgeDate : string ) : boolean => {

    const filter = nationalHoliday.filter( x => x.date === lodgeDate ) ;

    return filter.length > 0

}


// 判斷 _ 提早 Check In
export const is_Early_CheckIn = ( checkIn : string ) : boolean => {

    return checkTime() > get_Trim_Time( checkIn ) ? true : false 

} 

// 判斷 _ 延遲 Check Out
export const is_Late_CheckOut = ( checkOut : string ) : boolean => {

    return get_Trim_Time( checkOut ) > checkTime() ? true : false 
    
} 



// 判斷 _ 所輸入日期，是否與資料庫日期重複
export const is_Lodge_Duplicate_Date = ( intervalDates : string[] , shopHolidays : any[] ) : boolean => {

    const duplicateDaties = intervalDates.filter( x => shopHolidays.includes( x ) ) ; 

    return duplicateDaties.length > 0 ? true : false

} ;




// -----------------------------


// 取得 _ 住宿日期為 : 平日 的所有日期 < T >
export const get_Lodge_RegularDays = ( intervalDays : string[] ) : any[] => intervalDays.filter( is_Lodge_RegularDay ) ;


// 取得 _ 住宿日期為 : 假日 的所有日期 < T >
export const get_Lodge_Holidays = ( intervalDays : string[] ) : any[] => intervalDays.filter( is_Lodge_Holiday ) ;


// 取得 _ 住宿日期為 : 國定假日 的所有日期 < T >
export const get_Lodge_NationalHolidays = ( intervalDays : string[] , nationalHoliday : NationalHoliday[] ) : any[] => intervalDays.filter( ( x ) => is_Lodge_NationalHoliday( nationalHoliday , x ) ) ;


// 取得 _ 住宿日期為 : 國定假日以外 ( 平日 + 假日 -> 排除 _ 國定假日 ) 的所有日期 < T >
export const get_Lodge_Non_NationalHolidays = ( intervalDays : string[] , nationalHoliday : NationalHoliday[] ) : string[] => {

    return intervalDays.filter( ( x ) => !is_Lodge_NationalHoliday( nationalHoliday , x ) ) ;

} ;


// -----------------------------


// 取得 _ 房型 : 價格組合 < T >
export const get_Lodge_RoomType_Prices = ( roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : RoomType_Prices => lodge_PricePlan.filter( ( x ) => x.roomType === roomType )[0] ;


// 取得 _ 特定類型 ( 平日 / 假日 ) 日期、房型、方案 ：價格 < T >
export const get_LodgeDate_RoomType_Price = ( lodgeDate : string , roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : number => {

    // 特定房型 : 價格組合 
    const roomTypePrices = get_Lodge_RoomType_Prices( roomType , lodge_PricePlan ) ;


    return is_Lodge_RegularDay( lodgeDate ) ? roomTypePrices.regularDay_Price : // 平日
           is_Lodge_Holiday( lodgeDate )    ? roomTypePrices.holiday_Price :    // 假日
                                               0    
}

// 取得 _ 特定類型 ( 國定假日 ) 日期、房型、方案 ：價格 < T >
export const get_LodgeDate_RoomType_NationalHoliday_Price = ( roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : number => {

    // 特定房型 : 價格組合 
    const roomTypePrices = get_Lodge_RoomType_Prices( roomType , lodge_PricePlan ) ;

    return roomTypePrices.ordinary_Price

}


// -----------------------------


// 取得 _ 價格 : 總計金額 < T >
export const get_Lodge_Prices_Total = ( priceArr : number[] ) : number => priceArr.reduce( ( accu , curr ) => accu + curr , 0 ) ;


// 取得 _ 住宿期間 ，"平日" : 總計金額 < T >
export const get_Lodge_RegualrDays_Price_Total = ( intervalDays : string[] , roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : number => {

    // 篩選 _ 日期區間內，"平日" : 所有日期   
    const regularDays = get_Lodge_RegularDays( intervalDays ) ; 

    // 取得 _ 所有 "平日" 日期、房型、方案 : 價格
    const priceArr = regularDays.map( ( date : string ) => get_LodgeDate_RoomType_Price( date , roomType , lodge_PricePlan ) ) ;

    return get_Lodge_Prices_Total( priceArr ) ;

}


// 取得 _ 住宿期間 ，"假日" : 總計金額 < T >
export const get_Lodge_Holidays_Price_Total = ( intervalDays : string[] , roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : number => {

    // 篩選 _ 日期區間內，"假日" : 所有日期   
    const holidays = get_Lodge_Holidays( intervalDays ) ; 

    // 取得 _ 所有 "假日" 日期、房型、方案 : 價格
    const priceArr = holidays.map( ( date : string ) => get_LodgeDate_RoomType_Price( date , roomType , lodge_PricePlan ) ) ;
 

    return get_Lodge_Prices_Total( priceArr ) ;

}


// 取得 _ 住宿期間 ，"國定假日" : 總計金額 < T >
export const get_Lodge_NationalHolidays_Price_Total = ( nationalHolidays : string[] , roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : number => {

    // 取得 _ 特定方案、房型下，國定假日價錢 ( 原價 ) 
    const nationHoliday_Price = get_LodgeDate_RoomType_NationalHoliday_Price( roomType , lodge_PricePlan ) ;
   
    // 國定假日 : 天數 
    const nationHolidays_Num  = nationalHolidays.length ;

    return nationHoliday_Price * nationHolidays_Num ;

}


// 取得 _ 住宿期間，"所有類型日期" : 總計金額 < T >
export const get_Lodge_Interval_Prices_Total = ( intervalDays : string[] , nationalHoliday : NationalHoliday[] , roomType : RoomType , lodge_PricePlan : RoomType_Prices[] ) : number => {


   // 國定假日以外日期 : 平日 + 假日
   const non_NationalHolidays = get_Lodge_Non_NationalHolidays( intervalDays , nationalHoliday ) ;


   // 國定假日所有日期
   const nationalHolidays     = get_Lodge_NationalHolidays( intervalDays , nationalHoliday ) ; 


   // --------------------


   // 總計金額 : 平日
   const regularDays_Price_Total      = get_Lodge_RegualrDays_Price_Total( non_NationalHolidays , roomType , lodge_PricePlan ) ;

   // 總計金額 : 假日
   const holidays_Price_Total         = get_Lodge_Holidays_Price_Total( non_NationalHolidays , roomType , lodge_PricePlan ) ;

   // 總計金額 : 國定假日
   const nationalHolidays_Price_Total = get_Lodge_NationalHolidays_Price_Total( nationalHolidays , roomType , lodge_PricePlan ) ; 

   
   return regularDays_Price_Total + holidays_Price_Total + nationalHolidays_Price_Total ;


}



// 取得 _ 相同時段名稱下，所有日期
export const get_Lodge_Title_Dates = ( allDates : any[] ) : any[] => {

    // 取出所有名稱
    const allTitles    = allDates.map( x => x.title ) ;

    // 篩選不重複名稱
    const uniqueTitles = allTitles.filter( ( x , i , a ) => a.indexOf( x ) === i ) ;

    // 重組資料
    const result = uniqueTitles.map( x => {

                        // 篩選出名稱相同的物件
                        const arr : any = allDates.filter( y => y.title === x ) ;

                        // 再抽取出日期
                        return { title : x , date : arr.map( ( z : any ) => z.date ) }

                   })   


    return result

}

// 取得 _ 所有熱門時段日期 < T >
export const get_Lodge_All_Dates = ( shopHolidays : any[] ) : NationalHoliday[] => {

    return  shopHolidays.reduce( ( acc , cur ) => {

                return acc.concat( cur.date )

            } , [] ) ;

}


// 取得 _ 將時段物件，拆解為多個個別日期 < T >
export const get_Lodge_Split_Dates = ( dateObj : { title : string , date : string[] } ) : NationalHoliday[] => { 

   return dateObj.date.map( x => { return { title : dateObj.title , date : x } }) ;

} ;


// 取得 _ 拆解、轉換後的 ( 單個 ) 熱門日期 < T >
export const get_Lodge_Convert_Single_Date = ( shopHolidays : any[] ) : NationalHoliday[] => {
    
    return shopHolidays.reduce( ( acc , cur ) => {

                                  // 先將時段物件，拆解為多個個別日期陣列
                                  const arr = get_Lodge_Split_Dates( cur ) ;

                                  // 合併所有陣列 
                                  return acc.concat( arr ) ;
        
                               } , [] ) ;

} ;

