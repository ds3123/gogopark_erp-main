

import { compose , take_Action } from "fp/tool" ;
import { get_PlanUsedRecord_DeleteInfo_Obj } from "fp/plans/read/get_Plan" ;
import { update_Plan_Record_By_Id } from "utils/api/api_Plan" ;



// 判斷 _ 是否：銷單 ( 方案使用記錄 )
export const if_Update_ServiceOrder_PlanUsedRecord_Delete = ( obj : Delete_PlanUsedRecord_Info_Obj ) => { 

     const { planId , planUsedRecord_DeleteObj } = obj ;   
     
     return ( planId && planUsedRecord_DeleteObj ) ? 
                () => execute_Update_PlanUsedRecord_Delete( planId , planUsedRecord_DeleteObj ) :
                () => true ;  // 使用方案，才清除 ( 修改 ) _ 方案記錄


}


// 執行 _ 服務 : 銷單 ( 方案使用記錄 )
export const execute_Update_PlanUsedRecord_Delete = ( planId : string , Delete_PlanUsedRecord_Info_Obj : Delete_Obj ) => {

    // 回傳 _ 執行結果 ( 成功 : Promise / 失敗 : false ) 
    return update_Plan_Record_By_Id( planId , Delete_PlanUsedRecord_Info_Obj ).catch( error => {

                // 若捕捉到錯誤，回傳 false --> 供後續判斷
                return false 

           }) ;

} ;




// 刪除 _ 服務單 ( 銷單  / 資料表 : plan_used_records ) : 當此服務單，為使用 "方案"
export const update_ServiceOrder_PlanUsedRecord_Delete = async( planUsedRecord_Id : string , deleteObj : Delete_Obj ) => {

    const result = await compose( 
                                    get_PlanUsedRecord_DeleteInfo_Obj( deleteObj ) , // 取得 _ 銷單 ( 方案使用紀錄 ) 所需資訊（ 方案 id、更新物件 ）
                                    if_Update_ServiceOrder_PlanUsedRecord_Delete ,   // 判斷 _ 是否執行 : 銷單 ( 方案使用紀錄 )  
                                    take_Action ,                                    // 執行 _ 判斷後 : 動作
                                )( planUsedRecord_Id ) ;

    return result 
  
} ;
