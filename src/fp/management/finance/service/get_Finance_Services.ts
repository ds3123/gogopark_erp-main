
import { 
         is_PaymentMethod_Cash ,
         is_ServiceType_Basic , 
         is_ServiceType_Bath ,
         is_ServiceType_Beauty ,
         is_ServiceStatus_Today_Care , 
         is_ServiceStatus_Appointment_Care ,
         is_ServiceStatus_Today_Lodge , 
         is_ServiceStatus_Appointment_Lodge ,
         is_Delete
       } from "fp/state" ;



// 取得 ＿ 洗澡美容 : 應收款 ( 財務管理 ) < T >
export const get_Receivable_Services_Data = ( data : any[] ) : any[] => {

    return data.filter( x => !is_Delete( x ) && 
                             is_PaymentMethod_Cash( x ) &&
                             ( is_ServiceType_Basic( x ) || is_ServiceType_Bath( x ) || is_ServiceType_Beauty( x ) )  )

} ;


// 取得 ＿ 住宿安親 : 應收款 ( 財務管理 ) < T >
export const get_Receivable_LodgeCare_Data = ( data : any[] ) : any[] => {

    return data.filter( x => !is_Delete( x ) && 
                             is_PaymentMethod_Cash( x ) &&
                             ( 
                               is_ServiceStatus_Today_Care( x ) || 
                               is_ServiceStatus_Appointment_Care( x ) ||
                               is_ServiceStatus_Today_Lodge( x ) ||
                               is_ServiceStatus_Appointment_Lodge( x )
                             )) ;

} ;


// 取得 _ 加總：應付金額 ( 屬性 : amount_paid ) < T >
export const get_Amount_Paid_Total = ( data : any[] ) : number => data.reduce( ( accu , curr ) => accu + curr?.amount_paid , 0 ) ;


// 取得 _ 加總：接送費 ( 屬性 : pickup_fee ) < T >
export const get_Pickup_Fee_Total = ( data : any[] ) : number => data.reduce( ( accu , curr ) => { 
    
   // 因 < 洗澡美容 : 應收款 > 有包含加價單 ( 沒有 pickup_fee )，所以跳過、直接回傳 accu 累積值
   if( !curr?.pickup_fee ) return accu ;  

   return accu + curr?.pickup_fee ;

} , 0 ) ; 


// 取得 _ 加總：住宿洗澡費 ( 屬性 : lodge_bath_price ) < T >
export const get_Lodge_BathFee_Total = ( data : any[] ) : number => data.reduce( ( accu , curr ) => { 
    
    // 因 < 住宿安親 : 應收款 > 有包含安親單 ( 沒有 lodge_bath_price )，所以跳過、直接回傳 accu 累積值
    if( !curr?.lodge_bath_price ) return accu ;  
 
    return accu + curr?.lodge_bath_price ;
 
 } , 0 ) ; 


// 取得 _ 加總：住宿美容費 ( 屬性 : lodge_beauty_price ) < T >
export const get_Lodge_BeautyFee_Total = ( data : any[] ) : number => data.reduce( ( accu , curr ) => { 
    
    // 因 < 住宿安親 : 應收款 > 有包含安親單 ( 沒有 lodge_beauty_price )，所以跳過、直接回傳 accu 累積值
    if( !curr?.lodge_beauty_price ) return accu ;  
 
    return accu + curr?.lodge_beauty_price ;
 
 } , 0 ) ; 

// 取得 _ 加總：其他（ 收入 / 支出 ）< T >
export const get_Other_Total = ( data : any[] ) : number => data.reduce( ( accu , curr ) => accu + curr?.amount , 0 ) ;