
import { compose , append_Obj } from "fp/tool" ;



// 取得 _ 方案 : 資料表 id < T >
export const get_PlanUsedRecord_Id = ( data : any ) : string  => {

   return ( data?.plan ) ? data?.plan?.id : "" ; 

} ;


// 取得 _ 服務單銷單 ( 資料表 : plan_used_records ) : 所有資訊物件 < T >
export const get_PlanUsedRecord_DeleteInfo_Obj =  ( delete_Obj : Delete_Obj ) => ( planUsedRecord_Id : string ) : Delete_PlanUsedRecord_Info_Obj => {

    return compose(
                    append_Obj( "planId"                   , planUsedRecord_Id ) , // 方案 id
                    append_Obj( "planUsedRecord_DeleteObj" , delete_Obj )          // 方案刪除物件 
                  )( {} ) ; 
                  
} ;


// 取得 _ 使用方案：「 包月洗澡 」，洗澡 1 次價格 < T >
export const get_MonthBath_Per_ServiceAmount = ( plan_Total_Amount : number ) : number => {

   return Math.round( plan_Total_Amount / 4 ) ;

}

// 取得 _ 使用方案：「 包月美容 」，洗澡 1 次價格 < T >
export const get_MonthBeauty_Per_ServiceAmount = ( plan_Total_Amount : number , service_Type : '洗澡' | '美容' ) : number => {

   return service_Type === '洗澡' ? Math.round( plan_Total_Amount / 5 ) :
          service_Type === '美容' ? ( Math.round( plan_Total_Amount / 5 ) ) * 2 : 
          0  ;

}
          
// 取得 _ 使用方案 1 次的 ( 績效 ) 金額 < T >
export const get_UsePlan_ServiceAmount = ( plan_Total_Amount : number , plan_Type : '包月洗澡' | '包月美容' , service_Type : '洗澡' | '美容' ) : number => {

   return plan_Type === '包月洗澡' ? get_MonthBath_Per_ServiceAmount( plan_Total_Amount ) :
          plan_Type === '包月美容' ? get_MonthBeauty_Per_ServiceAmount( plan_Total_Amount , service_Type ) :
          0 ;

}
