
import { compose , take_Action } from "fp/tool" ;
import { check_Error , done_Callback } from "fp/callback" ;
import { set_Cookie , is_Object , is_ServiceStatus_Appointment_TodayFuture } from "fp/state" ;
import { get_ServiceOrder_DeleteInfo_Obj , get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord } from "fp/services/read/get_ServiceOrder" ;
import { update_Service_By_Service_Url_Id } from "utils/api/api_Service" ;
import { get_PlanUsedRecord_Id } from "fp/plans/read/get_Plan" ;
import { update_ServiceOrder_PlanUsedRecord_Delete } from "fp/plans/update/update_Plan" ;
import { get_ServiceOrderId , get_ServiceOrderUrl } from "fp/services/read/get_ServiceOrder" ;
import { Shop_Status } from "utils/Interface_Type";




// 判斷 _ 是否：銷單 ( 服務單 : 基礎 / 洗澡 / 美容 )
export const if_Update_ServiceOrder_Delete = ( obj : Delete_ServiceOrder_Info_Obj ) => {

    const { serviceOrder_Url , serviceOrder_Id , serviceOrder_DeleteObj } = obj ;
  
    return ( serviceOrder_Url && serviceOrder_Id && serviceOrder_DeleteObj ) ? 
                () => execute_Update_ServiceOrder_Delete( serviceOrder_Url , serviceOrder_Id , serviceOrder_DeleteObj ) : 
                () => { alert( "銷單 ( 服務單 ) 發生錯誤" ) } ;
  
} ;

// ---------------------------------


// 執行 _ 服務 : 銷單 ( 刪除 / 返回 )
export const execute_Update_ServiceOrder_Delete = ( serviceOrder_Url : string , serviceOrder_Id : string , serviceOrder_DeleteObj : Delete_Obj ) => {

  // 回傳 _ 執行結果 : 成功 -> true ( Promise 物件 ) / 失敗 -> false 
  return update_Service_By_Service_Url_Id( serviceOrder_Url , serviceOrder_Id , serviceOrder_DeleteObj ).catch( error => {

            // 若捕捉到錯誤，回傳 false --> 供後續判斷
            return false 

         }) ;

} ;




// 執行 _ 服務 : 更新 '離店時間'
export const execute_Update_ServiceOrder_LeaveTime = ( shopStatus : Shop_Status , currentTime : string ) => ( serviceOrder : any ) => {

     const serviceOrder_Url = get_ServiceOrderUrl( serviceOrder?.service_type ) ; // 服務單 api url
     const serviceOrder_Id  = get_ServiceOrderId( serviceOrder ) ;                // 服務單 id

     // 判斷 
     const is_Update = is_Object( serviceOrder ) ;         // 編輯狀態 
     const is_GoHome = shopStatus === "已回家( 房 )" ;      // 已回家( 房 ) 狀態 


     const is_Update_LeaveTime = is_Update && is_GoHome ;  // 執行 _ 更新
     const is_Update_RollBack  = is_Update && !is_GoHome ; // 撤回 _ 更新
    

     return is_Update_LeaveTime ? update_Service_By_Service_Url_Id( serviceOrder_Url , serviceOrder_Id , { actual_leave : currentTime } ) :
            is_Update_RollBack ? update_Service_By_Service_Url_Id( serviceOrder_Url , serviceOrder_Id , { actual_leave : "尚未離店" } )  :
              "目前為 _ 新增模式，無法更新：離店時間"


} ;



// -----------------------------------


// 刪除 _ 服務單 ( 銷單 / 資料表 : basic , bath , beauty ) -> 藉由 _ "服務單" 資料 : 
export const update_ServiceOrder_Delete = async( data : any , deleteObj : Delete_Obj ) => {

    const result = await compose( 
                                  get_ServiceOrder_DeleteInfo_Obj( deleteObj ) , // 取得 _ 銷單所需資訊（ API url、資料表 id、更新物件 ）
                                  if_Update_ServiceOrder_Delete ,   // 判斷 _ 是否執行 : 銷單  
                                  take_Action ,                     // 執行 _ 判斷後 : 動作
                                )( data ) ;

    return result 

} ;



// 刪除 _ 服務單 ( 銷單 / 資料表 : plan_used_records ) -> 藉由 _ "方案使用紀錄" 資料 : 
export const update_ServiceOrder_Delete_By_PlanUsedRecord = async( record : PlanUsedRecord , deleteObj : Delete_Obj ) => {

 const result = await compose( 
                               get_ServiceOrder_DeleteInfo_Obj_By_PlanUsedRecord( deleteObj ) , // 取得 _ 銷單所需資訊（ API url、資料表 id、更新物件 ）
                               if_Update_ServiceOrder_Delete ,   // 判斷 _ 是否執行 : 銷單  
                               take_Action ,                     // 執行 _ 判斷後 : 動作
                             )( record ) ;

 return result 

} ;


// -----------------------------------


// 共同動作 _ 一般服務單
export const common_Update_ServiceOrder = ( data : any , is_Delete_Obj : Delete_Obj ) => ( queryClient : any , dispatch : any , history : any ) => async( currentUrl : string ) => {

    const r_1 = await update_ServiceOrder_Delete( data , is_Delete_Obj ) ;                                          // 刪除 _ 一般服務單
    const r_2 = await update_ServiceOrder_PlanUsedRecord_Delete( get_PlanUsedRecord_Id( data ) , is_Delete_Obj ) ;  // 刪除 _ 方案使用記錄

    compose(
             check_Error( r_1 , "銷單 ( 服務單 ) 錯誤，請聯繫系統管理員" ) ,
             check_Error( r_2 , "銷單 ( 方案使用紀錄 ) 錯誤，請聯繫系統管理員" ) , 
             done_Callback( queryClient , dispatch , history )( currentUrl )
          )( null ) ;

} ;


// 共同動作 _ 方案使用記錄
export const common_Update_ServiceOrder_By_PlanUsedRecord  = ( record : PlanUsedRecord , is_Delete_Obj : Delete_Obj ) => async( queryClient : any , dispatch : any , history : any ) => {

    const r_1 = await update_ServiceOrder_Delete_By_PlanUsedRecord( record , is_Delete_Obj ) ; // 刪除 _ 一般服務單
    const r_2 = await update_ServiceOrder_PlanUsedRecord_Delete( record.id , is_Delete_Obj ) ; // 刪除 _ 方案使用記錄

    compose(
            check_Error( r_1 , "銷單 ( 服務單 ) 錯誤，請聯繫系統管理員" ) ,
            check_Error( r_2 , "銷單 ( 方案使用紀錄 ) 錯誤，請聯繫系統管理員" ) , 
            done_Callback( queryClient , dispatch , history )( "/services" ) ,
            set_Cookie( "after_Created_Plan" , "洗美_方案" )
          )( null ) ;

} ;


