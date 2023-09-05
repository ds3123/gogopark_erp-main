
/*

    國定假日 : 自訂
    假日    : 五 ~ 日
    平日    : 一 ~ 四

*/

type Lodge_RegularDay      = "平日" ;
type Lodge_Holiday         = "假日" ;
type Lodge_NationalHoliday = "國定假日" ;


// 國定假日
type NationalHoliday = {      
    title : string ; 
    date  : string ;
}

type RoomType = "大房" | "中房" | "大籠" | "中籠" | "小籠" | "豪華樓中樓" | "溫馨房" | "挑高房" ;


type LodgePlan = "不退款" | "可退款" ;


type RoomType_Prices = {

    roomType         : string ;  // 房型
    ordinary_Price   : number ;  // 原價
    regularDay_Price : number ;  // 平日價格
    holiday_Price    : number ;  // 假日價格

}

type LodgeDateSetting = {

    title      : string ;
    start_date : string ;
    end_date   : string ;

}


// 房型、房號
type Room_Type_Number = {

     type   : RoomType
     number : string[]

}


type Lodge_DateType = Lodge_RegularDay | Lodge_Holiday | Lodge_NationalHoliday ;

