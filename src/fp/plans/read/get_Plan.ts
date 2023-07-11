
import { compose , append_Obj } from "fp/tool" ;
import { get_Cookie_EmployeeName } from "fp/common/read/get_User" ;
import { get_Delete_Obj  } from "fp/common/read/get_Delete" ;


// 取得 _ 方案 : 資料表 id < T >
export const get_PlanUsedRecord_Id = ( data : any ) : string  => {

   return ( data?.plan ) ? data?.plan?.id : "" ; 

} ;



// 取得 _ 服務單銷單 ( 資料表 : plan_used_records ) : 所有資訊物件 < T >
export const get_PlanUsedRecord_DeleteInfo_Obj =  ( delete_Obj : Delete_Obj ) => ( planUsedRecord_Id : string ) : Delete_PlanUsedRecord_Info_Obj => {

    return compose(
                    append_Obj( "planId"                   , planUsedRecord_Id  ) ,                             // 方案 id
                    append_Obj( "planUsedRecord_DeleteObj" , delete_Obj )  // 方案刪除物件 
                  )( {} ) ; 
                  
} ;

