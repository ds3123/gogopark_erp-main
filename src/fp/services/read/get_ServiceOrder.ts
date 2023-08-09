import { append_Obj } from "fp/tool" ;
import { 
         is_Object , 
         is_ServiceDate , 
         is_NotComplete_Paid ,
         is_ServiceStatus_Appointment_TodayFuture ,
         is_ShopStatus_NotArrived ,
         is_ShopStatus_Wait ,
         is_ShopStatus_Process ,
         is_ShopStatus_Done ,
         is_ShopStatus_Home ,
        } from 'fp/state' ;


// 取得 _ 服務單 : 資料表 id ( 藉由 _ 服務單本身資料  )  < T >
export const get_ServiceOrderId = ( serviceData : ServiceOrder ) : string  => {

    return serviceData?.service_type === "基礎" && serviceData?.basic_id  ? serviceData.basic_id  :
           serviceData?.service_type === "洗澡" && serviceData?.bath_id   ? serviceData.bath_id   : 
           serviceData?.service_type === "美容" && serviceData?.beauty_id ? serviceData.beauty_id : 
           "" ;

} ;


// 取得 _ 服務單 : 資料表 id ( 藉由 _ 方案使用記錄  )  < T >
export const get_ServiceOrderId_By_PlanUsedRecord = ( record : PlanUsedRecord ) : string  => {

    return ( record?.bath )   ? record?.bath?.bath_id : 
           ( record?.beauty ) ? record?.beauty?.beauty_id :
           "" ;

} ;


// 取得 _ 服務單 : API Url < T >
export const get_ServiceOrderUrl = ( serviceType : ServiceTypes_ZH ) : string => {

    return serviceType === "基礎" ? "/basics"   : 
           serviceType === "洗澡" ? "/bathes"   : 
           serviceType === "美容" ? "/beauties" : 
           "" ;
      
} ;


// 取得 _ 服務單 : 資料表 id + API Url < T >
export const get_ServiceOrder_Url_Id = ( serviceData : ServiceOrder ) : { serviceUrl : string , serviceId : string }   => {

    return { serviceUrl : get_ServiceOrderUrl( serviceData.service_type ) , serviceId : get_ServiceOrderId( serviceData ) }

} ;


// ----------------------


// 取得 _ 基本修改物件
export const get_ServiceOrder_BasicUpdate_Obj = ( fn_Url : string , fn_Id : any ) => {

      return {
               "serviceOrder_Url" : fn_Url ,
               "serviceOrder_Id"  : fn_Id ,
             }

}


// 取得 _ 服務單銷單 ( 資料表 : basic / bath / beauty ) : 所有資訊物件 < T >
export const get_ServiceOrder_DeleteInfo_Obj = ( delete_Obj : Delete_Obj ) => ( serviceData : ServiceOrder ) : Delete_ServiceOrder_Info_Obj => {


    const basicObj = get_ServiceOrder_BasicUpdate_Obj( 
                                                       get_ServiceOrderUrl( serviceData.service_type ) , 
                                                       get_ServiceOrderId( serviceData ) 
                                                     ) ; 
    
    return append_Obj( "serviceOrder_DeleteObj" , delete_Obj )( basicObj ) ;    
                
                  
} ;


// 取得 _ 服務單銷單 ( 資料表 : basic / bath / beauty ) --> 藉由方案使用記錄 : 所有資訊物件 < T >
export const get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord = ( delete_Obj : Delete_Obj ) => ( record : PlanUsedRecord ) : Delete_ServiceOrder_Info_Obj => {


    const basicObj = get_ServiceOrder_BasicUpdate_Obj( 
                                                       get_ServiceOrderUrl( record.service_type )  , 
                                                       get_ServiceOrderId_By_PlanUsedRecord( record ) 
                                                      ) ; 

    return append_Obj( "serviceOrder_DeleteObj" , delete_Obj )( basicObj ) ;  
                                                      

                  
} ;


// # 篩選 ( filter )  ==================


// 取得 _ 服務單 : 尚未完成付款 ( 實付金額為 0 或 僅付 _ 部分實付金額 ) < T >
export const get_ServiceOrder_NotComplete_Paid = ( serviceOrders : any[] ) : any[] => serviceOrders.filter( is_NotComplete_Paid ) ;


// 取得 _ 特定 : 服務日期 ( service_date ) 的服務單 < T >
export const get_ServiceOrder_ServiceDate =  ( serviceDate : string ) => ( serviceOrders : any[] ) : any[] => serviceOrders.filter( x => is_ServiceDate( x , serviceDate ) ) ;


// 取得 _ 服務單 : "實際到店" 時間 < T >
export const get_ServiceOrder_ArrivedTime = ( serviceOrders : any  ) => {

    // 到店時間
    const arrivedTime = serviceOrders?.actual_arrive ;

    const is_Update             = is_Object( serviceOrders ) ;             
    const is_Appointment        = is_ServiceStatus_Appointment_TodayFuture( serviceOrders ) ; 
    const is_Update_Appointment = is_Update && is_Appointment ;   // 更新 _ 預約
    const is_Update_Onsite      = is_Update && !is_Appointment ;  // 更新 _ 現場

    // 到店狀態
    const is_NotArrived  = is_ShopStatus_NotArrived( serviceOrders ) ;
    const is_Wait        = is_ShopStatus_Wait( serviceOrders ) ;
    const is_Process     = is_ShopStatus_Process( serviceOrders ) ;
    const is_Done        = is_ShopStatus_Done( serviceOrders ) ;
    const is_Home        = is_ShopStatus_Home( serviceOrders ) ;


    return ( is_Update_Appointment && is_NotArrived ) ? "尚未到店" : 
           ( is_Update_Appointment && is_Wait ) ? arrivedTime : 
           ( is_Update_Appointment && is_Process ) ? arrivedTime : 
           ( is_Update_Appointment && is_Done ) ? arrivedTime : 
           ( is_Update_Appointment && is_Home ) ? arrivedTime : 
           ( is_Update_Onsite && is_Wait ) ? arrivedTime :
           ( is_Update_Onsite && is_Process ) ? arrivedTime :
           ( is_Update_Onsite && is_Done ) ? arrivedTime :
           ( is_Update_Onsite && is_Home ) ? arrivedTime :
           "" ;
           

} ;


// 取得 _ 服務單 : "離店時間" < T >
export const get_ServiceOrder_LeaveTime = ( serviceOrders : any ) : string => {

    // 實際離店時間
     const leaveTime = serviceOrders?.actual_leave ; 

     const is_Update             = is_Object( serviceOrders ) ;             
     const is_Appointment        = is_ServiceStatus_Appointment_TodayFuture( serviceOrders ) ; 
     const is_Update_Appointment = is_Update && is_Appointment ;   // 更新 _ 預約
     const is_Update_Onsite      = is_Update && !is_Appointment ;  // 更新 _ 現場
     
     // 到店狀態
     const is_NotArrived  = is_ShopStatus_NotArrived( serviceOrders ) ;
     const is_Wait        = is_ShopStatus_Wait( serviceOrders ) ;
     const is_Process     = is_ShopStatus_Process( serviceOrders ) ;
     const is_Done        = is_ShopStatus_Done( serviceOrders ) ;
     const is_Home        = is_ShopStatus_Home( serviceOrders ) ;

     return ( is_Update_Appointment && is_NotArrived ) ? "尚未到店" : 
            ( is_Update_Appointment && is_Wait ) ? "尚未離店" : 
            ( is_Update_Appointment && is_Process ) ? "尚未離店" : 
            ( is_Update_Appointment && is_Done ) ? "尚未離店" : 
            ( is_Update_Appointment && is_Home ) ? leaveTime : 
            ( is_Update_Onsite && is_Wait ) ? "尚未離店" :
            ( is_Update_Onsite && is_Process ) ? "尚未離店" :
            ( is_Update_Onsite && is_Done ) ? "尚未離店" :
            ( is_Update_Onsite && is_Home ) ? leaveTime :
             ""    

             
} ;




