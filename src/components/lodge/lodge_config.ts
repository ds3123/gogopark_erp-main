




// 自訂 : 國定假日 / 熱門時段 ( 原價 )
export const national_Holidays : NationalHoliday[] = [

   { title : '熱門' , date : '2023-08-31' }
  

] ;



/*

  各種房型，於不同時段( 平日、假日、國定假日 ) : 價格 ( 2023.08.09 )

*/ 

// 方案 1 : 不退款 ( 不換寵物優惠 )
export const lodge_PricePlan_1 : RoomType_Prices[] = [

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


// 方案 2 : 退款 ( 退訂可換住宿券 )
export const lodge_PricePlan_2 : RoomType_Prices[] = [

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



// 房間 ( 房型 / 房號 )
export const lodge_Rooms : Room_Type_Number[] = [
    
    { type : '大房' , number : [ 'A01' , 'A02' , 'A03' , 'A05' , 'A06' ] } ,
    { type : '中房' , number : [ 'B01' , 'B02' , 'B03' , 'B05' , 'B06' , 'B07' , 'B08' , 'B09' , 'B10' , 'B11' ] } ,
     
    { type : '大籠' , number : [ 'G01' , 'G02' , 'G03' , 'G04' , 'G05' ] } ,
    { type : '中籠' , number : [ 'H01' , 'H02' , 'H03' , 'H04' , 'H05' , 'H06' , 'H07' , 'H08' , 'H09' ] } ,
    { type : '小籠' , number : [ 'I01' , 'I02' , 'I03' , 'I04' , 'I05' , 'I06' , 'I07' , 'I08' , 'I09' , 'I10' ] } ,
    
    { type : '豪華樓中樓' , number : [ 'C113' , 'C123' , 'C133' , 'C213' , 'C223' , 'C233' , 'C313' , 'C323' , 'C333' ] } ,
   
    { type : '溫馨房' , number : [
                                  // 上 
                                  'C111' , 'C121' , 'C131' , 'C211' , 'C221' , 'C231' , 'C311' , 'C321' , 'C331' ,
                                  // 下
                                  'C112' , 'C122' , 'C132' , 'C212' , 'C222' , 'C232' , 'C312' , 'C322' , 'C332'
                                ]} ,
    
    { type : '挑高房' , number : [ 'E151' , 'E161' , 'E171' ] } ,

  ] ;

