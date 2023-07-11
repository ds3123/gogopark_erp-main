import { compose } from 'fp/tool' ;
import { 
        is_ServiceType_Basic ,
        is_ServiceType_Bath ,
        is_ServiceType_Beauty ,

        is_ServiceStatus_Arrived ,
        is_ServiceStatus_Appointment_Today ,
        is_ServiceStatus_Appointment_Future ,
        is_ServiceStatus_Appointment_TodayFuture ,

        is_ServiceType_BathBeauty ,
        is_ServiceType_BasicBathBeauty ,

        is_ShopStatus_NotArrived ,
        is_ShopStatus_Wait , 
        is_ShopStatus_Process ,
        is_ShopStatus_Done ,
        is_ShopStatus_Home ,
        is_ShopStatus_DoneHome ,
       } from 'fp/state' ;
import { Shop_Status } from 'utils/Interface_Type';



/*

    NOTE : 
     1. 已完成   -> shop_status    : 洗完等候中 + 已回家( 房 ) 
     2. 預約狀態 -> service_status : 預約今天 + 預約未來
     3. 現場狀態 -> service_status : 已到店 ( WARN ! : 若以 shop_status 的 "到店等候中" ， 由於到店處理 4 個狀態會變化，因此加總數會 _ 僅計算 : "到店等候中" )

*/


// # 篩選資料 : filter() 

// * 篩選 _ 資料類型 ( service_type )
export const get_ServiceOrder_Basic           = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceType_Basic ) ;           // <T>
export const get_ServiceOrder_Bath            = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceType_Bath ) ;            // <T>
export const get_ServiceOrder_Beauty          = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceType_Beauty );           // <T>
export const get_ServiceOrder_BathBeauty      = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceType_BathBeauty ) ;      // <T>
export const get_ServiceOrder_BasicBathBeauty = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceType_BasicBathBeauty ) ; // <T>


// * 篩選 _ 到店狀態 ( shop_status )

// 1. 到店等候中 < T >
export const get_ShopStatus_Wait = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ShopStatus_Wait ) ; ;

// 2. 洗完等候中 < T >
export const get_ShopStatus_Done = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ShopStatus_Done ) ;

// 3. 已回家( 房 ) < T >
export const get_ShopStatus_Home = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ShopStatus_Home ) ;

// 4. 洗完等候中 + 已回家( 房 )
export const get_ShopStatus_DoneHome = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ShopStatus_DoneHome ) ;


// * 篩選 _ 服務狀態 ( service_status ) 

// 1. 已到店 < T >
export const get_ServiceStatus_Arrived                 = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceStatus_Arrived ) ;

// 2. 預約今天 < T >
export const get_ServiceStatus_Appointment_Today       = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceStatus_Appointment_Today ) ;

// 3. 預約未來 < T >
export const get_ServiceStatus_Appointment_Future      = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceStatus_Appointment_Future ) ;

// 預約今天 + 預約未來 < T >
export const get_ServiceStatus_Appointment_TodayFuture = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_ServiceStatus_Appointment_TodayFuture ) ;



// # 今日預約 ---------------

// 取得 _ 預約 : "基礎單" _ 數量 
export const get_ServiceOrder_AppointmentNum_Basic = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceStatus_Appointment_TodayFuture , // 篩選 _ 預約狀態
                            get_ServiceOrder_Basic                      // 篩選 _ 基礎單
                           )( data ) ;

    return result.length

} ;

// 取得 _ 預約 : "洗澡單" _ 數量
export const get_ServiceOrder_AppointmentNum_Bath = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceStatus_Appointment_TodayFuture , // 篩選 _ 預約狀態
                            get_ServiceOrder_Bath                       // 篩選 _ 洗澡單
                           )( data ) ;

    return result.length

} ;

// 取得 _ 預約 : "美容單" _ 數量
export const get_ServiceOrder_AppointmentNum_Beauty = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceStatus_Appointment_TodayFuture , // 篩選 _ 預約狀態
                            get_ServiceOrder_Beauty                     // 篩選 _ 美容單
                          )( data ) ;

    return result.length

} ;

// 取得 _ 預約 : "基礎單" + "洗澡單" + "美容單" _ 總數
export const get_ServiceOrder_AppointmentNum_Total = ( data : any[] ) : number => {

    return get_ServiceOrder_AppointmentNum_Basic( data ) + 
           get_ServiceOrder_AppointmentNum_Bath( data ) + 
           get_ServiceOrder_AppointmentNum_Beauty( data ) 

} ;


// # 今日現場 ---------------

// 取得 _ 現場 : "基礎單" _ 數量 
export const get_ServiceOrder_OnSiteNum_Basic = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceStatus_Arrived , // 篩選 _ 現場狀態 
                            get_ServiceOrder_Basic      // 篩選 _ 基礎單
                          )( data ) ;

    return result.length
    

} ;

// 取得 _ 現場 : "洗澡單" _ 數量 
export const get_ServiceOrder_OnSiteNum_Bath = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceStatus_Arrived , // 篩選 _ 現場狀態 
                            get_ServiceOrder_Bath       // 篩選 _ 洗澡單
                          )( data ) ;

    return result.length

} ;

// 取得 _ 現場 : "美容單" _ 數量 
export const get_ServiceOrder_OnSiteNum_Beauty = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceStatus_Arrived , // 篩選 _ 現場狀態 
                            get_ServiceOrder_Beauty     // 篩選 _ 美容單
                          )( data ) ;

    return result.length

} ;


// 取得 _ 現場 : "基礎單" + "洗澡單" + "美容單" _ 總數
export const get_ServiceOrder_OnSiteNum_Total = ( data : any[] ) : number => {

    return get_ServiceOrder_OnSiteNum_Basic( data ) +
           get_ServiceOrder_OnSiteNum_Bath( data ) +
           get_ServiceOrder_OnSiteNum_Beauty( data ) 

} ;



// # 完成數量 ---------------

// 取得 _ 已完成 : "基礎單" _ 數量
export const get_ServiceOrder_CompletedNum_Basic = (  data : any[]  ) : number => {

    const result = compose(
                            get_ShopStatus_DoneHome , // 篩選 _ 已完成
                            get_ServiceOrder_Basic    // 篩選 _ 基礎單
                          )( data ) ;

    return result.length

} ;


// 取得 _ 已完成 : "洗澡單" _ 數量
export const get_ServiceOrder_CompletedNum_Bath = ( data : any[] ) : number => {

    const result = compose(
                            get_ShopStatus_DoneHome , // 篩選 _ 已完成
                            get_ServiceOrder_Bath     // 篩選 _ 洗澡單
                          )( data ) ;

     return result.length

}


// 取得 _ 已完成 : "美容單" _ 數量
export const get_ServiceOrder_CompletedNum_Beauty = ( data : any[] ) : number => {

    const result = compose(
                            get_ShopStatus_DoneHome , // 篩選 _ 已完成
                            get_ServiceOrder_Beauty   // 篩選 _ 美容單
                          )( data ) ;

    return result.length

}


// # 完成率 ---------------

// 取得 _ 已完成 : 加總數 < T >
export const get_Completed_BasicBathBeauty_Sum = ( data : any[] ) : number => {

    const result = compose(
                            get_ServiceOrder_BasicBathBeauty ,  // 篩選 _ 基礎單 + 洗澡單 + 美容單
                            get_ShopStatus_DoneHome             // 篩選 _ 洗完等候中 + 已回家( 房 )
                          )( data ) ;
    return result.length

} ;


// 取得 _ 已完成 : 完成率 < T > 
export const get_Completed_Persentage = ( completed : number , total : number ) : number => {

    return Math.round( ( completed / total ) * 100 )

} ;


// 取得 _ 已完成 : 基礎單 + 洗澡單 + 美容單 -> 完成率 
export const get_Completed_BasicBathBeauty_Persentage = ( data : any[] ) : number => {

    const completedServices = get_Completed_BasicBathBeauty_Sum( data ) ;

    const result = get_Completed_Persentage( completedServices , data.length )  ;

    return result ? result : 0 ;

} ;



// ------


// 取得 _ 特定到店狀態下，所有服務單 < T >
export const get_ShopStatus_ServiceOrders = ( shopStatus : Shop_Status ) => ( serviceOrders : any[] ) => serviceOrders.filter( x => x?.shop_status === shopStatus ) ;



// 取得 _ 特定到店狀態下，基礎單 : 數量 < T >
export const get_ShopStatus_ServiceOrderNum_Basic = ( data : any[] , shopStatus : Shop_Status )  => {

    const result = compose(
                            get_ShopStatus_ServiceOrders( shopStatus ) ,  // 篩選 _ 特定到店狀態 
                            get_ServiceOrder_Basic                        // 篩選 _ 基礎單
                           )( data ) ;

    return result.length

} ;


// 取得 _ 特定到店狀態下，洗澡單 : 數量 < T >
export const get_ShopStatus_ServiceOrderNum_Bath = ( data : any[] , shopStatus : Shop_Status )  => {


    const result = compose(
                            get_ShopStatus_ServiceOrders( shopStatus ) ,  // 篩選 _ 特定到店狀態 
                            get_ServiceOrder_Bath                         // 篩選 _ 洗澡單
                           )( data ) ;

    return result.length

} ;



// 取得 _ 特定到店狀態下，美容單 : 數量 < T >
export const get_ShopStatus_ServiceOrderNum_Beauty = ( data : any[] , shopStatus : Shop_Status )  => {


    const result = compose(
                             get_ShopStatus_ServiceOrders( shopStatus ) ,  // 篩選 _ 特定到店狀態 
                             get_ServiceOrder_Beauty                       // 篩選 _ 美容單
                           )( data ) ;

    return result.length

} ;