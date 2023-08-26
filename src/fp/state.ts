
import cookie from 'react-cookies' ;
import moment from "moment" ;



// 判斷 ( 藉由 editType )  _ 為 : "新增" 模式 ( 基礎、洗澡、美容單 ) < T >
export const is_Service_Create = ( editType : string | undefined | null ) : boolean => !editType ;

// 判斷 ( 藉由 editType ) _ 為 : "編輯" 模式 ( 基礎、洗澡、美容單 ) < T >
export const is_Service_Update = ( editType : string | undefined ) : boolean => editType === "編輯" ; 

// 判斷 ( 藉由 serviceData ) _ 為 : "編輯" 模式 ( 基礎、洗澡、美容單 ) < T >
export const is_ServiceOrder_Update = ( serviceOrder : any ) => serviceOrder ;

// 判斷 _ 選到 "過去" 的 : 到店 ( 服務 ) 日期 ( 基礎、洗澡、美容單 ) < T >
export const is_Past_ServiceDate = ( serviceDate : string ) : boolean => {

    const today = moment( new Date() ).format( 'YYYY-MM-DD' ) ; // 今日

    return today > serviceDate

} ;  

//  判斷 _ 選到 "未來" 的 : 到店 ( 服務 ) 日期 ( 基礎、洗澡、美容單 ) < T >
export const is_Future_ServiceDate = ( serviceDate : string ) : boolean => {

    const today = moment( new Date() ).format( 'YYYY-MM-DD' ) ; // 今日

    return today < serviceDate

}

// 判斷 _ 刪除狀態 ( 各類服務單 ) < T >
export const is_Delete = ( x : any ) : boolean => x?.is_delete === 1 ; 


// 判斷 _ 異常狀態 ( 各類服務單 ) < T >
export const is_Error  = ( x : any ) : boolean => x?.is_error === 1 ;


// 判斷 _ 服務單的 service_date 屬性值，為所輸入的 serviceDate 參數 < T >
export const is_ServiceDate = ( serviceOrder : any , serviceDate : string ) => serviceOrder.service_date === serviceDate ;



// 判斷 _ 是否物件 ( Ex. 用以決定是否執行 _ 遞迴 )
export const is_Object = ( x : any ) => typeof x === "object" && x !== null ;



// Cookie 登入使用者資訊
export const get_Cookie_UserInfo = () => cookie.load( 'userInfo' ) ;


// Cookie 設定
export const set_Cookie = ( name : string , value : string ) => () => cookie.save( name  , value , { path : '/' , maxAge : 5 } ) ;



// # 首頁統計相關狀態


// * 服務類型 ( 屬性 : service_type ) _ Ex. 基礎、洗澡、美容、安親、住宿
export const is_ServiceType_Basic  = ( x : any ) : boolean => x?.service_type === '基礎' ;  // <T> 
export const is_ServiceType_Bath   = ( x : any ) : boolean => x?.service_type === '洗澡' ;  // <T> 
export const is_ServiceType_Beauty = ( x : any ) : boolean => x?.service_type === "美容" ;  // <T> 

export const is_ServiceType_BathBeauty      = ( x : any ) : boolean => is_ServiceType_Bath( x ) || is_ServiceType_Beauty( x ) ;  // <T> 
export const is_ServiceType_BasicBathBeauty = ( x : any ) : boolean => is_ServiceType_Basic( x ) || is_ServiceType_Bath( x ) || is_ServiceType_Beauty( x ) ;  // <T> 


// * 服務狀態 ( 屬性 : service_status ) _ Ex. 已到店、預約_今天、預約_未來
export const is_ServiceStatus_Arrived            = ( x : any ) : boolean => x?.service_status === '已到店' ;    // <T> 
export const is_ServiceStatus_Appointment_Today  = ( x : any ) : boolean => x?.service_status === '預約_今天' ; // <T> 
export const is_ServiceStatus_Appointment_Future = ( x : any ) : boolean => x?.service_status === '預約_未來' ; // <T> 
export const is_ServiceStatus_Appointment_TodayFuture = ( x : any ) : boolean  => is_ServiceStatus_Appointment_Today( x ) || is_ServiceStatus_Appointment_Future( x )  ; // <T> 


// * 到店狀態 ( 屬性 : shop_status )
export const is_ShopStatus_NotArrived = ( x : any ) : boolean => x?.shop_status === '尚未到店' ;     // <T>
export const is_ShopStatus_Wait       = ( x : any ) : boolean => x?.shop_status === '到店等候中' ;   // <T>
export const is_ShopStatus_Process    = ( x : any ) : boolean => x?.shop_status === '到店美容中' ;   // <T>
export const is_ShopStatus_Done       = ( x : any ) : boolean => x?.shop_status === '洗完等候中' ;   // <T>
export const is_ShopStatus_Home       = ( x : any ) : boolean => x?.shop_status === '已回家( 房 )' ; // <T> 
export const is_ShopStatus_DoneHome   = ( x : any ) : boolean => is_ShopStatus_Done( x ) || is_ShopStatus_Home( x ) ; // <T>



// * 付款狀態

// 服務單 : 尚未 _ 完成付款
export const is_NotComplete_Paid = ( x : any ) : boolean => x?.amount_payable > x?.amount_paid ;


//  服務單 : 為 _ 加價單
export const is_Extra_ServiceOrder = ( x : any ) => x?.extra_fee_id



//




 

