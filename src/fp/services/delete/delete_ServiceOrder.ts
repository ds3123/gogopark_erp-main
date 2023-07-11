
import { get_Delete_Obj } from "fp/common/read/get_Delete" ;
import { get_Cookie_EmployeeName } from "fp/common/read/get_User" ;
import { common_Update_ServiceOrder , common_Update_ServiceOrder_By_PlanUsedRecord  } from "fp/services/update/update_ServiceOrder"


// # < 執行 > 銷單


// 銷單 : 刪除 _ 服務單 & 方案使用記錄 ( 藉由 _ "服務單" 資料 ) :
export const delete_ServiceOrder = ( data : any ) => ( queryClient : any , dispatch : any , history : any ) => async( currentUrl : string ) => {

        // 設定 _ 銷單 ( is_delete : 1 )
        const is_Delete_Obj = get_Delete_Obj( get_Cookie_EmployeeName() , 1 ) ;  

        // 執行 _ 銷單
        common_Update_ServiceOrder( data , is_Delete_Obj )( queryClient , dispatch , history )( currentUrl ) ;

} ;


// 銷單 : 刪除 _ 服務單 & 方案使用記錄 ( 藉由 _ "方案使用紀錄" 資料 ) :
export const delete_ServiceOrder_By_PlanUsedRecord = ( record : PlanUsedRecord ) => async( queryClient : any , dispatch : any , history : any )  => {

         // 設定 _ 銷單 ( is_delete : 1 )
         const is_Delete_Obj = get_Delete_Obj( get_Cookie_EmployeeName() , 1 ) ;  

         // 執行 _ 銷單 
         common_Update_ServiceOrder_By_PlanUsedRecord( record , is_Delete_Obj )( queryClient , dispatch , history ) ;  

} ;


// # < 回復 > 銷單


// 銷單 : 回復 _ 服務單 & 方案使用記錄 ( 藉由 _ "服務單" 資料 ) :
export const undo_Delete_ServiceOrder = ( data : any ) => ( queryClient : any , dispatch : any , history : any ) => async( currentUrl : string ) => {

  // 回復 _ 銷單 ( is_delete : 0 )
  const is_Delete_Obj = get_Delete_Obj( get_Cookie_EmployeeName() , 0 ) ;  

  // 執行 _ 回復銷單
  common_Update_ServiceOrder( data , is_Delete_Obj )( queryClient , dispatch , history )( currentUrl ) ;

} ;


// 銷單 : 回復 _ 服務單 & 方案使用記錄 ( 藉由 _ "方案使用紀錄" 資料 ) :
export const undo_Delete_ServiceOrder_By_PlanUsedRecord = ( record : PlanUsedRecord ) => async( queryClient : any , dispatch : any , history : any )  => {

  // 回復 _ 銷單 ( is_delete : 0 )
  const is_Delete_Obj = get_Delete_Obj( get_Cookie_EmployeeName() , 0 ) ;  

  // 執行 _ 回復銷單 
  common_Update_ServiceOrder_By_PlanUsedRecord( record , is_Delete_Obj )( queryClient , dispatch , history ) ;  

} ;






